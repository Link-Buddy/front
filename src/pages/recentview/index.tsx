import React from 'react';
import SearchLink from '../../components/SearchLink';
import { searchLinkByIds } from 'api/link';

const RecentViewPage = () => {
  // 로컬 스토리지에서 recentLinks ID 목록을 불러옴
  const recentLinks = localStorage.getItem('recentLinks');
  const recentLinkIds = recentLinks ? JSON.parse(recentLinks) : [];

  return (
    <SearchLink
      fetchLinks={() => searchLinkByIds(recentLinkIds)}
      title="최근 본 링크"
      type="recentview"
    />
  );
};

export default RecentViewPage;
