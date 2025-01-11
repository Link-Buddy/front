import { axiosInstance } from 'lib/axios';

/** 버디 리스트 조회 */
export const getBuddyList = async (): Promise<Buddy[]> => {
  const { data } = await axiosInstance.get('/buddy');
  return data.data;
};

/** 버디 생성 */
export const addBuddy = async (buddyData: {
  name: string;
}): Promise<{ status: string; data: BuddyUser }> => {
  console.log('buddyData', buddyData);
  const { data } = await axiosInstance.post('/buddy', buddyData);
  return data;
};

/** 버디 수정 (알림설정 & 고정여부 & 초대수락여부) */
export const updateBuddyUser = async (
  buddyUserId: number,
  buddyUserData: any
): Promise<any> => {
  const { data } = await axiosInstance.put(
    `/buddy/user/${buddyUserId}`,
    buddyUserData
  );
  return data;
};

/** 버디 회원 리스트 & 방장인지 확인 */
export const getBuddyUserInfo = async (
  buddyId: number
): Promise<{
  buddyInfo: { id: number; name: string; createdAt: number };
  isCreator: boolean;
  list: BuddyUser[];
}> => {
  const params = { buddyId: buddyId };
  const { data } = await axiosInstance.get('/buddy/user', { params });
  console.log('data 확인', data);
  return data.data;
};

/** 버디 회원 초대 (추가) */
export const addBuddyUser = async (buddyUserData: any): Promise<any> => {
  console.log('buddyUserData', buddyUserData);
  const { data } = await axiosInstance.post('/buddy/user', buddyUserData);
  return data;
};

/** 받은 초대장 리스트 조회 */
export const getBuddyInvitation = async (): Promise<BuddyInvitation[]> => {
  const { data } = await axiosInstance.get('/buddy/user/invitation');
  return data.data;
};

/** 버디 삭제 */
export const deleteBuddy = async (
  buddyId: number
): Promise<{ status: string; data: boolean }> => {
  const { data } = await axiosInstance.delete(`/buddy/${buddyId}`);
  console.log('dddddddddddd', data);
  return data;
};

/** 버디 탈퇴(나가기) */
export const deleteBuddyUser = async (
  buddyId: number
): Promise<{ status: string; data: boolean }> => {
  const { data } = await axiosInstance.delete(`/buddy/user/${buddyId}`);
  return data;
};

/** 버디 수정 (이름) */
export const updateBuddy = async (
  buddyId: number,
  buddyData: any
): Promise<{ status: string; data: boolean }> => {
  const { data } = await axiosInstance.put(`/buddy/${buddyId}`, buddyData);
  return data;
};
