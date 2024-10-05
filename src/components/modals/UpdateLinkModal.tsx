import React from 'react';
import { Modal, Form, Input, message } from 'antd';
import { Link, UpdateLink } from 'types/Link';
import { updateLink } from 'api/link';

interface UpdateLinkModalProps {
    closeModal: (modalType: string) => void;
    isOpen: boolean;
    linkData: UpdateLink; // 수정할 링크 데이터
    // handleSave: (values: Link) => void; // 저장 핸들러
    refresh: number;
    setRefresh: (e: number) => void;
}

const UpdateLinkModal: React.FC<UpdateLinkModalProps> = ({
    closeModal,
    isOpen,
    linkData,
    // handleSave,
    refresh,
    setRefresh,
}) => {
    const [form] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const onFinish = (values: Link) => {
        // handleSave(values);
        closeModal('editLink');
    };

    const handleOk = async () => {
        console.log('form', form.getFieldsValue());
        const formData = form.getFieldsValue();
        formData['categoryId'] = linkData.categoryId;

        const result = await updateLink(linkData.id, formData);
        if (result.status === 'OK') {
            messageApi.open({
                type: 'success',
                content: '링크가 수정되었습니다.',
            });
            closeModal('editLink');
        } else {
            messageApi.open({
                type: 'error',
                content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
            });
        }
        setRefresh(refresh + 1);
    };

    const onFinishFailed = (error: any) => {
        console.log('error', error);
    };

    return (
        <>
            {contextHolder}
            <Modal
                title="링크 수정"
                open={isOpen}
                onOk={handleOk}
                onCancel={() => closeModal('editLink')}
                // footer={null}
            >
                <Form
                    form={form}
                    // onFinish={handleOk}
                    onFinishFailed={onFinishFailed}
                    initialValues={linkData || {}}
                >
                    <Form.Item
                        name="name"
                        label="이름"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="설명">
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        name="linkUrl"
                        label="URL"
                        rules={[{ required: true }]}
                    >
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
};

export default UpdateLinkModal;
