import { message } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import { createContext } from 'react';

export const MessageContext = createContext<MessageInstance | null>(null);

const MessageProvider = ({ children }: any) => {
    const [messageApi, contextHolder] = message.useMessage();

    return (
        <MessageContext.Provider value={messageApi}>
            {contextHolder}
            {children}
        </MessageContext.Provider>
    );
};
export default MessageProvider;
