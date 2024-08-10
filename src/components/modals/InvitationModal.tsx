import { Divider, Flex, Modal, Select, Typography } from "antd"
import Search from "antd/es/input/Search";

interface ModalProps {
    isOpen: boolean;
    closeModal: (key: string) => void;
}

export const InvitationModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    const handleOk = () => {
        alert('초대완료!');
    }

    const onSearch = () => {
        console.log('친구 검색!')
    }
    
    return (
        <Modal 
            title="친구 초대" 
            open={isOpen} 
            onOk={handleOk} 
            onCancel={() => closeModal('invitation')}
            style={{ padding: 30 }}
        >
            <Divider style={{ margin: '10px 0px 20px 0px'}}/>
            <Flex justify="flex-start" vertical gap={'small'}>
                <Typography.Text style={{ color: '#132639' }} strong>
                    친구 검색
                </Typography.Text>
                <Search
                    placeholder="검색어를 입력해주세요."
                    allowClear
                    onSearch={onSearch}
                    // style={{ width: 360 }}
                    style={{ width: '100%', height: 40 }}
                />
                <Typography.Text style={{ color: '#132639' }} strong>
                    초대 버디그룹
                </Typography.Text>
                <Select style={{ width: '100%' }} placeholder="초대할 버디그룹을 선택해주세요." options={[{ label: '가족', value: 'family'}, { label: '스터디', value: 'study'}]} />
            </Flex>
            <Divider style={{ margin: '30px 0px 20px 0px'}}/>
        </Modal>
    )
}