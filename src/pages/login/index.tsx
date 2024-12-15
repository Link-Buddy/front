import { LockOutlined, UserOutlined } from '@ant-design/icons';
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
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Row justify={'center'} style={{ paddingBottom: 80, paddingTop: 80 }}>
          <img src="/images/logo_main.png" style={{ width: 170 }} />
        </Row>
      </div>
      <div style={{ paddingTop: 50 }}>
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
            // label="email"
            name="email"
            validateStatus={loginError ? 'error' : ''} // 에러 상태일 때 에러 스타일 적용
            rules={[
              {
                required: true,
                message: '이메일을 입력해주세요!',
              },
            ]}
          >
            <Input
              size="large"
              type="email"
              placeholder="이메일"
              onChange={(e) => setEmail(e.target.value)}
              prefix={<UserOutlined />}
            />
          </Form.Item>
          <Form.Item
            // label="Password"
            name="password"
            validateStatus={loginError ? 'error' : ''}
            help={loginError} // 에러 메시지 표시
            rules={[
              {
                required: true,
                message: '비밀번호를 입력해주세요!',
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="비밀번호"
              onChange={(e) => setPassword(e.target.value)}
              prefix={<LockOutlined />}
            />
          </Form.Item>
          <Row justify={'end'}>
            <Typography.Text>
              <a onClick={() => navigate('/user/join')}>회원가입</a>
            </Typography.Text>
          </Row>
          <Form.Item style={{ paddingTop: 20 }}>
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
              로그인
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div style={{ paddingTop: 10 }}>
        {/* 소셜 로그인 */}
        <Divider>
          <Typography.Text strong>간편로그인</Typography.Text>
        </Divider>
        <Flex justify="center">
          <Row justify={'space-between'}>
            <Col style={{ paddingLeft: 8 }}>
              <div>
                <img
                  src="/images/google_login_btnSI.png"
                  onClick={() => handleSocialLogin('google')}
                  style={{ cursor: 'pointer', height: 50, width: 170 }}
                />
              </div>
            </Col>
            <Col style={{ paddingLeft: 8 }}>
              <div>
                <img
                  src="/images/naver_login_btnG.png"
                  onClick={() => handleSocialLogin('naver')}
                  style={{ cursor: 'pointer', height: 50, width: 170 }}
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
