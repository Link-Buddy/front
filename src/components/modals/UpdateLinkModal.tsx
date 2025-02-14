import React from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import { Link, UpdateLink } from 'types/Link';
import { updateLink } from 'api/link';
import { useMessage } from 'hooks/useMessage';

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
  /** alert message */
  const message = useMessage();

  const handleOk = async () => {
    console.log('form', form.getFieldsValue());
    const formData = form.getFieldsValue();
    formData['categoryId'] = linkData.categoryId;

    const result = await updateLink(linkData.id, formData);
    if (result.status === 'OK') {
      message.open({
        type: 'success',
        content: '링크가 수정되었습니다.',
      });
      setTimeout(() => {
        closeModal('editLink');
      }, 3000);
    } else {
      message.open({
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
      <Modal
        title="링크 수정"
        closable={true}
        style={{ padding: 30 }}
        open={isOpen}
        onOk={handleOk}
        onCancel={() => closeModal('editLink')}
        okText="저장"
        cancelText="취소"
        footer={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              size="large"
              style={{ flex: 1, marginRight: 8 }}
              onClick={() => closeModal('editLink')}
            >
              취소
            </Button>
            <Button
              size="large"
              type="primary"
              style={{ flex: 1, marginLeft: 8 }}
              onClick={handleOk}
            >
              확인
            </Button>
          </div>
        }
      >
        <Form
          form={form}
          // onFinish={handleOk}
          onFinishFailed={onFinishFailed}
          initialValues={linkData || {}}
        >
          <Form.Item name="name" label="이름" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="설명">
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="linkUrl" label="URL" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateLinkModal;
