import {
  Button,
  Divider,
  Flex,
  Form,
  message,
  Modal,
  Select,
  Typography,
} from 'antd';
import { useForm } from 'antd/es/form/Form';
import Search from 'antd/es/input/Search';
import { addBuddyUser, getBuddyList } from 'api/buddy';
import { getUserList } from 'api/user';
import { useMessage } from 'hooks/useMessage';
import { useEffect, useState } from 'react';

interface ModalProps {
  isOpen: boolean;
  closeModal: (key: string) => void;
}

export const InvitationModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
}) => {
  const [form] = useForm();
  /** alert message */
  const message = useMessage();
  // 버디 리스트
  const [buddyList, setBuddyList] = useState<
    { label: string; value: number }[]
  >([]);
  const [validationStatus, setValidationStatus] = useState<
    'success' | 'error' | undefined
  >(undefined);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );

  // 초대
  const handleOk = async () => {
    // alert('초대완료!');
    const values = await form.validateFields();
    console.log('form', form.getFieldsValue());
    const formData = form.getFieldsValue();
    const result = await addBuddyUser(formData);
    console.log('add buddy user result ??', result);
    if (result.status === 'OK') {
      message.open({
        type: 'success',
        content: '초대 완료되었습니다.',
      });
      setTimeout(() => {
        closeModal('invitation');
      }, 3000);
    } else {
      message.open({
        type: 'error',
        content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      });
    }
  };

  // 친구 검색
  const onSearch = async (value: string) => {
    console.log('친구 검색!', value);
    // TO-DO : value - email 형식 validation

    const result = await getUserList(value);
    console.log('result 확인', result);

    if (!result.data) {
      //   form.setFields([
      //     {
      //       name: 'email',
      //       errors: ['존재하지 않는 회원입니다.'],
      //     },
      //   ]);
      setValidationStatus('error');
      setValidationMessage('존재하지 않는 회원입니다!');
    } else {
      setValidationStatus('success');
      setValidationMessage('회원 정보를 찾았습니다!');
    }
  };

  // 버디 리스트 조회
  const getBuddyListData = async () => {
    const result = await getBuddyList();
    console.log('get buddy list result ??', result);

    let newBuddyList: { label: string; value: number }[] = [];
    result.map((data, index) => {
      newBuddyList.push({
        label: data.name,
        value: Number(data.buddyId),
      });
    });
    setBuddyList(newBuddyList);
  };

  useEffect(() => {
    getBuddyListData();
  }, []);

  const onFinishFailed = (error: any) => {
    console.log('error', error);
  };

  return (
    <>
      <Modal
        title="친구 초대"
        open={isOpen}
        onOk={handleOk}
        onCancel={() => closeModal('invitation')}
        style={{ padding: 30 }}
        okText="확인"
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
              onClick={() => closeModal('buddyOut')}
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
        <Divider style={{ margin: '10px 0px 20px 0px' }} />
        <Flex justify="flex" vertical>
          <Form
            name="invitation"
            form={form}
            onFinish={handleOk}
            onFinishFailed={onFinishFailed}
          >
            <div>
              <Typography.Text style={{ color: '#132639' }} strong>
                친구 검색
              </Typography.Text>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: '이메일을 입력해주세요.',
                  },
                ]}
                validateStatus={validationStatus}
                help={
                  validationMessage && (
                    <span
                      style={{
                        color:
                          validationStatus === 'success' ? '#00e673' : 'red', // 상태에 따른 색상 설정
                        paddingTop: '7px',
                        display: 'block',
                      }}
                    >
                      {validationMessage}
                    </span>
                  )
                }
              >
                <Search
                  placeholder="이메일을 입력해주세요."
                  onSearch={onSearch}
                  // style={{ width: 360 }}
                  onChange={(e) => {
                    if (e.target.value === '') {
                      setValidationStatus('error');
                      setValidationMessage('이메일을 입력해주세요.');
                    }
                  }}
                  style={{
                    width: '100%',
                    height: 40,
                    paddingTop: 5,
                  }}
                  enterButton="검색"
                  size="large"
                />
              </Form.Item>
            </div>
            <div style={{ paddingTop: 20 }}>
              <Typography.Text style={{ color: '#132639' }} strong>
                초대 버디그룹
              </Typography.Text>
              <Form.Item
                name="buddyId"
                rules={[
                  {
                    required: true,
                    message: '초대할 버디그룹을 선택해주세요.',
                  },
                ]}
              >
                <Select
                  style={{ width: '100%', paddingTop: 5 }}
                  placeholder="초대할 버디그룹을 선택해주세요."
                  options={buddyList}
                  size="large"
                />
              </Form.Item>
            </div>
          </Form>
        </Flex>
        <Divider style={{ margin: '30px 0px 20px 0px' }} />
      </Modal>
    </>
  );
};
