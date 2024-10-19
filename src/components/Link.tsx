/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable array-callback-return */
import {
  CloseOutlined,
  CopyOutlined,
  EllipsisOutlined,
  HeartFilled,
  HeartOutlined,
  ToolOutlined,
} from '@ant-design/icons';
import {
  Card,
  Checkbox,
  Col,
  Divider,
  Flex,
  Popover,
  Row,
  Typography,
  message,
} from 'antd';
import { useModal } from 'hooks/useModal';
import { useEffect, useState } from 'react';
import { AlertModal } from './modals/AlertModal';
import { deleteLink } from 'api/link';
import UpdateLinkModal from './modals/UpdateLinkModal';
import { UpdateLink } from 'types/Link';
import { onOffFavoriteLink } from 'api/favorite';

interface LinkProps {
  linkList: {
    id: number;
    linkUrl: string;
    name: string;
    description: string;
    categoryId: number | null;
    isFavorite: boolean;
  }[];
  showEdit: boolean;
  selectedLink: number[];
  setSelectedLink: (e: number[]) => void;
  setSelectLinkCount: (e: number) => void;
  refresh: number;
  setRefresh: (e: number) => void;
}

export const LinkComponent: React.FC<LinkProps> = ({
  linkList,
  showEdit,
  selectedLink,
  setSelectedLink,
  setSelectLinkCount,
  refresh,
  setRefresh,
}) => {
  const { isOpen, openModal, closeModal } = useModal();
  /** alert message */
  const [messageApi, contextHolder] = message.useMessage();
  /** alert 모달 타입 */
  const [alertType, setAlertType] = useState<string>('');
  /** 링크 옵션 노출 여부 (즐겨찾기, 수정, 삭제) */
  const [isEditPopoverVisible, setIsEditPopoverVisible] =
    useState<boolean>(false);

  const [linkData, setLinkData] = useState<UpdateLink>({
    id: 0,
    linkUrl: '',
    name: '',
    description: '',
    categoryId: null,
    isFavorite: false,
  });

  /** link option */
  const Content = ({
    linkId,
    isFavorite,
  }: {
    linkId: number;
    isFavorite: boolean;
  }) => {
    const [currentFavorite, setCurrentFavorite] = useState(isFavorite); // 현재 즐겨찾기 상태
    return (
      <Flex vertical style={{ padding: '2px 10px' }}>
        <a
          onClick={async () => {
            setCurrentFavorite(!currentFavorite); // 클릭할 때마다 상태 반전
            await onOffFavoriteLink(linkId);
          }}
        >
          {currentFavorite ? (
            <HeartFilled style={{ paddingRight: 5, color: 'red' }} />
          ) : (
            <HeartOutlined style={{ paddingRight: 5 }} />
          )}
          즐겨찾기
        </a>
        <Divider style={{ margin: '10px 0px' }} />
        <a
          onClick={() => {
            // setIsEditPopoverVisible(false);
            openModal('editLink');
          }}
        >
          <ToolOutlined style={{ paddingRight: 5 }} />
          수정
        </a>
        <Divider style={{ margin: '10px 0px' }} />
        <a
          onClick={() => {
            // setIsEditPopoverVisible(false);
            setAlertType('delete');
            openModal('alert');
          }}
        >
          <CloseOutlined style={{ paddingRight: 5 }} />
          삭제
        </a>
      </Flex>
    );
  };
  /** 링크 복사 option */
  const onClickCopyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      messageApi.open({
        type: 'success',
        content: '링크가 복사되었습니다.',
      });
    });
  };

  /** link list 다중 선택시 */
  const onChangeCheckbox = (key: number) => {
    console.log('key ??', key);
    console.log('selectedLink ??', selectedLink);
    const isExistKey = selectedLink.includes(key);
    if (isExistKey) {
      const excludeKey = selectedLink.filter((link) => link !== key);
      setSelectedLink(excludeKey);
    } else {
      setSelectedLink([...selectedLink, key]);
    }
  };
  /** 링크 삭제 확인 */
  const handleOk = async () => {
    const result = await deleteLink(selectedLink[0]);
    if (result) {
      closeModal('alert');
      messageApi.open({
        type: 'success',
        content: '삭제되었습니다.',
      });
    } else {
      closeModal('alert');
      messageApi.open({
        type: 'error',
        content: '오류가 발생하였습니다.',
      });
    }
    setRefresh(refresh + 1);
  };

  const onOpenPopover = (key: number) => {
    // setIsEditPopoverVisible(!isEditPopoverVisible);
    setSelectedLink([key]);
    setLinkData(linkList.filter((link) => link.id === key)[0]);
  };
  /** 링크 옵션 클릭시 */
  const handleEditPopoverVisible = () => {};

  useEffect(() => {
    setSelectLinkCount(selectedLink.length);
  }, [selectedLink]);

  return (
    <>
      {contextHolder}
      <div style={{ paddingBottom: 20, paddingTop: 30 }}>
        <Row justify={'space-around'}>
          {Array.isArray(linkList)
            ? linkList.map((link, index) => {
                return (
                  <Col offset={1} key={index} style={{ paddingBottom: 20 }}>
                    <Card
                      key={index}
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
                        <>
                          <img
                            alt={link.name}
                            src={link.linkUrl}
                            style={{
                              height: 120,
                            }}
                          />
                        </>
                      }
                      actions={[
                        <CopyOutlined
                          key="edit"
                          onClick={() => onClickCopyLink(link.linkUrl)}
                        />,
                        <Popover
                          content={() =>
                            Content({
                              linkId: link.id,
                              isFavorite: link.isFavorite,
                            })
                          }
                          trigger={'click'}
                        >
                          <EllipsisOutlined
                            key="ellipsis"
                            onClick={() => onOpenPopover(link.id)}
                          />
                        </Popover>,
                      ]}
                    >
                      {showEdit && (
                        <Checkbox
                          style={{
                            position: 'absolute',
                            top: 5,
                            left: 10,
                          }}
                          onChange={() => onChangeCheckbox(link.id)}
                        />
                      )}
                      <Row>
                        <Typography.Text strong>{link.name}</Typography.Text>
                      </Row>
                      <Row>
                        <Typography.Text style={{ color: 'gray' }}>
                          - {link.description}
                        </Typography.Text>
                      </Row>
                    </Card>
                  </Col>
                );
              })
            : null}
        </Row>
      </div>
      {/* 링크 수정 모달 */}
      {isOpen('editLink') && (
        <UpdateLinkModal
          closeModal={closeModal}
          isOpen={isOpen('editLink')}
          linkData={linkData}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
      {/* 삭제 알림 모달 */}
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
