import React from 'react';
import { Avatar } from 'antd';

interface UserProfileProps {
  userId: number;
  username: string;
  imgSrc: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  imgSrc,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar size={80} icon={<img src={imgSrc} alt={username} />} />
      <div className="text-sm mt-2">{username}</div>
    </div>
  );
};

export default UserProfile;
