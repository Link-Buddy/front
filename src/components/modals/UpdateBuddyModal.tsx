import React from 'react';
import { Modal, Form, Input, message, Button } from 'antd';
import { Link, UpdateLink } from 'types/Link';
import { updateLink } from 'api/link';
import { useMessage } from 'hooks/useMessage';
import { updateBuddy } from 'api/buddy';

interface UpdateBuddyModalProps {
  closeModal: (modalType: string) => void;
  isOpen: boolean;
  data: {
    id: number;
    name: string;
    createdAt: number;
  };
  // handleSave: (values: Link) => void; // 저장 핸들러
  refresh: number;
  setRefresh: (e: number) => void;
}

const UpdateBuddyModal: React.FC<UpdateBuddyModalProps> = ({
  closeModal,
  isOpen,
  data,
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
    formData['buddyId'] = data.id;

    const result = await updateBuddy(data.id, formData);
    if (result.status === 'OK') {
      message.open({
        type: 'success',
        content: '버디 이름이 수정되었습니다.',
      });
      setTimeout(() => {
        closeModal('editBuddy');
      }, 1000);
    } else {
      message.open({
        type: 'error',
        content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      });
    }
    setRefresh(refresh + 1);
    window.location.reload();
  };

  const onFinishFailed = (error: any) => {
    console.log('error', error);
  };

  return (
    <>
      <Modal
        title="버디 수정"
        closable={true}
        style={{ padding: 30 }}
        open={isOpen}
        onOk={handleOk}
        onCancel={() => closeModal('editBuddy')}
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
              onClick={() => closeModal('editBuddy')}
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
          style={{ paddingTop: 10, paddingBottom: 20 }}
          initialValues={data || {}}
        >
          <Form.Item
            name="name"
            label="이름"
            rules={[{ required: true, message: '버디 이름을 입력해주세요.' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default UpdateBuddyModal;
