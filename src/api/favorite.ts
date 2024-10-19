import { axiosInstance } from 'lib/axios';

export const onOffFavoriteLink = async (linkId: number): Promise<any> => {
  const { data } = await axiosInstance.post(`/favorites?linkId=${linkId}`);
  return data.data;
};
