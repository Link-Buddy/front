import { Avatar, Button, Divider, Flex, Image, List, Popover, Skeleton, Tooltip, Typography } from "antd";
import { InvitationModal } from "components/modals/InvitationModal";
import { SearchComponent } from "components/Search";
import { useModal } from "hooks/useModal";
import { useEffect, useState } from "react";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const BuddyListPage = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState<any[]>([]);

    const { isOpen, openModal, closeModal } = useModal();

    useEffect(() => {
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
          setInitLoading(false);
          setData(res.results);
          setList(res.results);
        });
    }, []);
    
    const onLoadMore = () => {
      setLoading(true);
    //   setList(
    //     data.concat(
    //       [...new Array(count)].map(() => ({
    //         loading: true,
    //         name: {},
    //         picture: {},
    //       })),
    //     ),
    //   );
      fetch(fakeDataUrl)
        .then((res) => res.json())
        .then((res) => {
          const newData = data.concat(res.results);
          setData(newData);
          setList(newData);
          setLoading(false);
          // Resetting window's offsetTop so:to display react-virtualized demo underfloor.
          // In real scene, you can using public method of react-virtualized:
          // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
          window.dispatchEvent(new Event('resize'));
        });
    };

    const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button onClick={onLoadMore}>loading more</Button>
      </div>
    ) : null;

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
                  style={{width: 200, borderRadius: 10, paddingBottom: 20}} 
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
                    loadMore={loadMore}
                    dataSource={list}
                    renderItem={(item : any) => (
                    <List.Item
                        actions={[<a key="list-loadmore-edit">edit</a>, <a key="list-loadmore-more">more</a>]}
                    >
                        <Skeleton avatar title={false} loading={item.loading} active>
                        <List.Item.Meta
                            avatar={<Avatar src={item.picture.large} />}
                            title={<a href="https://ant.design">{item.name?.last}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                        <div>content</div>
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