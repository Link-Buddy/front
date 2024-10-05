import { axiosInstance } from 'lib/axios';
import { Category } from 'types/Category';

/** 내 카테고리 조회 */
export const getMyCategoryList = async (): Promise<Category[]> => {
  const { data } = await axiosInstance.get('/categories/my');
  return data.data;
};
export const getBuddyCategoryList = async (
  buddyId: string
): Promise<Category[]> => {
  const { data } = await axiosInstance.get(
    `/categories/buddy?buddyId=${buddyId}`
  );
  return data.data;
};

export const createMyCategory = async (
  categoryName: string
): Promise<Category> => {
  const { data } = await axiosInstance.post('/categories/my', { categoryName });
  return data.data;
};

export const createBuddyCategory = async (
  categoryName: string,
  buddyId: string
): Promise<Category> => {
  const { data } = await axiosInstance.post('/categories/buddy', {
    categoryName,
    buddyId,
  });
  return data.data;
};
