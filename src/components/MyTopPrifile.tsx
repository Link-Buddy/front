import React from 'react';
import { Avatar } from 'antd';

interface MyTopProfileProps {
  userId: number;
  imgSrc: string;
}

const MyTopProfile: React.FC<MyTopProfileProps> = ({ userId, imgSrc }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar size={40} icon={<img src={imgSrc} />} />
    </div>
  );
};

export default MyTopProfile;
