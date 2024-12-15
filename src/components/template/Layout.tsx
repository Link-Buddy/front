import { LeftOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import NavBar from 'components/NavBar';
import TopBar from 'components/topBar';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const LayoutComponent = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showBackBtn, setShowBackBtn] = useState<boolean>(false);
  const showBackBtnPath = ['/category', '/buddy'];
  const hideBackBtnPath = ['/buddy/list'];

  const handleBackButton = () => {
    navigate(-1);
  };

  const showTopBar = !location.pathname.startsWith('/user');

  useEffect(() => {
    // 뒤로가기 버튼 노출 페이지인지 확인
    const checkShowBackBtnPath =
      showBackBtnPath.some((path) => location.pathname.startsWith(path)) &&
      !hideBackBtnPath.some((path) => location.pathname.startsWith(path));

    if (checkShowBackBtnPath) {
      setShowBackBtn(true);
    } else {
      setShowBackBtn(false);
    }
  }, [location.pathname]);

  return (
    <Layout className="relative max-w-screen-md">
      {showTopBar && <TopBar />}
      <Content
        style={{
          backgroundColor: 'white',
          padding: '80px 0px 80px 0px',
          // maxHeight: 'calc(100vh - 144px)',
          // maxHeight: 'auto',
          height: '100%',
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
      <NavBar />
    </Layout>
  );
};
export default LayoutComponent;
