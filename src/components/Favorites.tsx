import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import { FaChevronRight } from 'react-icons/fa'; // react-icons에서 아이콘 임포트
import { myFavoriteLinks } from 'api/link';
import { ISearchLink } from 'types/Link';

const Favorites: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const [favoriteLinks, setFavoriteLinks] = useState<ISearchLink[]>([]); // 즐겨찾기 링크 데이터를 위한 상태

  useEffect(() => {
    // 컴포넌트가 마운트될 때 API 호출
    const fetchFavorites = async () => {
      try {
        const links = await myFavoriteLinks();
        setFavoriteLinks(links);
      } catch (error) {
        console.error('Failed to fetch favorite links:', error);
      }
    };

    fetchFavorites();
  }, []);
  const handleNavigate = () => {
    navigate('/favorite'); // 클릭 시 이동할 페이지 경로
  };

  // 링크 클릭 시 해당 URL로 이동
  const handleLinkClick = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <div className="px-4 py-2">
      <div className="text-lg font-semibold mb-2 flex items-center transition-colors">
        <span className="mr-2 mb-2">즐겨찾기</span>
      </div>
      <div className="flex justify-between space-x-2">
        {favoriteLinks.slice(0, 4).map((link) => (
          <div
            key={link.id}
            className="w-44 h-44 border-2 border-gray-300 rounded-lg flex flex-col cursor-pointer transition-all transform hover:scale-105 hover:shadow-xl hover:border-opacity-80"
            onClick={() => handleLinkClick(link.linkUrl)}
          >
            <div
              className={`h-2 w-full rounded-t-lg ${
                link.shareTypeCd === 10
                  ? 'bg-orange-500'
                  : link.shareTypeCd === 20
                  ? 'bg-green-500'
                  : ''
              }`}
            ></div>

            <div className="flex flex-grow items-center justify-center text-center text-sm font-semibold text-gray-800">
              {link.linkName}
            </div>
          </div>
        ))}
      </div>
      {favoriteLinks.length > 4 && (
        <div
          className="mt-2 text-sm text-gray-600 cursor-pointer text-right"
          onClick={handleNavigate}
        >
          더보기 &gt;
        </div>
      )}
    </div>
  );
};

export default Favorites;
