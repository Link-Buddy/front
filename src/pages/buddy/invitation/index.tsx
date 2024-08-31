import { Button, Col, Empty, Flex, List, Row, Skeleton, Typography } from "antd";
import { getBuddyInvitation, updateBuddyUser } from "api/buddy";
import dayjs from "dayjs";
import { useEffect, useState } from "react";

const BuddyInvitationPage = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState<any[]>([]);

    /** 회원 초대 리스트 조회 */
    const getBuddyInvitationListData = async () => {
        const result = await getBuddyInvitation();
        console.log('result ????', result);

        setInitLoading(false);
        setList(result);
    }

    /** 초대 수락 */
    const onClickAccept = async (data: any) => {
        const body = {
            buddyId: data.buddyId,
            acceptTf: true
        }
        const result = await updateBuddyUser(data.id, body);
        console.log('update result ??', result);
        getBuddyInvitationListData();
    }

    useEffect(() => {
        getBuddyInvitationListData();
    }, [])

    return (
        <>
            <div style={{ height: '100%', padding: '0px 25px 50px 25px '}}>
            <div>
                {list.length > 0 ? (
                    <List
                        loading={initLoading}
                        itemLayout="horizontal"
                        // loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item: any) => (
                        <List.Item>
                            <Row style={{ width: '100%'}}>
                                <Col span={20}>
                                    <Typography.Text className="flex justify-start">{item.name}</Typography.Text>
                                    <Typography.Text className="flex justify-start">초대일 : {dayjs(item.createdAt).format('YYYY-MM-DD')}</Typography.Text>
                                </Col>
                                <Col span={4}>
                                    <Button disabled={item.acceptTf} onClick={() => onClickAccept(item)}>{item.acceptTf ? '완료' : '수락'}</Button>
                                </Col>
                            </Row>
                        </List.Item>
                        )}
                    />
                    ) : (
                    <Empty />
                )}
            </div>
            </div>
        </>
    )
}
export default BuddyInvitationPage;