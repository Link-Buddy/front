import { ConfigProvider, Flex } from 'antd';
import './App.css';
import './style/index.css';
import LayoutComponent from 'components/template/Layout';
import { useEffect } from 'react';
import AppRoutes from 'routes';
import MessageProvider from 'components/MessageProvider';

function App() {
    /** 전역 테마 설정 */
    const antdTheme = {
        token: {
            fontFamily: 'Pretendard',
            colorPrimary: '#457c9d',
        },
    };

    useEffect(() => {
        localStorage.setItem('recentLinks', JSON.stringify([]));
    }, []);

    return (
        <div className="App">
            <Flex justify="center">
                <LayoutComponent>
                    <ConfigProvider theme={antdTheme}>
                        <MessageProvider>
                            <AppRoutes />
                        </MessageProvider>
                    </ConfigProvider>
                </LayoutComponent>
            </Flex>
        </div>
    );
}
export default App;
