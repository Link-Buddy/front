import {
  HeartOutlined,
  LinkOutlined,
  LogoutOutlined,
  RollbackOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button, Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { removeAccessKey } from 'utils/authStorage';
import { getMyInfo } from 'api/user';

const UserPage: React.FC<{}> = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [userInfo, setUserInfo] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const data = await getMyInfo();
      setUserInfo(data);
    };
    fetchUserInfo();
  }, []);
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // 탈퇴 처리 로직
    console.log('회원탈퇴');
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleLogoutClick = () => {
    removeAccessKey(); // JWT 토큰 제거
    navigate('/login'); // 로그인 페이지로 리디렉션
  };

  const handleEditClick = () => {
    navigate(`/user/edit/my`);
  };

  const navigate = useNavigate();

  return (
    <div className="flex flex-col mr-8 ml-8 items-center p-4 bg-white rounded-lg  mx-auto">
      <div className="flex items-center w-full mb-14">
        <Avatar size={50} icon={<UserOutlined />} className="mr-4" />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            {userInfo && (
              <>
                <span className="font-bold text-xl">{userInfo.name}</span>
                <span className="text-gray-600">{userInfo.email}</span>
              </>
            )}
          </div>
          <Button
            type="link"
            className="text-blue-500"
            onClick={handleEditClick}
          >
            편집
          </Button>
        </div>
      </div>
      <div className="flex justify-around w-full mb-4">
        <div className="text-center">
          <LinkOutlined className="text-3xl mb-3" />
          <div className="text-xl font-bold">9</div>
          <div className="text-gray-600">내가 등록한 링크</div>
        </div>
        <div>
          <HeartOutlined className="text-3xl mb-3" />
          <div className="text-xl font-bold">3</div>
          <div className="text-gray-600">즐겨찾기</div>
        </div>
        <div className="text-center">
          <RollbackOutlined className="text-3xl mb-3" />
          <div className="text-xl font-bold">14</div>
          <div className="text-gray-600">최근 본 링크</div>
        </div>
      </div>

      <div className="flex flex-col gap-4 mt-12">
        <Button
          type="link"
          icon={<LogoutOutlined />} // 로그아웃 아이콘
          className="text-red-500"
          onClick={handleLogoutClick} // 로그아웃 클릭 핸들러
        >
          로그아웃
        </Button>
        <h5 className="mt-16 cursor-pointer text-red-500" onClick={showModal}>
          회원탈퇴
        </h5>
        <Modal
          title="회원탈퇴"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="확인"
          cancelText="취소"
        >
          <p>정말 탈퇴하시겠습니까?</p>
        </Modal>
      </div>
    </div>
  );
};

export default UserPage;
