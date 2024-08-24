import { LeftOutlined } from '@ant-design/icons';
import { Layout, Typography } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import NavBar from 'components/NavBar';
import { useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const LayoutComponent = ({ children }: any) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { buddyId } = useParams();
  const [showBackBtn, setShowBackBtn] = useState<boolean>(true);

  const handleBackButton = () => {
    console.log('location', location);
    console.log('useParams', buddyId);
    navigate(-1)
  }

  return (
    <Layout className="relative max-w-screen-md h-screen mx-auto">
      <Header className="bg-white">
        {showBackBtn && (
          <LeftOutlined style={{ fontSize: 22 }} onClick={() => handleBackButton()}/>
        )}
      </Header>
      <Content
        style={{
          backgroundColor: 'white',
          padding: '10px 0px 50px 0px',
          maxHeight: 'calc(100vh - 144px)',
          overflowY: 'auto',
        }}
      >
        {children}
      </Content>
      <NavBar />
    </Layout>
  );
};
export default LayoutComponent;
