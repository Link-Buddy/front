import React, { useEffect, useRef, useState } from 'react';
import FolderComponent from '../../../components/Folder';
import FloatAddLinkBtn from '../../../components/FloatAddLinkBtn';
import UserProfile from 'components/UserProfile';
import '../../../styles/css/buddy.css';

import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
  MenuOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { SearchComponent } from 'components/Search';
import { useParams } from 'react-router-dom';
import { Button, Divider, Drawer, Flex, List, Row, Typography } from 'antd';
import { createBuddyCategory, getBuddyCategoryList } from 'api/category';
import { Category } from 'types/Category';
import AddCategoryModal from 'components/modals/AddCategoryModal';
import { getBuddyUserInfo } from 'api/buddy';
import BuddyOutModal from 'components/modals/BuddyOutModal';
import { useModal } from 'hooks/useModal';
import dayjs from 'dayjs';
import UpdateBuddyModal from 'components/modals/UpdateBuddyModal';

const BuddyPage: React.FC = () => {
  const { buddyId } = useParams();
  const { isOpen, openModal, closeModal } = useModal();
  const [refresh, setRefresh] = useState(0);
  // 버디 회원 리스트
  const [buddyUserList, setBuddyUserList] = useState<BuddyUser[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  // 방장
  const [isCreator, setIsCreator] = useState<boolean>(false);
  // 버디정보
  const [buddyInfo, setBuddyInfo] = useState({ id: 0, name: '', createdAt: 0 });

  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const handleNavigate = () => {
    setIsModalOpen(true);
  };

  const closCategoryModal = () => {
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
  const getBuddyUserData = async () => {
    console.log('buddyId', buddyId);
    const result = await getBuddyUserInfo(Number(buddyId));
    console.log('get buddyUser list result ??', result);

    setBuddyUserList(result.list);
    setIsCreator(result.isCreator);
    setBuddyInfo(result.buddyInfo);
  };

  useEffect(() => {
    getBuddyUserData();
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
    <div>
      <Flex justify="center">
        <Typography.Title level={3}>{buddyInfo.name}</Typography.Title>
      </Flex>
      <div className="px-4 py-1 relative">
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
        <div>
          <Row justify={'space-between'}>
            <Typography.Text>
              <MenuOutlined style={{ fontSize: 20 }} onClick={showDrawer} />
            </Typography.Text>
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
        </div>
        {isModalOpen && (
          <AddCategoryModal
            onClose={closCategoryModal}
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
        {/* 버디 나가기 모달 */}
        {isOpen('buddyOut') && (
          <BuddyOutModal
            closeModal={closeModal}
            isOpen={isOpen('buddyOut')}
            buddyData={{ buddyId: buddyId, isCreator: isCreator }}
          />
        )}
        <Drawer
          title="버디 설정"
          placement="left"
          closable={true}
          onClose={onClose}
          open={open}
          getContainer={false}
          styles={{
            mask: {
              height: 'calc(100dvh - 215px)',
            },
          }}
          style={{ position: 'absolute', height: 'calc(100dvh - 215px)' }}
          // rootStyle={{ position: 'absolute' }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              padding: '0px 20px 15px 20px',
              display: 'flex',
              // alignItems: 'center',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <Divider>
                <Typography.Text
                  style={{
                    color: '#808080',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingBottom: 15,
                    fontSize: 16,
                  }}
                >
                  버디 관리
                </Typography.Text>
              </Divider>
              <div>
                <Typography.Text className="flex justify-start font-medium pb-4">
                  버디 이름
                </Typography.Text>
                <Row justify={'space-between'} style={{ paddingBottom: 30 }}>
                  <div>
                    <Typography.Text className="flex justify-start font-semibold text-lg">
                      {buddyInfo.name}
                    </Typography.Text>
                  </div>
                  <div>
                    {isCreator ? (
                      <Button
                        size="small"
                        type="default"
                        style={{ flex: 1, marginLeft: 8 }}
                        onClick={() => openModal('editBuddy')}
                      >
                        수정
                      </Button>
                    ) : null}
                  </div>
                </Row>
                <Typography.Text className="flex justify-start font-medium pb-5">
                  버디 정보
                </Typography.Text>
                <Row justify={'space-between'} style={{ paddingBottom: 20 }}>
                  <div>
                    <Typography.Text className="flex justify-start font-normal text-sm">
                      버디 생성일
                    </Typography.Text>
                  </div>
                  <div>
                    <Typography.Text className="flex justify-start font-semibold text-base">
                      {dayjs(buddyInfo.createdAt).format('YYYY.MM.DD')}
                    </Typography.Text>
                  </div>
                </Row>
              </div>
              <Divider />
            </div>
            <div>
              <Button
                block
                size="large"
                type="primary"
                htmlType="submit"
                className="mt-10"
                onClick={() => openModal('buddyOut')}
                style={{ fontWeight: 'bold', height: 40, fontSize: 16 }}
              >
                {isCreator ? '버디 삭제' : '버디 나가기'}
              </Button>
            </div>
          </div>
        </Drawer>
      </div>
      {/* 버디 이름 수정 모달 */}
      {isOpen('editBuddy') && (
        <UpdateBuddyModal
          closeModal={closeModal}
          isOpen={isOpen('editBuddy')}
          data={buddyInfo}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
    </div>
  );
};

export default BuddyPage;
