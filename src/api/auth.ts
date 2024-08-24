import { axiosInstance } from 'lib/axios';

// src/api/auth.ts
interface SignInResponse {
  accessToken: string;
}

export const signIn = async (
  email: string,
  password: string
): Promise<SignInResponse> => {
  try {
    const response = await axiosInstance.post('/user/signIn', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error('로그인 정보가 일치하지 않습니다.');
  }
};
