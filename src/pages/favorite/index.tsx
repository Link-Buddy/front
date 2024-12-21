import { myFavoriteLinks } from 'api/link';
import SearchLink from '../../components/SearchLink';

const FavoritePage = () => {
  return (
    <SearchLink
      fetchLinks={() => myFavoriteLinks()}
      title="즐겨찾기"
      type="favorite"
    />
  );
};

export default FavoritePage;
