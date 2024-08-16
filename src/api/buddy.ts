import { axiosInstance } from "lib/axios"

/** 버디 리스트 조회 */
export const getBuddyList = async (userId: number): Promise<any> => {
    const params = { userId : userId }
    const { data } = await axiosInstance.get('/buddy', { params });
    return data;
}

/** 버디 조회 */
export const getBuddy = async (): Promise<any> => {
    const { data } = await axiosInstance.get('/buddy');
    return data;
}

/** 회원 버디 수정 (알림설정 & 고정여부 & 초대수락여부) */
export const updateBuddyUser = async (buddyUserId: number, buddyUserData: any): Promise<any> => {
    const { data } = await axiosInstance.put(`/buddy/user/${buddyUserId}`, buddyUserData);
    return data;
}