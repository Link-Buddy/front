import { Divider, Form, Modal, Select, Space } from 'antd';
import { getBuddyCategoryList, getMyCategoryList } from 'api/category';
import { changeLinkCategory } from 'api/link';
import { useEffect, useState } from 'react';
import { Category } from 'types/Category';

interface ModalProps {
    isOpen: boolean;
    selectedLink?: number[];
    category: {
        categoryId: string;
        categoryName: string;
        buddyId: number;
        shareTypeCd: number;
    };
    closeModal: (key: string) => void;
    refresh: number;
    setRefresh: (e: number) => void;
}

export const MoveLinkModal: React.FC<ModalProps> = ({
    isOpen,
    selectedLink,
    category,
    closeModal,
    refresh,
    setRefresh,
}) => {
    const [form] = Form.useForm();
    const [categories, setCategories] = useState<
        { label: string; value: number; disabled: boolean }[]
    >([]);
    const [categoryId, setCategoryId] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);

    /** 확인시 링크 이동 */
    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);

            if (selectedLink) {
                console.log('selectedLink', selectedLink[0]);
                console.log('categoryId', categoryId);
                const result = await changeLinkCategory(
                    categoryId,
                    selectedLink
                );
                console.log('result', result);
                if (result.status === 'OK') {
                    alert('폴더 이동에 성공했습니다.');
                    setRefresh(refresh + 1);
                    // 모달 닫기
                    closeModal('moveLink');
                } else {
                    alert('폴더 이동에 실패했습니다.');
                }
                setLoading(false);
            }
        } catch (error) {
            setLoading(false);
        }
    };

    /** 카테고리 데이터 */
    const getCategories = async () => {
        let data: Category[] = [];
        if (category.shareTypeCd === 20) {
            const buddyId = category.buddyId.toString();
            data = await getBuddyCategoryList(buddyId);
        } else {
            data = await getMyCategoryList(); // 카테고리 데이터 가져오기
        }
        console.log('카테고리 data', data);
        const newCategories = data.map((item, index) => {
            return {
                label: item.categoryName,
                value: item.id,
                disabled:
                    item.id === Number(category.categoryId) ? true : false,
            };
        });
        setCategories(newCategories);
    };

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <Modal
            title="링크 이동"
            open={isOpen}
            onOk={handleOk}
            onCancel={() => closeModal('moveLink')}
            okText={`확인`}
            cancelText={`취소`}
            confirmLoading={loading}
            style={{ padding: 30 }}
        >
            <Divider style={{ margin: '10px 0px 20px 0px' }} />
            <Space
                direction="vertical"
                size="middle"
                style={{
                    display: 'flex',
                }}
            >
                <Form form={form}>
                    <Form.Item
                        name="categoryId"
                        rules={[
                            {
                                required: true,
                                message: '이동할 폴더를 선택해주세요.',
                            },
                        ]}
                    >
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
                                        (
                                            anotherOption.label ?? ''
                                        ).toLowerCase()
                                    );
                            }}
                            options={categories}
                            onChange={(value) => setCategoryId(value)}
                        />
                    </Form.Item>
                </Form>
            </Space>
            <Divider style={{ margin: '30px 0px 20px 0px' }} />
        </Modal>
    );
};
