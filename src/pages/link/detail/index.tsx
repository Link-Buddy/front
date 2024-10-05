import { CloseOutlined, FolderOpenOutlined } from '@ant-design/icons';
import { Col, Divider, Flex, message, Row, Space, Typography } from 'antd';
import { LinkComponent } from 'components/Link';
import { SearchComponent } from 'components/Search';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import { MoveLinkModal } from 'components/modals/MoveLinkModal';
import { AlertModal } from 'components/modals/AlertModal';
import { getMyLinkByCategoryId } from 'api/link';

import { Link } from 'types/Link';
import { LinkPreview } from '@dhaiwat10/react-link-preview';

const LinkDetailPage = () => {
    const { categoryId } = useParams<{ categoryId: string }>();

    /** 편집 링크 */
    const [showEdit, setShowEdit] = useState<boolean>(false);
    /** 선택 링크 */
    const [selectedLink, setSelectedLink] = useState<number[]>([]);
    const [selectLinkCount, setSelectLinkCount] = useState<number>(0);

    const { isOpen, openModal, closeModal } = useModal();
    /** alert 모달 타입 */
    const [alertType, setAlertType] = useState<string>('');
    /** alert message */
    const [messageApi, contextHolder] = message.useMessage();
    /** mock data */
    const selectSearchOptions = [
        {
            value: '1',
            label: 'DEV',
        },
        {
            value: '2',
            label: 'REACT',
        },
        {
            value: '3',
            label: 'SPRING',
        },
        {
            value: '4',
            label: 'JOB',
        },
    ];

    const [links, setLinks] = useState<Link[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        getMyLinks();
    }, [refresh]);

    const getMyLinks = async () => {
        if (!categoryId) return;
        try {
            const linkList = await getMyLinkByCategoryId(categoryId);
            setLinks(linkList);
        } catch (err) {
            setError('Failed to fetch categories.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    /** 링크 리스트 편집 (링크이동, 삭제) */
    const onClickEdit = () => {
        setShowEdit(!showEdit);
        setSelectedLink([]);
        setSelectLinkCount(0);
    };

    /** 링크 리스트 삭제  */
    const handleOk = () => {
        closeModal('alert');
        messageApi.open({
            type: 'success',
            content: '삭제되었습니다.',
        });
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
                    <Typography.Text>
                        <a onClick={onClickEdit}>편집</a>
                    </Typography.Text>
                </Row>
                <Divider style={{ margin: '10px 0px' }} />
                {/* 링크 */}
                <LinkComponent
                    linkList={links as any}
                    showEdit={showEdit}
                    selectedLink={selectedLink}
                    setSelectedLink={setSelectedLink}
                    setSelectLinkCount={setSelectLinkCount}
                    refresh={refresh}
                    setRefresh={setRefresh}
                />
            </div>
            {showEdit && (
                <Row
                    style={{
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,
                        backgroundColor: '#cccccc',
                        borderTop: '1px solid #d9d9d9',
                        padding: '12px 20px',
                        zIndex: 999,
                        position: 'fixed',
                        top: 'calc(100vh - 115px)',
                        width: '100%',
                        maxWidth: '769px',
                        height: '45px',
                    }}
                >
                    <Col span={14}>
                        <Row justify={'start'} style={{ paddingLeft: 20 }}>
                            <Typography.Text
                                style={{ color: '#132639' }}
                                strong
                            >
                                {selectLinkCount} 개 선택
                            </Typography.Text>
                        </Row>
                    </Col>
                    <Col span={10}>
                        <Space size={'small'}>
                            <a
                                onClick={() => {
                                    if (selectLinkCount === 0) {
                                        return false;
                                    } else {
                                        openModal('moveLink');
                                    }
                                }}
                            >
                                <FolderOpenOutlined
                                    style={{ paddingRight: 5 }}
                                />
                                링크 이동
                            </a>
                            <Divider
                                type="vertical"
                                style={{ borderLeft: '1px solid #666666' }}
                            />
                            <a
                                onClick={() => {
                                    if (selectLinkCount === 0) {
                                        return false;
                                    } else {
                                        setAlertType('delete');
                                        openModal('alert');
                                    }
                                }}
                            >
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
    );
};
export default LinkDetailPage;
