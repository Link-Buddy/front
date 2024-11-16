import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAccessKey, saveAccessKey } from 'utils/authStorage';

const SocialLoginRedirectPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 accessToken을 추출
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get('accessToken');
    const refreshToken = urlParams.get('refreshToken');

    if (accessToken) {
      saveAccessKey(accessToken); // accessToken 저장
      //     saveRefreshKey(refreshToken);
      navigate('/home'); // 홈으로 이동
    } else {
      console.log('로그인 실패');
    }
  }, [navigate]);

  return (
    <div>
      <h2>로그인 중...</h2>
    </div>
  );
};

export default SocialLoginRedirectPage;
