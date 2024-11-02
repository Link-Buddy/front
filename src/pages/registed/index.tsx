import { myRegistedLinks } from 'api/link';
import SearchLink from '../../components/SearchLink';

const RegistedPage = () => {
  return (
    <SearchLink fetchLinks={() => myRegistedLinks()} title="내가 등록한 링크" />
  );
};

export default RegistedPage;
