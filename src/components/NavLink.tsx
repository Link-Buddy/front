import React from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLinkProps {
  to: string;
  name: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>; // 아이콘 컴포넌트 타입
}

const NavLink: React.FC<NavLinkProps> = ({ to, name, icon: Icon }) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`flex flex-col items-center transition-colors duration-0 ${
        isActive ? 'text-black' : 'text-gray-300'
      } hover:text-black`}
    >
      {Icon && (
        <Icon
          style={{
            fontSize: '24px',
            fill: isActive ? 'black' : 'gray',
          }}
        />
      )}
      <div
        className={`mt-1 text-xs transition-colors duration-0 ${
          isActive ? 'text-black' : 'text-gray-300'
        }`}
      >
        {name}
      </div>
    </Link>
  );
};

export default NavLink;
