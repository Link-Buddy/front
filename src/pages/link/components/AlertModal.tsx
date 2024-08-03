import { Flex, Modal, Radio, Select, Space, Typography } from "antd";
import { useEffect, useState } from "react";

interface ModalProps {
    type: string;
    isOpen: boolean;
    setIsOpen: (e: boolean) => void;
    selectedLink?: number[];
    handleOk: any;
}

const AlertModalComponent: React.FC<ModalProps> = ({ type, handleOk, isOpen, setIsOpen, selectedLink }) => {
    const [title, setTitle] = useState<string>('');

    const handleCancel = () => {
        setIsOpen(false);
    };

    const createTitle = (type: string) => {
        switch (type) {
            case 'delete':
                setTitle('삭제하시겠습니까?')
                break;
            case 'update':
                setTitle("수정하시겠습니까?")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        createTitle(type);

    }, [type])

    return (
        <Modal 
                title={title} 
                open={isOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                style={{ padding: 30 }}
            >
            <Typography.Text style={{ color: '#132639' }} strong>
                선택한 링크 key :  
                {selectedLink && selectedLink.map((link, index) => {
                    return (
                        <Typography.Text style={{ color: '#132639' }} key={index}>
                            {link}, 
                        </Typography.Text>
                    )
                })}
            </Typography.Text>
        </Modal>
    )
}
export default AlertModalComponent;