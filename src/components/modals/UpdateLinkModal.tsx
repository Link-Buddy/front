import React from 'react';
import { Modal, Form, Input } from 'antd';
import { Link, UpdateLink } from 'types/Link';

interface UpdateLinkModalProps {
  closeModal: (modalType: string) => void;
  isOpen: boolean;
  linkData: UpdateLink | null; // 수정할 링크 데이터
  handleSave: (values: Link) => void; // 저장 핸들러
}

const UpdateLinkModal: React.FC<UpdateLinkModalProps> = ({
  closeModal,
  isOpen,
  linkData,
  handleSave,
}) => {
  const [form] = Form.useForm();
  const onFinish = (values: Link) => {
    handleSave(values);
    closeModal('editLink');
  };

  return (
    <Modal
      title="링크 수정"
      visible={isOpen}
      onCancel={() => closeModal('editLink')}
      footer={null}
    >
      <Form form={form} onFinish={onFinish} initialValues={linkData || {}}>
        <Form.Item name="name" label="이름" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="설명">
          <Input.TextArea />
        </Form.Item>
        <Form.Item name="url" label="URL" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item>
          <button type="submit">저장</button>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdateLinkModal;
