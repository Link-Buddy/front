import React from 'react';
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위해 useNavigate 훅 사용
import { FaChevronRight } from 'react-icons/fa'; // react-icons에서 아이콘 임포트

const Favorites: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleNavigate = () => {
    navigate('/favorites'); // 클릭 시 이동할 페이지 경로
  };

  return (
    <div className="px-4 py-2">
      <div
        className="text-lg font-semibold mb-2 flex items-center cursor-pointer transition-colors hover:text-gray-900"
        onClick={handleNavigate} // 클릭 시 페이지 이동 함수 호출
      >
        <span className="mr-2">즐겨찾기</span>
        <FaChevronRight className="text-gray-600" />
      </div>
      <div className="flex justify-between space-x-2">
        <div className="w-44 h-44 border-2 border-orange-500"></div>
        <div className="w-44 h-44 border-2 border-orange-500"></div>
        <div className="w-44 h-44 border-2 border-orange-500"></div>
        <div className="w-44 h-44 border-2 border-orange-500"></div>
      </div>
    </div>
  );
};

export default Favorites;
