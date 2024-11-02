import {
    Divider,
    Flex,
    Form,
    Modal,
    Radio,
    Select,
    Space,
    Typography,
} from 'antd';
import { getBuddyList } from 'api/buddy';
import { getBuddyCategoryList, getMyCategoryList } from 'api/category';
import { changeLinkCategory } from 'api/link';
import { useEffect, useState } from 'react';
import { Category } from 'types/Category';

interface ModalProps {
    isOpen: boolean;
    selectedLink?: number[];
    category: {
        categoryName: string;
        buddyId: number;
        shareTypeCd: number;
    };
    closeModal: (key: string) => void;
}

export const MoveLinkModal: React.FC<ModalProps> = ({
    isOpen,
    selectedLink,
    category,
    closeModal,
}) => {
    const [categories, setCategories] = useState<
        { label: string; value: number }[]
    >([]);
    const [categoryId, setCategoryId] = useState<string>('');

    const handleOk = async () => {
        if (selectedLink) {
            console.log('selectedLink', selectedLink[0]);
            console.log('categoryId', categoryId);
            const result = await changeLinkCategory(categoryId, selectedLink);
            console.log('result', result);
            closeModal('moveLink');
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
        console.log('data', data);
        const newCategories = data.map((item, index) => {
            return {
                label: item.categoryName,
                value: item.id,
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
                    onChange={(value) => setCategoryId(value)}
                />
            </Space>
            <Divider style={{ margin: '30px 0px 20px 0px' }} />
        </Modal>
    );
};
