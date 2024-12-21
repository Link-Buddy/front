import { CloseOutlined, FolderOpenOutlined } from '@ant-design/icons';
import {
  Card,
  Col,
  Divider,
  Empty,
  Flex,
  Row,
  Skeleton,
  Space,
  Typography,
} from 'antd';
import { LinkComponent } from 'components/Link';
import { SearchComponent } from 'components/Search';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useModal } from 'hooks/useModal';
import { MoveLinkModal } from 'components/modals/MoveLinkModal';
import { AlertModal } from 'components/modals/AlertModal';
import { getLinkByCategoryId } from 'api/link';

import { Link } from 'types/Link';
import { useMessage } from 'hooks/useMessage';

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
  const message = useMessage();

  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refresh, setRefresh] = useState(0);
  const [category, setCategory] = useState<{
    categoryId: string;
    categoryName: string;
    buddyId: number;
    shareTypeCd: number;
  }>({
    categoryId: '',
    categoryName: '',
    buddyId: 0,
    shareTypeCd: 0,
  });

  useEffect(() => {
    getMyLinks();
  }, [refresh]);

  const getMyLinks = async () => {
    if (!categoryId) return;
    setLoading(true);
    try {
      const result = await getLinkByCategoryId(categoryId);
      console.log('result : ', result);
      setLinks(result.links);
      setCategory({
        categoryId: categoryId,
        categoryName: result.category.categoryName,
        buddyId: result.category.buddyId,
        shareTypeCd: result.category.shareTypeCd,
      });
    } catch (err) {
      setError('Failed to fetch categories.');
    } finally {
      setLoading(false);
    }
  };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;

  /** 링크 리스트 편집 (링크이동, 삭제) */
  const onClickEdit = () => {
    setShowEdit(!showEdit);
    setSelectedLink([]);
    setSelectLinkCount(0);
  };

  /** 링크 리스트 삭제  */
  const handleOk = () => {
    closeModal('alert');
    message.open({
      type: 'success',
      content: '삭제되었습니다.',
    });
  };

  return (
    <>
      <div style={{ padding: '0px 25px 50px 25px ' }}>
        <Flex justify="center">
          <Typography.Title level={3}>
            {category.categoryName} 링크
          </Typography.Title>
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
        {/* 링크 목록 */}
        {loading ? (
          <div style={{ paddingBottom: 20, paddingTop: 30 }}>
            {/* 링크 목록 skeleton */}
            <Row justify={'space-around'}>
              {Array(6)
                .fill(null)
                .map((_, index) => (
                  <Col
                    offset={1}
                    style={{ paddingBottom: 20 }}
                    key={`s-${index}`}
                  >
                    <Card
                      hoverable
                      size="small"
                      style={{
                        width: 160,
                        // height: 100
                      }}
                      styles={{
                        body: {
                          margin: 0,
                          padding: 10,
                        },
                      }}
                      cover={
                        <Skeleton.Image
                          active={true}
                          style={{
                            height: 120,
                            width: 160,
                          }}
                        />
                      }
                    >
                      <Skeleton active />
                    </Card>
                  </Col>
                ))}
            </Row>
          </div>
        ) : (
          <>
            {links.length > 0 ? (
              <LinkComponent
                linkList={links as any}
                showEdit={showEdit}
                selectedLink={selectedLink}
                setSelectedLink={setSelectedLink}
                setSelectLinkCount={setSelectLinkCount}
                refresh={refresh}
                setRefresh={setRefresh}
              />
            ) : (
              <Empty description="링크 데이터를 지금 추가해보세요!" />
            )}
          </>
        )}
      </div>
      {/* 링크 이동 */}
      {showEdit && (
        <Row
          style={{
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            backgroundColor: '#457c9d',
            borderTop: '1px solid #d9d9d9',
            padding: '12px 20px',
            zIndex: 999,
            position: 'fixed',
            top: 'calc(100vh - 115px)',
            width: '100%',
            maxWidth: '769px',
            height: '45px',
            justifyContent: 'space-between',
          }}
        >
          <Col>
            <Row justify={'start'} style={{ paddingLeft: 20 }}>
              <Typography.Text style={{ color: '#ffffff' }} strong>
                {selectLinkCount} 개 선택
              </Typography.Text>
            </Row>
          </Col>
          <Col>
            <Space size={'small'}>
              <a
                style={{ color: 'white' }}
                onClick={() => {
                  if (selectLinkCount === 0) {
                    return false;
                  } else {
                    openModal('moveLink');
                  }
                }}
              >
                <FolderOpenOutlined
                  style={{ paddingRight: 5, color: '#ffffff' }}
                />
                링크 이동
              </a>
              <Divider
                type="vertical"
                style={{ borderLeft: '1px solid #ffffff' }}
              />
              <a
                style={{ color: 'white' }}
                onClick={() => {
                  if (selectLinkCount === 0) {
                    return false;
                  } else {
                    setAlertType('delete');
                    openModal('alert');
                  }
                }}
              >
                <CloseOutlined style={{ paddingRight: 5, color: '#ffffff' }} />
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
          category={category}
          refresh={refresh}
          setRefresh={setRefresh}
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
