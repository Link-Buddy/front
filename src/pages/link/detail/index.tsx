import { CloseOutlined, FolderOpenOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Flex, Image, Input, Modal, Row, Select, Space, Tooltip, Typography } from "antd";
import Search from "antd/es/input/Search";
import { LinkComponent } from "components/Link";
import { SearchComponent } from "components/Search";
import { useState } from "react";
import { useParams } from "react-router-dom";

const LinkDetailComponent = () => {
    const { id } = useParams();
    /** 편집 링크 */
    const [showSelectInfo, setShowSelectInfo] = useState<boolean>(false);
    const [selectLinkCount, setSelectLinkCount] = useState<number>(0);

    /** 모달 노출 */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeKey, setActiveKey] = useState<number>();
    const [changeName, setChangeName] = useState();

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

        // const onClickEdit = (key: number) => {
    //     console.log(key)
    //     setActiveKey(key);
    //     setIsModalOpen(true);

    // };

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
        setShowSelectInfo(!showSelectInfo);
    }

    return (
        <>
            <div style={{ height: '100%', padding: '0px 25px 50px 25px '}}>
                <Flex justify="flex-start">
                    <Typography.Title level={3}>링크</Typography.Title>
                </Flex>
                <div style={{ padding: '10px 0px 0px 0px'}}>
                    <SearchComponent />
                </div>
                <Row justify={'end'}>
                    <Typography.Text><a onClick={onClickEdit}>편집</a></Typography.Text>
                </Row>
                <Divider style={{ margin: '10px 0px'}}/>
                <LinkComponent linkList={linkList}/>
            </div>
            {showSelectInfo && (
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
                    <Row justify={'start'} style={{ paddingLeft: 20}}>
                        <Typography.Text style={{ color: '#132639' }} strong>
                            {selectLinkCount} 개 선택
                        </Typography.Text>
                    </Row>
                    </Col>
                    <Col span={10}>
                        <Space size={'small'}>
                            <a onClick={() => setIsModalOpen(true)}>
                                <FolderOpenOutlined style={{ paddingRight: 5}}/>
                                폴더이동
                            </a>
                            <Divider type="vertical" style={{ borderLeft: '1px solid #666666'}}/>
                            <a>
                                <CloseOutlined style={{ paddingRight: 5}}/>
                                삭제
                            </a>
                        </Space>
                    </Col>
                </Row>
            )}
            <Modal 
                title="폴더 이동" 
                open={isModalOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                style={{ padding: 30 }}
            >
                <div style={{ padding: '10px 0px' }}>
                    <Select 
                        showSearch 
                        style={{ width: '100%' }} 
                        placeholder="폴더를 선택해주세요."
                        optionFilterProp="label"
                        filterSort={(option, anotherOption) => {
                            // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                            return (option.label ?? "").toLowerCase().localeCompare((anotherOption.label ?? "").toLowerCase());
                        }}
                        options={selectSearchOptions}
                    />
                </div>
            </Modal>
        </>
    )
}
export default LinkDetailComponent;