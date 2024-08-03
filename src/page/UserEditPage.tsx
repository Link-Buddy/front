import React from 'react';
import { useParams } from 'react-router-dom';

const UserEditPage = () => {
  const { userId } = useParams();

  return (
    <div>
      <h1>User Page</h1>
      <p>User ID: {userId}</p>
    </div>
  );
};

export default UserEditPage;
