import React, { useEffect, useRef, useState } from 'react';
import FolderComponent from '../../../components/Folder';
import FloatAddLinkBtn from '../../../components/FloatAddLinkBtn';
import UserProfile from 'components/UserProfile';
import '../../../style/css/buddy.css';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SearchComponent } from 'components/Search';
import { useParams } from 'react-router-dom';
import { getBuddyUserList } from 'api/buddy';

const BuddyPage: React.FC = () => {
  const { buddyId } = useParams();
  // 버디 회원 리스트
  const [buddyUserList, setBuddyUserList] = useState<BuddyUser[]>([]);

  // 스크롤
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -150,
        behavior: 'smooth',
      });
    }
  };
  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 150, behavior: 'smooth' });
    }
  };

  /** 버디 회원 조회 */
  const getBuddyUserListData = async () => {
    console.log('buddyId', buddyId);
    const result = await getBuddyUserList(Number(buddyId));
    console.log('get buddyUser list result ??', result);
    setBuddyUserList(result);
  }

  useEffect(() => {
    getBuddyUserListData()
  }, []);

  return (
    <div className="p-4 relative">
      <div className="relative flex items-center p-4 mb-6">
        <button
          onClick={scrollLeft}
          className="absolute left-0 h-full z-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md"
        >
          <ArrowLeftOutlined className="text-2xl" />
        </button>
        <div
          ref={scrollContainerRef}
          className="flex space-x-8 mr-10 ml-10 overflow-x-auto no-scrollbar"
        >
          {buddyUserList.map((buddyUser, index) => (
            <UserProfile
              userId={buddyUser.id}
              username={buddyUser.name}
              imgSrc="https://via.placeholder.com/64"
            />
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 h-full z-10 bg-white bg-opacity-75 hover:bg-opacity-100 rounded-full p-2 shadow-md"
        >
          <ArrowRightOutlined className="text-2xl" />
        </button>
      </div>
      <div>
        <SearchComponent />
      </div>
      <div className="flex flex-wrap justify-between ">
        <FolderComponent id={1} title="여행" count={5} />
        <FolderComponent id={2} title="폴더 2" count={3} />
        <FolderComponent id={3} title="폴더 3" count={8} />
        <FolderComponent id={4} title="폴더 4" count={2} />
      </div>
      <div
        className=" "
        style={{
          zIndex: 10, // 네비바보다 뒤에 위치하도록 설정
        }}
      >
        <FloatAddLinkBtn />
      </div>
    </div>
  );
};

export default BuddyPage;
