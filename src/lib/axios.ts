import axios from 'axios';
import { getAccessKey } from 'utils/authStorage';

const baseURL = 'http://localhost:8080';

export const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const accessKey = getAccessKey(); // 저장된 JWT 토큰을 불러옴
    // Authorization 헤더 추가
    if (accessKey && config.headers) {
      config.headers['Authorization'] = `Bearer ${accessKey}`;
    }
    console.log('interceptor request', config);
    return config;
  },
  (error) => {
    console.error('interceptor request error', error);
    return Promise.reject(error);
  }
);
// 응답 interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    console.log('interceptor response');
    return response;
  },
  (error) => {
    //  인증 오류(401)인 경우
    if (error.response?.status === 401) {
      // 모달 표시 로직
      const showLoginModal = () => {
        return new Promise((resolve) => {
          if (
            window.confirm('로그인이 필요한 서비스입니다. 로그인 하시겠습니까?')
          ) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      };

      return showLoginModal().then((shouldLogin) => {
        if (shouldLogin) {
          // 로그인 페이지로 리다이렉트
          window.location.href = '/login';
        } else {
          // '아니오'를 선택한 경우 /home으로 리다이렉트
          window.location.href = '/home';
        }
        return Promise.reject(error);
      });
    }

    // 409 에러 처리 추가
    if (error.response?.status === 409) {
      alert(error.response.data.message); // 409 에러 시 alert 메시지 표시
      return;
    }

    console.log('interceptor response error');
    return Promise.reject(error);
  }
);
