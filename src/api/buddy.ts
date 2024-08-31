import { axiosInstance } from "lib/axios"

/** 버디 리스트 조회 */
export const getBuddyList = async (userId: number): Promise<Buddy[]> => {
    const params = { userId : userId }
    const { data } = await axiosInstance.get('/buddy', { params });
    return data.data;
}

/** 버디 수정 (알림설정 & 고정여부 & 초대수락여부) */
export const updateBuddyUser = async (buddyUserId: number, buddyUserData: any): Promise<any> => {
    const { data } = await axiosInstance.put(`/buddy/user/${buddyUserId}`, buddyUserData);
    return data;
}

/** 버디 회원 리스트 조회 */
export const getBuddyUserList = async (buddyId: number): Promise<BuddyUser[]> => {
    const params = { buddyId: buddyId };
    const { data } = await axiosInstance.get('/buddy/user', { params });
    return data.data;
}

/** 버디 회원 초대 (추가) */
export const addBuddyUser = async (buddyUserData: any): Promise<any> => {
    console.log('buddyUserData', buddyUserData)
    const { data } = await axiosInstance.post('/buddy/user', buddyUserData);
    return data;
}

/** 받은 초대장 리스트 조회 */
export const getBuddyInvitation = async (): Promise<BuddyInvitation[]> => {
    const { data } = await axiosInstance.get('/buddy/user/invitation');
    return data.data;
}