import React, { useEffect, useState } from 'react';
import { Input, Button, Radio, Select, Form } from 'antd';
import { useNavigate } from 'react-router-dom';
import { createLink } from 'api/link';
import { getBuddyCategoryList, getMyCategoryList } from 'api/category';
import { Category } from 'types/Category';
import { getBuddyList } from 'api/buddy';

const { TextArea } = Input;
const { Option } = Select;

const AddLinkForm = () => {
  const [radioValue, setRadioValue] = useState('private');
  const [categories, setCategories] = useState<Category[]>([]); // 카테고리 상태 추가
  const [buddyList, setBuddyList] = useState<Buddy[]>([]); // 버디 카테고리 상태 추가

  useEffect(() => {
    const getCategories = async () => {
      const initialData = await getMyCategoryList(); // 초기 데이터 로드
      setCategories(initialData);
    };
    getCategories();
  }, []);

  const [linkData, setLinkData] = useState({
    linkUrl: '',
    name: '',
    description: '',
    categoryId: '',
  });

  async function handleRadioChange(value: 'private' | 'buddy') {
    setRadioValue(value);
    if (value === 'private') {
      let data = await getMyCategoryList();
      setCategories(data);
    } else {
      const buddylist = await getBuddyList(); // 버디 카테고리 데이터 로드
      setBuddyList(buddylist);
      setCategories([]);
    }
  }

  const navigate = useNavigate();
  const handleSubmit = async () => {
    await createLink(linkData);
    navigate(`/category/${linkData.categoryId}`);
  };
  return (
    <div>
      <h2 className="text-center mb-4 text-lg">ADD LINK</h2>
      <Form layout="vertical">
        <Form.Item label="링크주소">
          <Input
            placeholder="링크주소"
            className="p-2"
            onChange={(e) =>
              setLinkData({ ...linkData, linkUrl: e.target.value })
            } // 링크주소 상태 업데이트
          />
        </Form.Item>
        <Form.Item label="링크이름">
          <Input
            placeholder="링크이름"
            className="p-2"
            onChange={(e) => setLinkData({ ...linkData, name: e.target.value })} // 링크이름 상태 업데이트
          />
        </Form.Item>
        <Form.Item label="설명">
          <TextArea
            rows={4}
            placeholder="설명"
            onChange={(e) =>
              setLinkData({ ...linkData, description: e.target.value })
            } // 설명 상태 업데이트
          />
        </Form.Item>
        <Form.Item>
          <Radio.Group
            defaultValue="private"
            className="flex justify-between"
            onChange={(e) => handleRadioChange(e.target.value)}
          >
            <Radio.Button value="private" className="flex-1 text-center">
              PRIVATE
            </Radio.Button>
            <Radio.Button value="buddy" className="flex-1 text-center">
              BUDDY
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {radioValue === 'buddy' && (
          <Form.Item label="버디그룹">
            <Select
              placeholder="버디그룹"
              onChange={async (value) => {
                setLinkData({ ...linkData, categoryId: value });
                const buddyCategory = await getBuddyCategoryList(value); // 선택한 버디에 대한 카테고리 요청
                setCategories(buddyCategory); // 버디 카테고리 업데이트
              }} // 버디그룹 상태 업데이트
            >
              {buddyList.map(
                // 버디 카테고리 리스트로 표시
                (buddy) => (
                  <Option key={buddy.id} value={buddy.buddyId}>
                    {buddy.name}
                  </Option>
                )
              )}
            </Select>
          </Form.Item>
        )}
        <Form.Item label="폴더">
          <Select
            placeholder="폴더"
            onChange={(value) =>
              setLinkData({ ...linkData, categoryId: value })
            } // 폴더 상태 업데이트
          >
            {categories.map(
              (
                category // 카테고리 리스트로 표시
              ) => (
                <Option key={category.id} value={category.id}>
                  {category.categoryName}
                </Option>
              )
            )}
          </Select>
        </Form.Item>
        <Form.Item className="mt-20">
          <Button
            type="primary"
            className="w-full h-12 flex items-center justify-center"
            onClick={handleSubmit}
          >
            추가
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddLinkForm;
