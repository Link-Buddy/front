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
    const [buddyId, setBuddyId] = useState<string>('');
    const [buddyGroup, setBuddyGroup] = useState<
        { label: string; value: number }[]
    >([]);
    const [categoryId, setCategoryId] = useState<string>('');

    const handleOk = async () => {
        alert('이동완료!');
        if (selectedLink) {
            console.log('selectedLink', selectedLink[0]);
            console.log('categoryId', categoryId);
            const result = await changeLinkCategory(categoryId, selectedLink);
        }
    };
    const handleRadioChange = (e: any) => {
        // 초기화
        setCategories([]);
        setRadioValue(e.target.value);
        const radioBtnValue = e.target.value;
        if (radioBtnValue === 'buddy') {
            getBuddyGroup();
        } else {
            getCategories();
        }
    };

    /** 카테고리 데이터 */
    const getCategories = async () => {
        let data: Category[] = [];
        if (radioValue === 'buddy') {
            console.log('categoryID', buddyId);
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
    /** 버디그룹 */
    const getBuddyGroup = async () => {
        const buddylist = await getBuddyList(); // 버디그룹 데이터 가져오기
        console.log('buddylist', buddylist);
        const newData = buddylist.map((item, index) => {
            return {
                label: item.name,
                value: Number(item.buddyId),
            };
        });
        setBuddyGroup(newData);
    };

    useEffect(() => {
        getCategories();
    }, [buddyId]);

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
                    selectedLink.map((linkId, index) => {
                        return (
                            <Typography.Text
                                style={{ color: '#132639' }}
                                key={index}
                            >
                                {linkId},
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
                        options={buddyGroup}
                        onChange={(value) => setBuddyId(value)}
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
                    onChange={(value) => setCategoryId(value)}
                />
            </Space>
            <Divider style={{ margin: '30px 0px 20px 0px' }} />
        </Modal>
    );
};
