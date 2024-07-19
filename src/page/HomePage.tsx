import React from 'react';
import FavoritesComponent from '../components/Favorites';
import AddLinkComponent from '../components/AddLink';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import NavBar from '../components/NavBar';

const HomePage: React.FC = () => {
  return (
    <Layout className="min-h-screen">
      <Header className="bg-white">{/* <SearchBar /> */}</Header>
      <Content>
        <div className="max-w-screen-md mx-auto">
          <FavoritesComponent />
          <AddLinkComponent />
        </div>
      </Content>
      <NavBar />
    </Layout>
  );
};

export default HomePage;
