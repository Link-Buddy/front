import { LeftOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import NavBar from 'components/NavBar';
import TopBar from 'components/topBar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const checkPathMatch = (paths: string[], currentPath: string) =>
  paths.some((path) => currentPath.startsWith(path));

const LayoutComponent = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  // 뒤로가기 버튼
  const [showBackBtn, setShowBackBtn] = useState<boolean>(false);
  const showBackBtnPath = ['/category', '/buddy', '/user/join', '/add-buddy'];
  const hideBackBtnPath = ['/buddy/list'];
  // NavBar
  const [showNavBar, setShowNavBar] = useState<boolean>(true);
  const hideNavBarPath = ['/login', '/user/join'];
  // TopBar
  const [showTopBar, setShowTopBar] = useState<boolean>(false);
  const hideTopBarPath = ['/login', '/user'];

  const handleBackButton = () => {
    navigate(-1);
  };

  useEffect(() => {
    const currentPath = location.pathname;

    // TopBar 노출 페이지인지 확인
    const hideTopBarStatus = !checkPathMatch(hideTopBarPath, currentPath);
    setShowTopBar(hideTopBarStatus);

    // NavBar 노출 페이지인지 확인
    const hideNavBarStatus = !checkPathMatch(hideNavBarPath, currentPath);
    setShowNavBar(hideNavBarStatus);

    // 뒤로가기 버튼 노출 페이지인지 확인
    const showBackBtnStatus =
      checkPathMatch(showBackBtnPath, currentPath) &&
      !checkPathMatch(hideBackBtnPath, currentPath);
    setShowBackBtn(showBackBtnStatus);
  }, [
    hideBackBtnPath,
    hideNavBarPath,
    hideTopBarPath,
    location.pathname,
    showBackBtnPath,
  ]);

  return (
    <Layout className="relative max-w-screen-md h-dvh">
      {showTopBar && <TopBar />}
      <Content
        style={{
          backgroundColor: 'white',
          padding: showTopBar ? '80px 0px 80px 0px' : '40px 0px 40px 0px',
          // maxHeight: 'calc(100vh - 144px)',
          // maxHeight: 'auto',
          // height: '100%',
          overflowY: 'auto',
        }}
      >
        {showBackBtn && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-start',
              alignItems: 'center',
              paddingLeft: '25px',
            }}
          >
            <LeftOutlined
              style={{ fontSize: 22 }}
              onClick={() => handleBackButton()}
            />
          </div>
        )}
        {children}
      </Content>
      {showNavBar && <NavBar />}
    </Layout>
  );
};
export default LayoutComponent;
