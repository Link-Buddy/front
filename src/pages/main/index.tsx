import React from 'react';
import FavoritesComponent from '../../components/Favorites';
import AddLinkComponent from '../../components/AddLink';
import WeeklyStamp from 'components/WeeklyStamp';
const HomePage: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto p-4">
      <FavoritesComponent />
      <AddLinkComponent />
      <WeeklyStamp />
    </div>
  );
};

export default HomePage;
