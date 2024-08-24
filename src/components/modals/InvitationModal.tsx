import { Divider, Flex, Form, message, Modal, Select, Typography } from "antd"
import { useForm } from "antd/es/form/Form";
import Search from "antd/es/input/Search";
import { addBuddyUser, getBuddyList } from "api/buddy";
import { useEffect, useState } from "react";

interface ModalProps {
    isOpen: boolean;
    closeModal: (key: string) => void;
}

export const InvitationModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
    const [form] = useForm();
    const [messageApi, contextHolder] = message.useMessage();
    // 버디 리스트
    const [buddyList, setBuddyList] = useState<{ label: string, value: number}[]>([]);

    // 초대
    const handleOk = async () => {
        // alert('초대완료!');
        console.log('form', form.getFieldsValue());
        const formData = form.getFieldsValue();
        const result = await addBuddyUser(formData);
        console.log('add buddy user result ??', result);
        if (result.status === "OK") {
            messageApi.open({
                type: 'success',
                content: '초대 완료되었습니다.'
            })
            closeModal('invitation')
        } else {
            messageApi.open({
                type: 'error',
                content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.'
            })
        }
    }

    // 친구 검색
    const onSearch = () => {
        console.log('친구 검색!')
    }

    // 버디 리스트 조회
    const getBuddyListData = async () => {
        const userId = 29;
        const result = await getBuddyList(userId);
        console.log('get buddy list result ??', result);

        let newBuddyList: { label: string, value: number}[] = [];
        result.map((data, index) => {
            newBuddyList.push({
                label: data.name,
                value: Number(data.buddyId)
            })
        });
        setBuddyList(newBuddyList);
    };

    useEffect(() => {
        getBuddyListData()
      }, []);
      
    
    return (
        <Modal 
        title="친구 초대" 
        open={isOpen} 
        onOk={handleOk} 
        onCancel={() => closeModal('invitation')}
        style={{ padding: 30 }}
        >
            {contextHolder}
            <Divider style={{ margin: '10px 0px 20px 0px'}}/>
            <Flex justify="flex-start" vertical gap={'small'}>
                <Form
                    name="invitation"
                    form={form}
                >
                    <Typography.Text style={{ color: '#132639' }} strong>
                        친구 검색
                    </Typography.Text>
                    <Form.Item
                        name="email"
                    >
                        <Search
                            placeholder="이메일을 입력해주세요."
                            allowClear
                            onSearch={onSearch}
                            // style={{ width: 360 }}
                            style={{ width: '100%', height: 40 }}
                        />
                    </Form.Item>
                    <Typography.Text style={{ color: '#132639' }} strong>
                        초대 버디그룹
                    </Typography.Text>
                    <Form.Item
                        name="buddyId"
                    >
                        <Select 
                            style={{ width: '100%' }} 
                            placeholder="초대할 버디그룹을 선택해주세요." 
                            options={buddyList} />
                    </Form.Item>
                </Form>
            </Flex>
            <Divider style={{ margin: '30px 0px 20px 0px'}}/>
        </Modal>
    )
}