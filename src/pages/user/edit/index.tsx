// UserInfoForm.tsx

import { Form, Input, Button, Modal } from 'antd';
import { useParams, useNavigate } from 'react-router-dom';
import { UserInfo } from 'types/User'; // UserInfo 타입 추가
import React, { useEffect, useState } from 'react'; // useEffect 및 useState 추가
import { changeMyPassword, getMyInfo, updateMyInfo } from 'api/user';

const UserEditPage: React.FC = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null); // 사용자 정보 상태 추가
  const [isModalVisible, setIsModalVisible] = useState(false); // 모달 상태 추가

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getMyInfo(); // API 호출
      setUserInfo(data); // 상태 업데이트
      form.setFieldsValue({
        username: data.email, // 이메일을 아이디 필드에 설정
        name: data.name, // 닉네임 필드에 설정
      });
    };
    fetchUserInfo();
  }, [form]);

  const showModal = () => {
    setIsModalVisible(true); // 모달 열기
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      await changeMyPassword(values.currentPassword, values.newPassword);
      alert('비밀번호가 변경되었습니다.');
      setIsModalVisible(false);
    } catch (error) {
      form.resetFields(['currentPassword', 'newPassword']);
    }
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields(); // 폼의 값을 검증하고 가져옴
      await updateMyInfo(values);
      alert('정보가 수정되었습니다.');
    } catch (error) {
      // 에러 처리 로직 추가
    }
  };
  const handleModalCancel = () => {
    setIsModalVisible(false);
  };
  const handlePageCancel = () => {
    navigate(`/user/my`);
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
        >
          <div className="flex items-center">
            <Form.Item
              label="아이디"
              name="username"
              rules={[{ required: true, message: '아이디를 입력해주세요!' }]}
              className="flex-grow"
            >
              <Input placeholder="아이디" className="p-2" disabled />
            </Form.Item>
            <Button type="primary" onClick={showModal} className="ml-2">
              비밀번호 변경
            </Button>
            <Modal
              title="비밀번호 변경"
              open={isModalVisible}
              onOk={handleOk}
              onCancel={handleModalCancel}
            >
              <Form form={form} layout="vertical">
                <Form.Item
                  label="현재 비밀번호"
                  name="currentPassword"
                  rules={[
                    { required: true, message: '비밀번호를 입력해주세요!' },
                  ]}
                >
                  <Input.Password placeholder="현재 비밀번호" className="p-2" />
                </Form.Item>
                <Form.Item
                  label="새 비밀번호"
                  name="newPassword"
                  rules={[
                    { required: true, message: '새 비밀번호를 입력해주세요!' },
                  ]}
                >
                  <Input.Password placeholder="새 비밀번호" className="p-2" />
                </Form.Item>
              </Form>
            </Modal>
          </div>
          <Form.Item
            label="이름"
            name="name"
            rules={[{ required: true, message: '이름을 입력해주세요!' }]}
          >
            <Input placeholder="이름" className="p-2" />
          </Form.Item>

          <div className="w-full flex items-center justify-between mt-14">
            <Form.Item className="w-full">
              <Button
                type="default"
                htmlType="button"
                className="w-3/4 h-10"
                onClick={handlePageCancel}
              >
                취소
              </Button>
            </Form.Item>
            <Form.Item className="w-full">
              <Button
                type="primary"
                htmlType="submit"
                className="w-3/4 h-10"
                onClick={handleSubmit}
              >
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
