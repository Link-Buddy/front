import { CloseOutlined, FolderOpenOutlined, HeartOutlined, ToolOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Image, Input, message, Modal, Row, Select, Space, Tooltip, Typography } from "antd";
import { LinkComponent } from "components/Link";
import { SearchComponent } from "components/Search";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useModal } from "hooks/useModal";
import { MoveLinkModal } from "components/modals/MoveLinkModal";
import { AlertModal } from "components/modals/AlertModal";


const LinkDetailPage = () => {
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
                <a onClick={() => {
                    setAlertType('delete');
                    openModal('alert');
                }} >
                    <CloseOutlined style={{ paddingRight: 5}}/>
                    삭제
                </a>
            </Flex>
        )
    }
    const { id } = useParams();
    /** 편집 링크 */
    const [showEdit, setShowEdit] = useState<boolean>(false);
    /** 선택 링크 */
    const [selectedLink, setSelectedLink] = useState<number[]>([]);
    const [selectLinkCount, setSelectLinkCount] = useState<number>(0);

    const { isOpen, openModal, closeModal } = useModal();
    /** alert 모달 타입 */
    const [alertType, setAlertType] = useState<string>('');

    const [messageApi, contextHolder] = message.useMessage();

    const selectSearchOptions = [
        {
            value: '1',
            label: "DEV"
        },
        {
            value: '2',
            label: "REACT"
        },
        {
            value: '3',
            label: "SPRING"
        },
        {
            value: '4',
            label: "JOB"
        },
    ]

    const linkList = [
        {
            key: 1,
            url: 'https://www.naver.com/',
            name: '김보풀',
            description: '김보풀씨 링크',
            favo: false
        },
        {
            key: 2,
            url: '/images/bopul_2.jpg',
            name: "보풀",
            description: '보풀씨 링크',
            favo: true
        },
        {
            key: 3,
            url: '/images/bopul_3.jpg',
            name: "BOPUL",
            description: 'BOPUL 링크',
            favo: false
        },
    ];

    const onClickEdit = () => {
        setShowEdit(!showEdit);
        setSelectedLink([]);
        setSelectLinkCount(0);
    }
    
    const handleOk = () => {
        closeModal('alert')
        messageApi.open({
            type: 'success',
            content: '삭제되었습니다.'
        })
    };

    return (
        <>
            {contextHolder}
            <div style={{ height: '100%', padding: '0px 25px 50px 25px ' }}>
                <Flex justify="flex-start">
                    <Typography.Title level={3}>링크</Typography.Title>
                </Flex>
                <div style={{ padding: '10px 0px 0px 0px' }}>
                    <SearchComponent />
                </div>
                <Row justify={'end'}>
                    <Typography.Text><a onClick={onClickEdit}>편집</a></Typography.Text>
                </Row>
                <Divider style={{ margin: '10px 0px' }} />
                {/* 링크 */}
                <LinkComponent content={<Content />} linkList={linkList} showEdit={showEdit} selectedLink={selectedLink} setSelectedLink={setSelectedLink} setSelectLinkCount={setSelectLinkCount}/>
            </div>
            {showEdit && (
                <Row style={{
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,
                    backgroundColor: '#cccccc',
                    borderTop: '1px solid #d9d9d9',
                    padding: '12px 20px',
                    zIndex: 999,
                    position: 'fixed',
                    top: "calc(100vh - 115px)",
                    width: '100%',
                    maxWidth: '769px',
                    height: '45px'
                }}>
                    <Col span={14}>
                        <Row justify={'start'} style={{ paddingLeft: 20 }}>
                            <Typography.Text style={{ color: '#132639' }} strong>
                                {selectLinkCount} 개 선택
                            </Typography.Text>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Space size={'small'}>
                            <a onClick={() => {
                                if (selectLinkCount === 0) {
                                    return false
                                } else {
                                    openModal('moveLink');
                                }
                            }} >
                                <FolderOpenOutlined style={{ paddingRight: 5 }} />
                                링크 이동
                            </a>
                            <Divider type="vertical" style={{ borderLeft: '1px solid #666666' }} />
                            <a onClick={() => {
                                if (selectLinkCount === 0) {
                                    return false
                                } else {
                                    setAlertType('delete');
                                    openModal('alert');
                                }
                            }} >
                                <CloseOutlined style={{ paddingRight: 5 }} />
                                삭제
                            </a>
                        </Space>
                    </Col>
                </Row>
            )}
            {/* 링크 이동 모달 */}
            {isOpen('moveLink') && (
                <MoveLinkModal 
                    closeModal={closeModal} 
                    isOpen={isOpen('moveLink')}
                    options={selectSearchOptions} 
                    selectedLink={selectedLink} 
                />
            )}
            {/* 알림 모달 */}
            {isOpen('alert') && (
                <AlertModal 
                    closeModal={closeModal}
                    isOpen={isOpen('alert')}    
                    type={alertType} 
                    selectedLink={selectedLink}
                    handleOk={handleOk} 
                />
            )}
        </>
    )
}
export default LinkDetailPage;
