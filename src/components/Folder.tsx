import React from 'react';
import { Badge, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

// props에 대한 인터페이스 정의
interface FolderProps {
  id: number;
  title: string;
  count: number;
}
const FolderComponent: React.FC<FolderProps> = ({ id, title, count }) => {
  const navigate = useNavigate();
  const onClickFolderDetail = () => {
    console.log('폴더 상세 이동');
    navigate(`/category/${id}`);
  };
  return (
    <Space size="large" className="p-4 m-2 ">
      <Badge count={count} overflowCount={99} color="cyan">
        <div
          className="w-40 h-40 bg-gray-500 rounded-lg flex flex-col justify-between"
          onClick={onClickFolderDetail}
        >
          <div className="flex justify-center items-center h-12">
            <span className="text-white">{title}</span>
          </div>
        </div>
      </Badge>
    </Space>
  );
};

export default FolderComponent;
