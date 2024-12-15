import React, { useState } from 'react';
import { Badge, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FolderOpenOutlined } from '@ant-design/icons';

// props에 대한 인터페이스 정의
interface FolderProps {
  id: number;
  title: string;
  count: number;
}

export const generateRandomColor = (): string => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const FolderComponent: React.FC<FolderProps> = ({ id, title, count }) => {
  const navigate = useNavigate();
  const [bgColor] = useState<string>(generateRandomColor()); // 랜덤 컬러 고정

  const onClickFolderDetail = () => {
    console.log('폴더 상세 이동');
    navigate(`/category/${id}`);
  };
  return (
    <Space size="large" className="p-4 m-2">
      <Badge count={count} overflowCount={99} color="cyan">
        <div
          className="w-40 h-36 flex flex-col justify-center items-center"
          onClick={onClickFolderDetail}
          style={{
            backgroundColor: bgColor,
            borderRadius: '12px 12px 3px 3px', // 상단을 둥글게
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)', // 그림자 추가
            cursor: 'pointer', // 클릭 가능한 느낌
          }}
        >
          {/* 폴더의 탑 부분을 만들어주기 위해 위쪽에 작은 박스 추가 */}
          <div
            style={{
              width: '100%',
              height: '12px',
              backgroundColor: '#d3d3d3', // 폴더 상단 색을 옅은 회색으로 설정
              borderRadius: '10px 10px 0 0',
              position: 'absolute',
              top: 0,
            }}
          />
          <FolderOpenOutlined size={36} className="text-white" />{' '}
          {/* 폴더 아이콘 */}
          <div className="text-sm font-bold text-white text-center">
            {title}
          </div>
        </div>
      </Badge>
    </Space>
  );
};

export default FolderComponent;
