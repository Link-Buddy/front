import { ConfigProvider, Flex } from 'antd';
import './App.css';
import './style/index.css';
import LayoutComponent from 'components/template/Layout';
import AppRoutes from 'routes';

function App() {
    /** 전역 테마 설정 */
    const antdTheme = {
        token: {
            fontFamily: 'Pretendard',
            colorPrimary: '#457c9d',
        },
    };

    return (
        <div className="App">
            <Flex justify="center">
                <LayoutComponent>
                    <ConfigProvider theme={antdTheme}>
                        <AppRoutes />
                    </ConfigProvider>
                </LayoutComponent>
            </Flex>
        </div>
    );
}
export default App;
