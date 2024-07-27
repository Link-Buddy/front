import { Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import NavBar from 'components/NavBar';

const LayoutComponent = ({ children }: any) => {
  return (
    <Layout className="relative max-w-screen-md h-screen mx-auto">
      <Header className="bg-white">
        {/* <Typography.Title>Header</Typography.Title> */}
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
