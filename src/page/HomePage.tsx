import React from 'react';
import FavoritesComponent from '../components/Favorites';
import AddLinkComponent from '../components/AddLink';
const HomePage: React.FC = () => {
  return (
    <div className="max-w-screen-md mx-auto">
      <FavoritesComponent />
      <AddLinkComponent />
    </div>
  );
};

export default HomePage;
