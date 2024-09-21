import {
    Button,
    Card,
    Col,
    Empty,
    Flex,
    List,
    Row,
    Skeleton,
    Typography,
} from 'antd';
import { getBuddyInvitation, updateBuddyUser } from 'api/buddy';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const BuddyInvitationPage = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState<any[]>([]);

    /** 회원 초대 리스트 조회 */
    const getBuddyInvitationListData = async () => {
        const result = await getBuddyInvitation();
        console.log('result ????', result);

        setInitLoading(false);
        setList(result);
    };

    /** 초대 수락 */
    const onClickAccept = async (data: any) => {
        const body = {
            buddyId: data.buddyId,
            acceptTf: true,
        };
        const result = await updateBuddyUser(data.id, body);
        console.log('update result ??', result);
        getBuddyInvitationListData();
    };

    useEffect(() => {
        getBuddyInvitationListData();
    }, []);

    return (
        <>
            <div
                style={{ height: '100%', padding: '0px 25px 50px 25px ' }}
                className="flex flex-col gap-8"
            >
                <h2 className="font-semibold text-xl">초대 목록</h2>
                <div>
                    {list.length > 0 ? (
                        <List
                            loading={initLoading}
                            itemLayout="horizontal"
                            // loadMore={loadMore}
                            dataSource={list}
                            renderItem={(item: any) => (
                                <List.Item>
                                    <Card
                                        style={{
                                            width: '100%',
                                        }}
                                    >
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-col gap-1">
                                                <Typography.Text className="flex justify-start text-lg font-semibold text-blue-700 pr-2">
                                                    {item.name}
                                                </Typography.Text>
                                                <Typography.Text className="flex justify-start">
                                                    참여 초대장이 도착했습니다!
                                                </Typography.Text>
                                                <Typography.Text className="flex justify-start font-semibold">
                                                    From:{' '}
                                                    {`${item.senderName}(${item.senderEmail}) 님`}
                                                </Typography.Text>
                                                <Typography.Text className="flex justify-start pt-3 text-slate-400">
                                                    초대일 :{' '}
                                                    {dayjs(
                                                        item.createdAt
                                                    ).format('YYYY-MM-DD')}
                                                </Typography.Text>
                                                {item.acceptTf && (
                                                    <Typography.Text className="flex justify-start text-slate-400">
                                                        초대 수락일 :{' '}
                                                        {dayjs(
                                                            item.acceptDt
                                                        ).format('YYYY-MM-DD')}
                                                    </Typography.Text>
                                                )}
                                            </div>
                                            <div>
                                                <Button
                                                    disabled={item.acceptTf}
                                                    onClick={() =>
                                                        onClickAccept(item)
                                                    }
                                                >
                                                    {item.acceptTf
                                                        ? '완료'
                                                        : '수락'}
                                                </Button>
                                            </div>
                                        </div>
                                    </Card>
                                </List.Item>
                            )}
                        />
                    ) : (
                        <Empty />
                    )}
                </div>
            </div>
        </>
    );
};
export default BuddyInvitationPage;
