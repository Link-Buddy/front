import React from 'react';
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 임포트
import '../styles/css/addLink.css'; // 애니메이션 CSS 파일 임포트

//메인 오늘의링크 추가 버튼
const AddLink: React.FC = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용

  const handleNavigate = () => {
    navigate('/add-link'); // 클릭 시 이동할 페이지 경로
  };

  return (
    <div className="p-4 flex justify-center">
      <Button
        type="default"
        icon={<PlusOutlined />}
        className="p-6 animated-gradient-button"
        onClick={handleNavigate} // 클릭 시 페이지 이동 함수 호출
      >
        오늘의 링크 추가
      </Button>
    </div>
  );
};

export default AddLink;
