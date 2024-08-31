import { axiosInstance } from 'lib/axios';
import { Category } from 'types/Category';

/** 내 카테고리 조회 */
export const getMyCategoryList = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/categories/my');
  return data.data;
};
