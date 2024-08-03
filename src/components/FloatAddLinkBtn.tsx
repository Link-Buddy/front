import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const FloatAddLinkBtn: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleNavigate = () => {
    navigate('/add-link'); // 클릭 시 이동할 페이지 경로
  };

  return (
    <div className="  z-20 pointer-events-none w-full flex justify-end pr-4">
      <button
        className="bg-pink-500 text-white p-4 rounded-full shadow-lg pointer-events-auto"
        onClick={handleNavigate}
      >
        <PlusOutlined style={{ fontSize: '24px' }} />
      </button>
    </div>
  );
};

export default FloatAddLinkBtn;
