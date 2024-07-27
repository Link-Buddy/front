/* eslint-disable array-callback-return */
import { CloseOutlined, CopyOutlined, EditOutlined, EllipsisOutlined, HeartOutlined, SettingOutlined, ToolOutlined } from "@ant-design/icons"
import { Button, Card, Col, Divider, Flex, Input, Modal, Popover, Row, Typography, message } from "antd"
import { IoHeart } from "react-icons/io5";

interface LinkProps {
    linkList: {
        key: number;
        url: string;
        name: string;
        description: string;
        favo: boolean;
    }[];
}

const Content = () => {
    return (
        <Flex vertical style={{ padding: '2px 10px'}}>
            <a >
                <HeartOutlined style={{ paddingRight: 5}}/>
                즐겨찾기
            </a>
            <Divider style={{ margin: '10px 0px'}}/>
            <a >
                <ToolOutlined style={{ paddingRight: 5}}/>
                수정
            </a>
            <Divider style={{ margin: '10px 0px'}}/>
            <a >
                <CloseOutlined style={{ paddingRight: 5}}/>
                삭제
            </a>
        </Flex>
    )
}

export const LinkComponent: React.FC<LinkProps> = ({ linkList }) => {
    const [messageApi, contextHolder] = message.useMessage();

    const onClickLinkCard = (value: string) => {
        console.log(value)
    }

    const onClickCopyLink = (url: string) => {
        navigator.clipboard.writeText(url).then(() => {
            messageApi.open({
                type: 'success',
                content: '링크가 복사되었습니다.'
            })
        });
    }

    return (
        <>
        {contextHolder}
        <div style={{ paddingBottom: 20, paddingTop: 30 }}>
            <Row 
                // justify={'center'}
                >
            {linkList.map((link, index) => {
                return (
                    <Col offset={1} key={index} style={{ paddingBottom: 20}}>
                        <Card
                            key={index}
                            hoverable
                            size="small"
                            style={{
                                width: 160,
                                // height: 100
                            }}
                            styles={{ body: {
                                margin: 0,
                                padding: 10
                            }}}
                            
                            cover={
                                <>
                                    <img alt={link.name} src={link.url} style={{ height: 120 }}/>
                                </>
                                
                            }
                            actions={[
                                <CopyOutlined key="edit" onClick={() => onClickCopyLink(link.url)}/>,
                                <Popover content={<Content />} trigger={'click'}>
                                    <EllipsisOutlined key="ellipsis" />
                                </Popover>
                              ]}
                            onClick={() => {onClickLinkCard(link.name)}}
                        >
                            {link.favo && (
                                <IoHeart style={{ fontSize: 20, color: '#ff4d4d', position: 'absolute', right: 6, top: 95 }}/>
                            )}
                            <Row>
                                <Typography.Text strong>
                                {link.name}
                                </Typography.Text>
                            </Row>
                            <Row>
                                <Typography.Text style={{ color: 'gray'}}>
                                - {link.description}
                                </Typography.Text>
                            </Row>
                        </Card>
                    </Col>
                )

            })}
            </Row>
        </div>
        </>
    )
}