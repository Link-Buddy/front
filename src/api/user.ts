import { axiosInstance } from 'lib/axios';
import { UserInfo } from 'types/User';

/** 회원 리스트 조회 (검색) */
export const getUserList = async (email: string): Promise<any> => {
  const params = { email: email };
  const { data } = await axiosInstance.get('/user', { params });
  return data;
};

/** 내 정보 조회  */
export const getMyInfo = async (): Promise<UserInfo> => {
  const { data } = await axiosInstance.get('/user/my');
  return data.data;
};
/** 비밀번호 변경  */
export const changeMyPassword = async (
  currentPassword: string,
  newPassword: string
): Promise<void> => {
  const { data } = await axiosInstance.patch('/user/my/change-password', {
    currentPassword,
    newPassword,
  });
  return data.data;
};
