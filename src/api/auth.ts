import { useAuth } from 'hooks/useAuth';

// src/api/auth.ts
interface SignInResponse {
  accessKey: string;
}

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  const response = await fetch('http://localhost:8080/user/signIn', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('로그인 실패');
  }

  return await response.json();
};

//TODO : 내 정보 가져오기 >> 백엔드 만들어야함
// export const fetchMyData = async () => {
//   const { accessKey } = useAuth();

//   if (!accessKey) {
//     throw new Error('인증되지 않은 사용자입니다.');
//   }

//   const response = await fetch('http://localhost:8080/MyInfo', {
//     method: 'GET',
//     headers: {
//       Authorization: `Bearer ${accessKey}`,
//       'Content-Type': 'application/json',
//     },
//   });

//   if (!response.ok) {
//     if (response.status === 403) {
//       throw new Error('접근 권한이 없습니다.');
//     } else {
//       throw new Error('API 호출 실패');
//     }
//   }

//   return await response.json();
// };
