/* eslint-disable array-callback-return */
import { CopyOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card, Checkbox, Col, Popover, Row, Typography, message } from 'antd';
import { useEffect } from 'react';
import { IoHeart } from 'react-icons/io5';

interface LinkProps {
  content: any;
  linkList: {
    id: number;
    linkUrl: string;
    name: string;
    description: string;
    favo: boolean;
  }[];
  showEdit: boolean;
  selectedLink: number[];
  setSelectedLink: (e: number[]) => void;
  setSelectLinkCount: (e: number) => void;
}

export const LinkComponent: React.FC<LinkProps> = ({
  content,
  linkList,
  showEdit,
  selectedLink,
  setSelectedLink,
  setSelectLinkCount,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const onClickLinkCard = (value: string) => {
    console.log(value);
  };

  const onClickCopyLink = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      messageApi.open({
        type: 'success',
        content: '링크가 복사되었습니다.',
      });
    });
  };

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

  useEffect(() => {
    setSelectLinkCount(selectedLink.length);
  }, [selectedLink]);

  return (
    <>
      {contextHolder}
      <div style={{ paddingBottom: 20, paddingTop: 30 }}>
        <Row justify={'center'}>
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
                            style={{ height: 120 }}
                          />
                        </>
                      }
                      actions={[
                        <CopyOutlined
                          key="edit"
                          onClick={() => onClickCopyLink(link.linkUrl)}
                        />,
                        <Popover content={content} trigger={'click'}>
                          <EllipsisOutlined key="ellipsis" />
                        </Popover>,
                      ]}
                      onClick={() => {
                        onClickLinkCard(link.name);
                      }}
                    >
                      {showEdit && (
                        <Checkbox
                          style={{ position: 'absolute', top: 5, left: 10 }}
                          onChange={() => onChangeCheckbox(link.id)}
                        />
                      )}
                      {/* {link.favo && (
                    <IoHeart
                      style={{
                        fontSize: 20,
                        color: '#ff4d4d',
                        position: 'absolute',
                        right: 6,
                        top: 95,
                      }}
                    />
                  )} */}
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
    </>
  );
};
