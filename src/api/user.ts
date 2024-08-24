import { axiosInstance } from "lib/axios"

/** 회원 리스트 조회 (검색) */
export const getUserList = async (userData: any): Promise<any> => {
    const params = { userData: userData };
    const { data } = await axiosInstance.get('/user', { params });
    return data;
}