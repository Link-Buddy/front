import { Modal, Typography } from "antd";
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: (key: string) => void;
    type: string;
    selectedLink?: number[];
    handleOk: any;
}

export const AlertModal: React.FC<ModalProps> = ({ isOpen, closeModal, type, selectedLink, handleOk }) => {
    const [title, setTitle] = useState<string>('');


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
                onCancel={() => closeModal('alert')}
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