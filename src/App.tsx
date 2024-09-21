import { ConfigProvider, Flex } from 'antd';
import './App.css';
import AddLinkPage from './pages/link/add';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutComponent from 'components/template/Layout';

import LoginPage from 'pages/login';
import SearchPage from 'pages/search';
import TestPage from 'pages/test';
import BuddyListPage from 'pages/buddy';
import LinkDetailPage from 'pages/link/detail';
import UserEditPage from 'pages/user/edit';
import BuddyPage from 'pages/buddy/detail';
import HomePage from 'pages/main';
import UserPage from 'pages/user';
import MyLinkPage from 'pages/link';
import BuddyInvitationPage from 'pages/buddy/invitation';

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
              <Route path="/buddy/:buddyId" element={<BuddyPage />} />
              <Route path="/buddy/list" element={<BuddyListPage />} />
              <Route
                path="/buddy/invitation"
                element={<BuddyInvitationPage />}
              />
              <Route path="/user/:userId" element={<UserPage />} />
              <Route path="/user/edit/my" element={<UserEditPage />} />
              <Route path="/add-link" element={<AddLinkPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/test" element={<TestPage />} />
              <Route
                path="/my/category/:categoryId"
                element={<LinkDetailPage />}
              />
            </Routes>
          </ConfigProvider>
        </LayoutComponent>
      </Flex>
    </div>
  );
}
export default App;
