import { Button, Form, Input, Typography } from 'antd';
import { signIn } from 'api/auth';
import { useState } from 'react';
import { saveAccessKey } from 'utils/storage';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = async () => {
    try {
      const data = await signIn(email, password);
      saveAccessKey(data.accessKey);
      alert('로그인 성공!');
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  };

  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ height: '100%', padding: '0px 25px 50px 25px ' }}>
      <Typography.Title level={5} style={{ paddingBottom: 8 }}>
        로그인
      </Typography.Title>
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="email"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your email!',
            },
          ]}
        >
          <Input
            type="email"
            placeholder="이메일"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password
            placeholder="비밀번호"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" onClick={handleSignIn}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};
export default LoginPage;
