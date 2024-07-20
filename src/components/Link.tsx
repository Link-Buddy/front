/* eslint-disable array-callback-return */
import { CopyOutlined, EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons"
import { Button, Card, Col, Flex, Input, Modal, Popover, Row, Typography } from "antd"
import { useState } from "react";

export const LinkComponent = () => {
    const linkFolderList = [
        {
            key: 1,
            path: '/images/bopul_1.jpg',
            name: '김보풀'
        },
        {
            key: 2,
            path: '/images/bopul_2.jpg',
            name: "보풀"
        },
        {
            key: 3,
            path: '/images/bopul_3.jpg',
            name: "BOPUL"
        },
    ];
    /** 모달 노출 */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [linkFolder, setLinkFolder] = useState(linkFolderList);
    const [activeKey, setActiveKey] = useState<number>();
    const [changeName, setChangeName] = useState();

    const onClickLinkCard = (value: string) => {
        console.log(value)
    }

    const onClickEdit = (key: number) => {
        console.log(key)
        setActiveKey(key);
        setIsModalOpen(true);

    };

    const handleOk = () => {
        
        setIsModalOpen(false);
      };
      const handleCancel = () => {
        setIsModalOpen(false);
      };

      const onChangeName = (e : any) => {
        console.log(e.target.value);
        setChangeName(e.target.value);
      }

    const content = (
        <Flex vertical>
            <Button>수정</Button>
            <Button>삭제</Button>
        </Flex>
    )

    return (
        <>
        <div style={{ paddingBottom: 20 }}>
            <Row 
                // justify={'center'}
                >
            {linkFolderList.map((linkFolder, index) => {
                return (
                    <Col offset={1} key={index}>
                        <Card
                            key={index}
                            hoverable
                            size="small"
                            style={{
                                width: 200,
                                // height: 100
                            }}
                            styles={{ body: {
                                margin: 0,
                                padding: 0
                            }}}
                            
                            cover={
                                <img alt={linkFolder.name} src={linkFolder.path} style={{ height: 180 }}/>
                            }
                            actions={[
                                <CopyOutlined key="edit" onClick={() => onClickEdit(linkFolder.key)}/>,
                                <Popover content={content} trigger={'click'}>
                                    <EllipsisOutlined key="ellipsis" />
                                </Popover>
                              ]}
                            onClick={() => {onClickLinkCard(linkFolder.name)}}
                        >
                        </Card>
                    </Col>
                )

            })}
            </Row>
            <Modal title="폴더 이름 변경" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <Input placeholder="변경할 폴더 이름을 입력해주세요." onChange={onChangeName} />
            </Modal>
        </div>
        </>
    )
}