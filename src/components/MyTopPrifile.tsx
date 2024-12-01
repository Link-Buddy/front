import React from 'react';
import { Avatar } from 'antd';

interface MyTopProfileProps {
  imageUrl: string;
}

const MyTopProfile: React.FC<MyTopProfileProps> = ({ imageUrl }) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar size={40} icon={<img src={imageUrl} alt="profile" />} />
    </div>
  );
};

export default MyTopProfile;
