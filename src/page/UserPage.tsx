import {
  HeartOutlined,
  LinkOutlined,
  RollbackOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Avatar, Button } from 'antd';
import React from 'react';

const UserPage = () => {
  return (
    <div className="flex flex-col mr-8 ml-8 items-center p-4 bg-white rounded-lg  mx-auto">
      <div className="flex items-center w-full mb-14">
        <Avatar size={50} icon={<UserOutlined />} className="mr-4" />
        <div className="flex justify-between w-full items-center">
          <div className="flex flex-col">
            <span className="font-bold text-xl ">이여름</span>
            <span className="text-gray-600">yl9517@naver.com</span>
          </div>
          <Button type="link" className="text-blue-500">
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
    </div>
  );
};

export default UserPage;
