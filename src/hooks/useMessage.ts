import { MessageContext } from 'components/MessageProvider';
import { useContext } from 'react';

export const useMessage = () => {
    const context = useContext(MessageContext);
    if (!context) {
        throw new Error('useMessage ERROR');
    }
    return context;
};
