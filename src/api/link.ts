// import { Link } from '../types/Link';

import { axiosInstance } from 'lib/axios';
import { CreateLink, Link, UpdateLink } from 'types/Link';

export const getMyLinkByCategoryId = async (
  categoryId: string
): Promise<any> => {
  const { data } = await axiosInstance.get(`/links/category/${categoryId}`);
  return data.data;
};
export const createLink = async (linkData: CreateLink): Promise<Link> => {
  const { data } = await axiosInstance.post(`/links`, linkData);

  return data;
};

export const updateLink = async (
  linkId: string,
  linkData: UpdateLink
): Promise<Link> => {
  const { data } = await axiosInstance.patch(`/links/${linkId}`, linkData);

  return data;
};
