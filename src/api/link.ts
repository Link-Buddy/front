// import { Link } from '../types/Link';

import { axiosInstance } from 'lib/axios';
import { LinkCategory } from 'types/Category';
import { CreateLink, ISearchLink, Link, UpdateLink } from 'types/Link';

/** 링크 목록 조회 */
export const getLinkByCategoryId = async (
    categoryId: string
): Promise<{ category: LinkCategory; links: Link[] }> => {
    const { data } = await axiosInstance.get(`/links/category/${categoryId}`);
    return data.data;
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
    console.log('dataatattttat', data);
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
