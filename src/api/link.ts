// import { Link } from '../types/Link';

import { axiosInstance } from 'lib/axios';
import { CreateLink } from 'types/Link';

const API_BASE_URL = 'http://localhost:8080';

export const getMyLinkByCategoryId = async (
  categoryId: string
): Promise<any> => {
  const { data } = await axiosInstance.get(
    `${API_BASE_URL}/links/category/${categoryId}`
  );
  return data.data;
};
export const createLink = async (linkData: CreateLink): Promise<any> => {
  const { data } = await axiosInstance.post(`${API_BASE_URL}/links`, linkData);

  return data;
};
