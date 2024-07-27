import { ConfigProvider, Flex } from 'antd';
import './App.css';
import AddLinkPage from './page/AddLinkPage';
import HomePage from './page/HomePage';
import './style/index.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LayoutComponent from 'components/template/Layout';
import MainComponent from 'pages/main';
import LoginComponent from 'pages/login';
import TestComponent from 'pages/test';
import BuddyComponent from 'pages/buddy';
import LinkComponent from 'pages/link';
import LinkDetailComponent from 'pages/link/detail';
import SearchComponent from 'pages/search';
import MyLinkPage from 'page/MyLinkPage';

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
              <Route path="/home" element={<HomePage />} />
              <Route path="/my" element={<MyLinkPage />} />

              <Route path="/add-link" element={<AddLinkPage />} />
              <Route path="/main" element={<MainComponent />} />
              <Route path="/login" element={<LoginComponent />} />
              <Route path="/test" element={<TestComponent />} />
              <Route path="/search" element={<SearchComponent />} />
              <Route path="/buddy" element={<BuddyComponent />} />
              <Route path="/link" element={<LinkComponent />} />
              <Route path="/link/:id" element={<LinkDetailComponent />} />
            </Routes>
          </ConfigProvider>
        </LayoutComponent>
      </Flex>
    </div>
  );
}
export default App;
