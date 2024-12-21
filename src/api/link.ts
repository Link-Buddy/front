// import { Link } from '../types/Link';

import { axiosInstance } from 'lib/axios';
import { LinkCategory } from 'types/Category';
import { CreateLink, Link, ISearchLink, UpdateLink } from 'types/Link';

/** 링크 일주일간 기록 조회 */
export const getWeeklyLinkStatus = async (): Promise<
  Record<string, boolean>
> => {
  const { data } = await axiosInstance.get('/links/weekly');
  return data.data;
};

/** 링크 목록 조회 */
export const getLinkByCategoryId = async (
  categoryId: string
): Promise<{ category: LinkCategory; links: Link[] }> => {
  const { data } = await axiosInstance.get(`/links/category/${categoryId}`);
  return data.data;
};

/** 최근본 링크들 검색 */
export const searchLinkByIds = async (
  linkIds: [number]
): Promise<ISearchLink[]> => {
  const { data } = await axiosInstance.post('/links/recent-view', { linkIds });
  return data.data.links;
};

export const createLink = async (linkData: CreateLink): Promise<Link> => {
  const { data } = await axiosInstance.post(`/links`, linkData);

  return data;
};

export const updateLink = async (
  linkId: number,
  linkData: UpdateLink
): Promise<{ status: string; data: Link }> => {
  const { data } = await axiosInstance.put(`/links/${linkId}`, linkData);

  return data;
};

/** 링크 삭제 */
export const deleteLink = async (linkId: number): Promise<any> => {
  const { data } = await axiosInstance.delete(`/links/${linkId}`);
  return data;
};

/** 링크 검색 */
export const searchLink = async (keyword: string): Promise<ISearchLink[]> => {
  const params = { keyword: keyword };
  const { data } = await axiosInstance.get('/links/search', { params });
  return data.data;
};
/** 링크 이동 */
export const changeLinkCategory = async (
  categoryId: string,
  links: number[]
): Promise<{ status: string; data: Link }> => {
  const { data } = await axiosInstance.put(
    `/links/change-category/${categoryId}`,
    links
  );
  return data;
};

export const myFavoriteLinks = async (): Promise<ISearchLink[]> => {
  const { data } = await axiosInstance.get(`/links/favorite`);
  return data.data;
};

export const myRegistedLinks = async (): Promise<ISearchLink[]> => {
  const { data } = await axiosInstance.get(`/links/registed`);
  return data.data;
};
