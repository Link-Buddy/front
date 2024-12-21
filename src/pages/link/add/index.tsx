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
  const [categories, setCategories] = useState<Category[]>([]);
  const [buddyList, setBuddyList] = useState<Buddy[]>([]);
  const [formErrors, setFormErrors] = useState({
    linkUrl: false,
    name: false,
    categoryId: false,
  });

  useEffect(() => {
    const getCategories = async () => {
      const initialData = await getMyCategoryList();
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
      const data = await getMyCategoryList();
      setCategories(data);
    } else {
      const buddylist = await getBuddyList();
      setBuddyList(buddylist);
      setCategories([]);
    }
  }

  const navigate = useNavigate();
  const handleSubmit = async () => {
    const errors = {
      linkUrl: !linkData.linkUrl,
      name: !linkData.name,
      categoryId: !linkData.categoryId,
    };
    setFormErrors(errors);

    if (Object.values(errors).some((error) => error)) {
      return;
    }

    await createLink(linkData);
    navigate(`/category/${linkData.categoryId}`);
  };

  return (
    <div className="p-6">
      <h2 className="text-center mb-6 text-xl font-semibold text-gray-800">
        링크 추가
      </h2>
      <Form layout="vertical">
        <Form.Item
          label="링크 URL"
          className="font-medium text-gray-700"
          validateStatus={formErrors.linkUrl ? 'error' : undefined}
          help={formErrors.linkUrl && '링크 URL은 필수 항목입니다.'}
        >
          <Input
            placeholder="Enter link URL"
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => {
              setLinkData({ ...linkData, linkUrl: e.target.value });
              setFormErrors({ ...formErrors, linkUrl: false });
            }}
          />
        </Form.Item>
        <Form.Item
          label="링크명"
          className="font-medium text-gray-700"
          validateStatus={formErrors.name ? 'error' : undefined}
          help={formErrors.name && '링크명은 필수 항목입니다.'}
        >
          <Input
            placeholder="Enter link name"
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) => {
              setLinkData({ ...linkData, name: e.target.value });
              setFormErrors({ ...formErrors, name: false });
            }}
          />
        </Form.Item>
        <Form.Item label="내용(선택)" className="font-medium text-gray-700">
          <TextArea
            rows={4}
            placeholder="Enter description"
            className="p-3 border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(e) =>
              setLinkData({ ...linkData, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item className="mt-4">
          <Radio.Group
            defaultValue="private"
            className="flex justify-between"
            onChange={(e) => handleRadioChange(e.target.value)}
          >
            <Radio.Button
              value="private"
              className="flex-1 text-center rounded-l-md border border-gray-300 bg-gray-50 hover:bg-blue-100 h-10 flex items-center justify-center"
            >
              Private
            </Radio.Button>
            <Radio.Button
              value="buddy"
              className="flex-1 text-center rounded-l-md border border-gray-300 bg-gray-50 hover:bg-blue-100 h-10 flex items-center justify-center"
            >
              Buddy
            </Radio.Button>
          </Radio.Group>
        </Form.Item>
        {radioValue === 'buddy' && (
          <Form.Item label="버디 그룹" className="font-medium text-gray-700">
            <Select
              placeholder="Select a buddy group"
              className="w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
              onChange={async (value) => {
                setLinkData({ ...linkData, categoryId: value });
                setFormErrors({ ...formErrors, categoryId: false });
                const buddyCategory = await getBuddyCategoryList(value);
                setCategories(buddyCategory);
              }}
            >
              {buddyList.map((buddy) => (
                <Option key={buddy.id} value={buddy.buddyId}>
                  {buddy.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="카테고리"
          className="font-medium text-gray-700"
          validateStatus={formErrors.categoryId ? 'error' : undefined}
          help={formErrors.categoryId && '카테고리는 필수 항목입니다.'}
        >
          <Select
            placeholder="Select a category"
            className="w-full border rounded-md focus:outline-none focus:ring focus:ring-blue-500"
            onChange={(value) => {
              setLinkData({ ...linkData, categoryId: value });
              setFormErrors({ ...formErrors, categoryId: false });
            }}
          >
            {categories.map((category) => (
              <Option key={category.id} value={category.id}>
                {category.categoryName}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item className="mt-8">
          <Button
            type="primary"
            className="w-full h-12 flex items-center justify-center bg-808080 hover:bg-blue-600 text-white font-medium rounded-md p-3"
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
