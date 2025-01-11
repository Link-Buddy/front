import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const FloatAddLinkBtn: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add-link'); // 클릭 시 이동할 페이지 경로
  };

  return (
    <div className="relative max-w-[768px] mx-auto">
      {/* 버튼을 고정된 위치에 배치 */}
      <div className="fixed bottom-32 right-[calc((100vw-768px)/2+20px)]">
        <Button
          type="default"
          icon={<PlusOutlined />}
          className="fixedAddLinkBtn !w-auto !h-16 bg-[#1d3557] hover:bg-[#1a2e4c] text-white rounded-full shadow-lg flex items-center justify-center z-50 aspect-square !p-0"
          onClick={handleNavigate}
        />
      </div>
    </div>
  );
};

export default FloatAddLinkBtn;
