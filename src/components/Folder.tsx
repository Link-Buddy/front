import React from 'react';
import { Badge, Space } from 'antd';

// props에 대한 인터페이스 정의
interface FolderProps {
  title: string;
  count: number;
}
const FolderComponent: React.FC<FolderProps> = ({ title, count }) => (
  <Space size="large" className="p-4 m-4">
    <Badge count={count} overflowCount={99} color="cyan">
      <div className="w-40 h-40 bg-gray-500 rounded-lg flex flex-col justify-between">
        <div></div>
        <div className="flex justify-center items-center h-12">
          <span className="text-white">{title}</span>
        </div>
      </div>
    </Badge>
  </Space>
);

export default FolderComponent;
