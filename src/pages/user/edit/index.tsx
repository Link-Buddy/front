// UserInfoForm.tsx
import React from 'react';
import { Form, Input, Button } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';

interface UserInfoFormProps {
  userId: string;
}
const UserEditPage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleCancel = () => {
    // 취소 버튼
    navigate(`/user/${userId}`);
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">내 정보 수정</h2>
      <div>
        <Form
          form={form}
          name="userInfo"
          layout="vertical"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="아이디"
            name="username"
            rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
          >
            <Input placeholder="아이디" className="p-2" />
          </Form.Item>

          <Form.Item
            label="비밀번호"
            name="currentPassword"
            rules={[{ required: true, message: '비밀번호를 입력해주세요!' }]}
          >
            <Input.Password placeholder="비밀번호" className="p-2" />
          </Form.Item>

          <Form.Item
            label="새 비밀번호"
            name="newPassword"
            rules={[{ required: true, message: '새 비밀번호를 입력해주세요!' }]}
          >
            <Input.Password placeholder="새 비밀번호" className="p-2" />
          </Form.Item>

          <Form.Item
            label="비밀번호 확인"
            name="confirmNewPassword"
            dependencies={['newPassword']}
            hasFeedback
            rules={[
              { required: true, message: '비밀번호 확인을 입력해주세요!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다!')
                  );
                },
              }),
            ]}
          >
            <Input.Password placeholder="비밀번호 확인" className="p-2" />
          </Form.Item>

          <Form.Item
            label="닉네임"
            name="nickname"
            rules={[{ required: true, message: '닉네임을 입력해주세요!' }]}
          >
            <Input placeholder="닉네임" className="p-2" />
          </Form.Item>
          <div className="w-full flex items-center justify-between mt-14">
            <Form.Item className="w-full">
              <Button
                type="default"
                htmlType="button"
                className="w-3/4 h-10"
                onClick={handleCancel}
              >
                취소
              </Button>
            </Form.Item>
            <Form.Item className="w-full">
              <Button type="primary" htmlType="submit" className="w-3/4 h-10">
                수정
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default UserEditPage;
