import { ConfigProvider, Flex } from 'antd';
import './App.css';
import AddLinkPage from './page/AddLinkPage';
import HomePage from './page/HomePage';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutComponent from 'components/template/Layout';
import MyLinkPage from 'page/MyLinkPage';
import MainPage from 'pages/main';
import LoginPage from 'pages/login';
import SearchPage from 'pages/search';
import TestPage from 'pages/test';
import BuddyListPage from 'pages/buddy';
import LinkPage from 'pages/link';
import LinkDetailPage from 'pages/link/detail';

import UserEditPage from 'page/UserEditPage';
import UserPage from 'page/UserPage';
import BuddyPage from 'page/BuddyPage';

function App() {
  const antdTheme = {
    token: {
      fontFamily: 'Pretendard',
    },
  };

  return (
    <div className="App">
      <Flex justify="center">
        <LayoutComponent>
          <ConfigProvider theme={antdTheme}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/my" element={<MyLinkPage />} />
              <Route path="/buddylist" element={<BuddyListPage />} />
              <Route path="/buddy" element={<BuddyPage />} />
              <Route path="/user" element={<UserPage />} />
              <Route path="/user/:userId" element={<UserEditPage />} />
              <Route path="/add-link" element={<AddLinkPage />} />
              <Route path="/main" element={<MainPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route path="/link" element={<LinkPage />} />
              <Route path="/link/:id" element={<LinkDetailPage />} />
            </Routes>
          </ConfigProvider>
        </LayoutComponent>
      </Flex>
    </div>
  );
}
export default App;
