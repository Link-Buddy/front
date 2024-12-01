import { Button, Form, Input, Typography } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { saveUser } from 'api/user';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserJoinPage = () => {
  const [form] = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null); // 로그인 에러 상태

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
        navigate('/login');
      } else {
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };

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
      }}
    >
      <Typography.Title
        level={4}
        style={{ paddingBottom: 8, textAlign: 'center' }}
      >
        회원가입
      </Typography.Title>
      <Form
        form={form}
        name="basic"
        layout="vertical"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
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
          <Input placeholder="이름" />
        </Form.Item>
        <Form.Item
          style={{ width: '100%' }}
          label="이메일"
          name="email"
          validateStatus={loginError ? 'error' : ''} // 에러 상태일 때 에러 스타일 적용
          rules={[
            {
              required: true,
              message: '이메일을 입력해주세요.',
            },
          ]}
        >
          <Input type="email" placeholder="이메일" />
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
          <Input.Password placeholder="비밀번호" />
        </Form.Item>
        <Form.Item style={{}}>
          <Button
            block
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            className="mt-5"
            onClick={handleSignIn}
          >
            회원가입
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default UserJoinPage;
