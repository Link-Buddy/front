import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Badge } from 'antd'; // Card와 Badge 컴포넌트를 임포트
import { myFavoriteLinks } from 'api/link';
import { ISearchLink } from 'types/Link';

const { Meta } = Card;

const Favorites: React.FC = () => {
  const navigate = useNavigate();
  const [favoriteLinks, setFavoriteLinks] = useState<ISearchLink[]>([]);

  useEffect(() => {
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
          <Card
            key={link.id}
            hoverable
            style={{ width: 170 }} // Card의 너비 설정
            cover={
              <img
                alt={link.linkName}
                src={link.imageUrl ? link.imageUrl : '/images/noPreview.png'}
                style={{
                  height: 150,
                }}
                onClick={() => handleLinkClick(link.linkUrl)}
              />
            }
            onClick={() => handleLinkClick(link.linkUrl)} // 클릭 시 링크로 이동
            className="transition-all transform hover:scale-105 hover:shadow-xl"
            bodyStyle={{ padding: '15px' }}
          >
            <Meta title={link.linkName} />
            {link.shareTypeCd === 10 && (
              <Badge
                count="Private"
                style={{ marginTop: 10, backgroundColor: '#ffa500' }}
              />
            )}
            {link.shareTypeCd === 20 && (
              <Badge count="Buddy" style={{ backgroundColor: '#28a745' }} />
            )}
          </Card>
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
