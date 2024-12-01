import { Button, Col, Divider, Flex, Form, Input, Row, Typography } from 'antd';
import { signIn } from 'api/auth';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { saveAccessKey } from 'utils/authStorage';

const LoginPage = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string | null>(null); // 로그인 에러 상태

  const navigate = useNavigate();

  const handleSignIn = async () => {
    setLoading(true);
    setLoginError(null); // 이전 에러 메시지 초기화

    try {
      const data = await signIn(email, password);

      saveAccessKey(data.accessToken);

      navigate('/home');
    } catch (error) {
      console.log('error', error);
      if (error instanceof Error) {
        setLoginError('로그인 정보가 일치하지 않습니다.');
      }
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  const onFinish = (values: string) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const handleSocialLogin = (provider: string) => {
    const socialLoginUrl = `http://localhost:8080/oauth2/authorization/${provider}`; // 소셜 로그인 URL 생성
    window.location.href = socialLoginUrl;
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
        로그인
      </Typography.Title>
      <Form
        name="basic"
        layout="vertical"
        // labelCol={{
        //   span: 8,
        // }}
        // wrapperCol={{
        //   span: 16,
        // }}
        // style={{
        //   maxWidth: 600,
        // }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          style={{ width: '100%' }}
          label="email"
          name="email"
          validateStatus={loginError ? 'error' : ''} // 에러 상태일 때 에러 스타일 적용
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
          validateStatus={loginError ? 'error' : ''}
          help={loginError} // 에러 메시지 표시
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
            로그인
          </Button>
        </Form.Item>
        <Typography.Text>
          <a onClick={() => navigate('/user/join')}>회원가입</a>
        </Typography.Text>
      </Form>
      <div style={{ paddingTop: 40 }}>
        {/* 소셜 로그인 */}
        <Divider>
          <Typography.Text strong>간편로그인</Typography.Text>
        </Divider>
        <Flex justify="center">
          <Row>
            <Col>
              <Button
                type="default"
                onClick={() => handleSocialLogin('google')}
                style={{
                  width: '100%',
                  maxWidth: '200px',
                  backgroundColor: '#4285F4',
                  color: 'white',
                  fontWeight: 'bold',
                }}
              >
                Google로 로그인
              </Button>
            </Col>
            <Col style={{ paddingLeft: 8 }}>
              <div>
                <img
                  src="/images/naver_login_btnG.png"
                  onClick={() => handleSocialLogin('naver')}
                  style={{ cursor: 'pointer', height: 50 }}
                />
              </div>
            </Col>
          </Row>
        </Flex>
      </div>
    </div>
  );
};
export default LoginPage;
