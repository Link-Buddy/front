import { HomeOutlined, TeamOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Flex, Layout, Row, Space, Typography } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"
import NavBar from "components/NavBar";
import { useNavigate } from "react-router-dom";

const LayoutComponent = ({children} : any) => {
    const navigate = useNavigate();
    
    return (
        <Layout style={{ maxWidth: '769px', height: '100vh'}} >
            <Header style={{ backgroundColor: 'white'}}>
                {/* <Typography.Title>Header</Typography.Title> */}
            </Header>
            <Content style={{ backgroundColor: 'white', padding: '10px 0px 50px 0px', maxHeight: "calc(100vh - 144px)", overflowY: 'auto'}}>
                {children}
            </Content>
            <NavBar />
            {/* <Row style={{
                backgroundColor: 'white', 
                borderTop: '1px solid #d9d9d9', 
                padding: '20px 20px', 
                zIndex: 999, 
                position: 'fixed', 
                top: "calc(100vh - 80px)",
                width: '100%',
                maxWidth: '769px',
                height: '80px'
            }}>
                <Col span={24}>
                    <Space>
                        <Button type="default" style={{ border: 'none', height: 40}} onClick={() => navigate('/link')}>
                            <Flex vertical align="center">
                                <UserOutlined style={{ fontSize: 23}}/>
                                <Typography.Text>MY</Typography.Text>
                            </Flex>
                        </Button>
                        <Button type="default" style={{ border: 'none', height: 40}}>
                            <Flex vertical align="center">
                                <HomeOutlined style={{ fontSize: 23}}/>
                                <Typography.Text>HOME</Typography.Text>
                            </Flex>
                        </Button>
                        <Button type="default" style={{ border: 'none', height: 40}} onClick={() => navigate('/buddy')}>
                            <Flex vertical align="center">
                                <TeamOutlined style={{ fontSize: 23}}/>
                                <Typography.Text>Buddy</Typography.Text>
                            </Flex>
                        </Button>
                    </Space>
                </Col>
            </Row> */}
        </Layout>
    )
}
export default LayoutComponent;