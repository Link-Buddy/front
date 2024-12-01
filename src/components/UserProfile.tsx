import React from 'react';
import { Avatar } from 'antd';

interface UserProfileProps {
  userId: number;
  username: string;
  imageUrl: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  userId,
  username,
  imageUrl,
}) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar size={80} icon={<img src={imageUrl} alt={username} />} />
      <div className="text-sm mt-2">{username}</div>
    </div>
  );
};

export default UserProfile;
