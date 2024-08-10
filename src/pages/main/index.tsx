import React from 'react';
import FavoritesComponent from '../../components/Favorites';
import AddLinkComponent from '../../components/AddLink';
import { useNavigate } from 'react-router-dom';
import MyTopProfile from 'components/MyTopPrifile';

const HomePage: React.FC = () => {
  const userId = 1;
  const navigate = useNavigate();

  const handleDetailClick = () => {
    navigate(`/user/${userId}`);
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="absolute top-8 right-8" onClick={handleDetailClick}>
        <MyTopProfile userId={1} imgSrc="https://via.placeholder.com/64" />
      </div>

      <FavoritesComponent />
      <AddLinkComponent />
    </div>
  );
};

export default HomePage;
