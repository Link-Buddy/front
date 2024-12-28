import React, { useEffect, useRef, useState } from 'react';
import FolderComponent from '../../../components/Folder';
import FloatAddLinkBtn from '../../../components/FloatAddLinkBtn';
import UserProfile from 'components/UserProfile';
import '../../../styles/css/buddy.css';

import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';
import { SearchComponent } from 'components/Search';
import { useParams } from 'react-router-dom';
import { getBuddyUserList } from 'api/buddy';
import { Divider, Row, Typography } from 'antd';
import { createBuddyCategory, getBuddyCategoryList } from 'api/category';
import { Category } from 'types/Category';
import AddCategoryModal from 'components/modals/AddCategoryModal';

const BuddyPage: React.FC = () => {
  const { buddyId } = useParams();
  // 버디 회원 리스트
  const [buddyUserList, setBuddyUserList] = useState<BuddyUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const handleNavigate = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddFolder = (categoryName: string) => {
    console.log('New folder added:', categoryName);
    setIsModalOpen(false);
    // TODO: Implement API call to add the folder
  };

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
  };

  useEffect(() => {
    getBuddyUserListData();
  }, []);

  /** 버디 카테고리 조회 */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getBuddyCategoryList(String(buddyId));
        setCategories(categoryList);
      } catch (err) {
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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
            <div key={buddyUser.id}>
              <UserProfile
                userId={buddyUser.id}
                username={buddyUser.name}
                imageUrl={buddyUser.imageUrl || '/images/basicProfile.png'}
              />
            </div>
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
      <Row justify={'end'}>
        <Typography.Text>
          <a onClick={handleNavigate}>+ 새 폴더</a>
        </Typography.Text>
      </Row>
      <Divider style={{ margin: '10px 0px' }} />
      <div
        className="flex flex-wrap justify-start p-4 relative"
        style={{
          gap: '20px', // 아이템 간 간격 설정
        }}
      >
        {categories.map((category) => (
          <FolderComponent
            key={category.id}
            id={category.id}
            title={category.categoryName}
            count={category.linkCount}
            buddyId={Number(category.buddyId)}
          />
        ))}
      </div>
      <div
        className=" "
        style={{
          zIndex: 10, // 네비바보다 뒤에 위치하도록 설정
        }}
      >
        <FloatAddLinkBtn />
      </div>
      {isModalOpen && (
        <AddCategoryModal
          onClose={closeModal}
          onAdd={async (categoryName) => {
            handleAddFolder(categoryName);
            try {
              const newCategory = await createBuddyCategory(
                categoryName,
                String(buddyId)
              );

              setCategories((prevCategories) => [
                ...prevCategories,
                {
                  id: newCategory.id,
                  categoryName,
                  linkCount: 0,
                  buddyId: Number(buddyId),
                },
              ]); // 새 카테고리 추가
            } catch (error) {
              console.error('카테고리 추가 실패:', error); // 에러 처리
            }
          }}
        />
      )}
    </div>
  );
};

export default BuddyPage;
