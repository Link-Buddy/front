import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { saveUser } from 'api/user';
import SuccessJoinModal from 'components/modals/SuccessJoinModal';
import { useModal } from 'hooks/useModal';
import { useCallback, useState } from 'react';

const UserJoinPage = () => {
  const [form] = useForm();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null); // 로그인 에러 상태
  const { isOpen, openModal, closeModal } = useModal();

  const handleSignIn = async () => {
    try {
      setLoginError(null); // 이전 에러 메시지 초기화
      const values = await form.validateFields();
      setLoading(true);
      const formData = form.getFieldsValue();

      const result = await saveUser(formData);
      console.log('add user result ??', result);
      if (result.status === 'OK') {
        setLoading(false);
        openModal('successJoin');
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  // password check
  const validatePasswordCheck = useCallback(
    (_: any, value: any) => {
      const password = form.getFieldValue('password');
      if (value === '') {
        return Promise.reject(new Error('비밀번호를 다시 입력해주세요!'));
      } else {
        if (password && password !== value) {
          return Promise.reject(new Error('비밀번호가 일치하지 않습니다!'));
        }
      }
      return Promise.resolve();
    },
    [form]
  );

  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        padding: '0px 25px 50px 25px',
        display: 'flex',
        // alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div style={{ paddingBottom: 30 }}>
        <Typography.Title
          level={4}
          style={{ paddingTop: 30, textAlign: 'start' }}
        >
          Link-Buddy 회원가입
        </Typography.Title>
        <Typography.Text style={{ color: '#808080' }}>
          Link-Buddy에 회원가입해서 친구와 링크를 공유해보세요!
        </Typography.Text>
        <Form
          form={form}
          name="basic"
          layout="vertical"
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            paddingTop: 30,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div>
            <Form.Item
              style={{ width: '100%' }}
              label="이름"
              name="name"
              validateStatus={loginError ? 'error' : ''} // 에러 상태일 때 에러 스타일 적용
              rules={[
                {
                  required: true,
                  message: '이름을 입력해주세요.',
                },
              ]}
            >
              <Input placeholder="이름" size="large" allowClear />
            </Form.Item>
            <Form.Item
              style={{ width: '100%' }}
              label="이메일"
              name="email"
              validateStatus={loginError ? 'error' : ''} // 에러 상태일 때 에러 스타일 적용
              rules={[
                {
                  required: true,
                  message: '이메일을 입력해주세요!',
                },
                {
                  type: 'email',
                  message: '이메일 형식으로 입력해주세요!',
                },
              ]}
            >
              <Input
                type="email"
                placeholder="이메일"
                size="large"
                allowClear
                prefix={<UserOutlined />}
              />
            </Form.Item>
            <Form.Item
              label="비밀번호"
              name="password"
              validateStatus={loginError ? 'error' : ''}
              help={loginError} // 에러 메시지 표시
              rules={[
                {
                  required: true,
                  message: '비밀번호를 입력해주세요.',
                },
              ]}
            >
              <Input.Password
                placeholder="비밀번호"
                size="large"
                prefix={<LockOutlined />}
                allowClear
              />
            </Form.Item>
            <Form.Item
              name="password-check"
              validateStatus={loginError ? 'error' : ''}
              help={loginError} // 에러 메시지 표시
              rules={[
                {
                  validator: validatePasswordCheck,
                },
              ]}
            >
              <Input.Password
                placeholder="비밀번호 확인"
                size="large"
                prefix={<LockOutlined />}
                allowClear
              />
            </Form.Item>
          </div>
        </Form>
      </div>
      <div>
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          loading={loading}
          className="mt-5"
          onClick={handleSignIn}
          style={{ fontWeight: 'bold', height: 50, fontSize: 17 }}
        >
          회원가입
        </Button>
      </div>
      {/* 회원가입 완료 모달 */}
      {isOpen('successJoin') && (
        <SuccessJoinModal
          closeModal={closeModal}
          isOpen={isOpen('successJoin')}
        />
      )}
    </div>
  );
};
export default UserJoinPage;
