import { Avatar, Button, Divider, Flex, Image, List, Popover, Row, Skeleton, Tooltip, Typography } from "antd";
import { getBuddyList, updateBuddyUser } from "api/buddy";
import { InvitationModal } from "components/modals/InvitationModal";
import { SearchComponent } from "components/Search";
import { useModal } from "hooks/useModal";
import { useEffect, useState } from "react";

import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { BsBellFill } from "react-icons/bs";
import { BsBellSlash } from "react-icons/bs";

import { Navigate, useNavigate } from "react-router-dom";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const BuddyListPage = () => {
  const navigate = useNavigate();
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState<any[]>([]);
    // modal
    const { isOpen, openModal, closeModal } = useModal();

    // 버디 리스트 조회
    const getBuddyListData = async () => {
      const userId = 29;
      const result = await getBuddyList(userId);
      console.log('get result ??', result);

      setInitLoading(false);
      setList(result);
    }

    // 회원 버디 수정
    const updateBuddyUserData = async (type: string, data: any) => {
      const body = {
        ...data
      };
      body[type] = !body[type];
      const result = await updateBuddyUser(data.id, body)
      console.log('update result ??', result);
      getBuddyListData()
    }

    // useEffect(() => {
    // }, [list])
    
    useEffect(() => {
      getBuddyListData()
    }, []);

    return (
      <>
        <div style={{ height: '100%', padding: '0px 25px 50px 25px '}}>
            <Flex justify="flex-start">
                <Typography.Title level={3}>버디</Typography.Title>
            </Flex>
            <div style={{ padding: '10px 0px 30px 0px'}}>
                <SearchComponent />
            </div>
            {/* <Tooltip title="친구를 초대해보세요!" color={'gold'} trigger={"hover"}> */}
                <Image
                  style={{width: 200, borderRadius: 10, paddingBottom: 20, cursor: 'pointer'}} 
                  src={'/images/invitation.png'} 
                  alt="invitation" 
                  preview={false}
                  onClick={() => openModal('invitation')}
                />
            {/* </Tooltip> */}
            <Divider />
            <div>
                <List 
                    loading={initLoading}
                    itemLayout="horizontal"
                    // loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item : any) => (
                      <List.Item
                      style={{
                        justifyContent: 'space-between'
                      }}
                      
                      // actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                      >
                        <div>
                          <a onClick={() => navigate(`/buddy/${item.buddyId}`)}>
                            <Typography.Text strong>{item.name}</Typography.Text>
                          </a>
                        </div>
                        <Row>
                          <a onClick={() => updateBuddyUserData('pinTf', item)}>
                            {item.pinTf ? (
                              <IoHeart style={{ fontSize: 22, color: '#ff4d4d' }} />
                            ) : (
                              <IoMdHeartEmpty style={{ fontSize: 22, color: '#bfbfbf' }}/>
                            )}
                          </a>
                          <Divider type="vertical" style={{ borderLeft: '1px solid #666666' }} />
                          <a onClick={() => updateBuddyUserData('alertTf', item)}>
                            {item.alertTf ? (
                              <BsBellFill style={{ fontSize: 18, color: '#bfbfbf' }} />
                            ) : (
                              <BsBellSlash style={{ fontSize: 18, color: '#bfbfbf' }} />
                            )}
                          </a>
                        </Row>
                        <Skeleton avatar title={false} loading={item.loading} active>
                        {/* <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name?.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div> */}
                        </Skeleton>
                    </List.Item>
                    )}
                />
            </div>
        </div>
        {/* 초대장 모달 */}
        {isOpen('invitation') && (
          <InvitationModal closeModal={closeModal} isOpen={isOpen('invitation')}/>
        )}
      </>
    )
}
export default BuddyListPage;