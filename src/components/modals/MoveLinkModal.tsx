import { Divider, Flex, Modal, Radio, Select, Space, Typography } from 'antd';
import { getMyCategoryList } from 'api/category';
import { useEffect, useState } from 'react';
import { Category } from 'types/Category';

interface ModalProps {
    isOpen: boolean;
    selectedLink?: number[];
    closeModal: (key: string) => void;
}

export const MoveLinkModal: React.FC<ModalProps> = ({
    isOpen,
    closeModal,
    selectedLink,
}) => {
    const [radioValue, setRadioValue] = useState('private');
    const [categories, setCategories] = useState<
        { label: string; value: number }[]
    >([]);

    const handleOk = () => {
        alert('이동완료!');
    };
    const handleRadioChange = (e: any) => {
        setRadioValue(e.target.value);
    };

    const getCategories = async () => {
        const data = await getMyCategoryList(); // 카테고리 데이터 가져오기
        const newCategories = data.map((item, index) => {
            return {
                label: item.categoryName,
                value: item.id,
            };
        });
        setCategories(newCategories);
    };

    useEffect(() => {
        if (isOpen) {
            getCategories();
        }
    }, [isOpen]);

    return (
        <Modal
            title="링크 이동"
            open={isOpen}
            onOk={handleOk}
            onCancel={() => closeModal('moveLink')}
            style={{ padding: 30 }}
        >
            <Divider style={{ margin: '10px 0px 20px 0px' }} />
            <Typography.Text style={{ color: '#132639' }} strong>
                선택한 링크 key :
                {selectedLink &&
                    selectedLink.map((link, index) => {
                        return (
                            <Typography.Text
                                style={{ color: '#132639' }}
                                key={index}
                            >
                                {link},
                            </Typography.Text>
                        );
                    })}
            </Typography.Text>
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Radio.Group
                    defaultValue="private"
                    className="flex justify-between"
                    onChange={handleRadioChange}
                >
                    <Radio.Button
                        value="private"
                        className="flex-1 text-center"
                    >
                        PRIVATE
                    </Radio.Button>
                    <Radio.Button value="buddy" className="flex-1 text-center">
                        BUDDY
                    </Radio.Button>
                </Radio.Group>
                {radioValue === 'buddy' && (
                    <Select
                        style={{ width: '100%' }}
                        placeholder="버디그룹"
                        options={[
                            { label: '가족', value: 'family' },
                            { label: '스터디', value: 'study' },
                        ]}
                    />
                )}
                <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="폴더를 선택해주세요."
                    optionFilterProp="label"
                    filterSort={(option, anotherOption) => {
                        // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                        return (option.label ?? '')
                            .toLowerCase()
                            .localeCompare(
                                (anotherOption.label ?? '').toLowerCase()
                            );
                    }}
                    options={categories}
                />
            </Space>
            <Divider style={{ margin: '30px 0px 20px 0px' }} />
        </Modal>
    );
};
