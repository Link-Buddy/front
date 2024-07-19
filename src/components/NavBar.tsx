import React from 'react';
import NavLinkComponent from './NavLink';
import { FaHome, FaUser, FaUsers } from 'react-icons/fa'; // react-icons에서 아이콘 임포트

const NavBar = () => {
  return (
    <div className="fixed bottom-0 w-full flex justify-center p-3 bg-white border-t rounded-tl-2xl rounded-tr-2xl">
      <div className="max-w-screen-md w-full flex justify-around">
        <NavLinkComponent to="/mypage" name="내 링크" icon={FaUser} />
        <NavLinkComponent to="/home" name="홈" icon={FaHome} />
        <NavLinkComponent to="/group" name="버디 링크" icon={FaUsers} />
      </div>
    </div>
  );
};

export default NavBar;
