import React, { useEffect, useState } from 'react';
import { Divider, List, Row, Typography, Skeleton, Image } from 'antd';
import { IoHeart } from 'react-icons/io5';
import { IoMdHeartEmpty } from 'react-icons/io';
import { BsBellFill, BsBellSlash } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { getBuddyList, updateBuddyUser } from 'api/buddy';
import { useModal } from 'hooks/useModal';
import { InvitationModal } from 'components/modals/InvitationModal';
import { SearchComponent } from 'components/Search';
import FloatAddBuddyBtn from 'components/FloatAddBuddyBtn';

const BuddyListPage = () => {
  const navigate = useNavigate();
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<any[]>([]);

  const { isOpen, openModal, closeModal } = useModal();

  // 버디 리스트 조회
  const getBuddyListData = async () => {
    const result = await getBuddyList();
    console.log('get result ??', result);

    setInitLoading(false);
    setList(result);
  };

  const handleNavigate = () => {
    navigate('/add-buddy'); // 클릭 시 이동할 페이지 경로
  };

  const updateBuddyUserData = async (type: string, data: any) => {
    const body = {
      ...data,
    };
    body[type] = !body[type];
    const result = await updateBuddyUser(data.id, body);
    console.log('update result ??', result);
    getBuddyListData();
  };

  useEffect(() => {
    getBuddyListData();
  }, []);

  return (
    <>
      <div style={{ padding: '0px 25px 50px 25px' }}>
        <Typography.Title level={3}>버디</Typography.Title>
        <div style={{ padding: '10px 0px 30px 0px' }}>
          <SearchComponent />
        </div>
        <Image
          style={{
            width: 200,
            cursor: 'pointer',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
          }}
          src={'/images/invite.jpg'}
          alt="invitation"
          preview={false}
          onClick={() => openModal('invitation')}
        />
        <Divider />
        <div>
          <List
            loading={initLoading}
            itemLayout="horizontal"
            dataSource={[{ special: true }, ...list]} // "버디 추가" Row 추가
            renderItem={(item: any) =>
              item.special ? (
                <List.Item>
                  <Row
                    style={{
                      width: '100%',
                      padding: '12px',
                      backgroundColor: '#f1fbee',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                    onClick={handleNavigate}
                  >
                    <Typography.Text
                      style={{
                        color: '#1d3557',
                        fontWeight: 'bold',
                      }}
                    >
                      + 버디 추가
                    </Typography.Text>
                  </Row>
                </List.Item>
              ) : (
                <List.Item
                  style={{
                    justifyContent: 'space-between',
                  }}
                >
                  <div>
                    <a onClick={() => navigate(`/buddy/${item.buddyId}`)}>
                      <Typography.Text strong>{item.name}</Typography.Text>
                    </a>
                  </div>
                  <Row>
                    <a onClick={() => updateBuddyUserData('pinTf', item)}>
                      {item.pinTf ? (
                        <IoHeart
                          style={{
                            fontSize: 22,
                            color: '#ff4d4d',
                          }}
                        />
                      ) : (
                        <IoMdHeartEmpty
                          style={{
                            fontSize: 22,
                            color: '#bfbfbf',
                          }}
                        />
                      )}
                    </a>
                    <Divider
                      type="vertical"
                      style={{
                        borderLeft: '1px solid #666666',
                      }}
                    />
                    <a onClick={() => updateBuddyUserData('alertTf', item)}>
                      {item.alertTf ? (
                        <BsBellFill
                          style={{
                            fontSize: 18,
                            color: '#bfbfbf',
                          }}
                        />
                      ) : (
                        <BsBellSlash
                          style={{
                            fontSize: 18,
                            color: '#bfbfbf',
                          }}
                        />
                      )}
                    </a>
                  </Row>
                  <Skeleton
                    avatar
                    title={false}
                    loading={item.loading}
                    active
                  />
                </List.Item>
              )
            }
          />
        </div>
      </div>
      {isOpen('invitation') && (
        <InvitationModal
          closeModal={closeModal}
          isOpen={isOpen('invitation')}
        />
      )}
    </>
  );
};

export default BuddyListPage;
