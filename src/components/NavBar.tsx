import React from 'react';
import NavLinkComponent from './NavLink';
import { FaHome, FaUser, FaUsers } from 'react-icons/fa'; // react-icons에서 아이콘 임포트

const NavBar = () => {
  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-md flex justify-around p-3 bg-white border-t rounded-tl-2xl rounded-tr-2xl z-[999]">
      <NavLinkComponent to="/my" name="내 링크" icon={FaUser} />
      <NavLinkComponent to="/home" name="홈" icon={FaHome} />
      <NavLinkComponent to="/buddy/list" name="버디 링크" icon={FaUsers} />
    </div>
  );
};

export default NavBar;
