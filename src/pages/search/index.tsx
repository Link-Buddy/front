import { searchLink } from 'api/link'; // 검색 링크를 가져오는 함수
import SearchLink from '../../components/SearchLink';

const SearchPage = () => {
  return (
    <SearchLink
      fetchLinks={(value) => searchLink(value || '')}
      title="검색"
      type="search"
    />
  );
};

export default SearchPage;
