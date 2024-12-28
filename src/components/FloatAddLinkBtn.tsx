import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const AddLink: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/add-link'); // 클릭 시 이동할 페이지 경로
  };

  return (
    <div className="relative max-w-screen-lg mx-auto">
      {/* 버튼을 레이아웃 우측 하단에 고정 */}
      <Button
        type="default"
        icon={<PlusOutlined />}
        className="fixed bottom-20 right-5 bg-[#1d3557] hover:bg-[#1a2e4c] text-white rounded-full w-16 h-16 shadow-lg flex items-center justify-center z-50"
        onClick={handleNavigate}
      />
    </div>
  );
};

export default AddLink;
