import { axiosInstance } from 'lib/axios';

/** 회원 리스트 조회 (검색) */
export const getUserList = async (email: string): Promise<any> => {
    const params = { email: email };
    const { data } = await axiosInstance.get('/user', { params });
    return data;
};
