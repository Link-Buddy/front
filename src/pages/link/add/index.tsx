import React, { useState } from 'react';
import { Input, Button, Radio, Select, Form } from 'antd';
import { useNavigate } from 'react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const AddLinkForm = () => {
  const [radioValue, setRadioValue] = useState('private');

  const handleRadioChange = (e: any) => {
    setRadioValue(e.target.value);
  };

  const navigate = useNavigate();
  const handleSubmit = () => {
    navigate('/home');
  };
  return (
    <div>
      <h2 className="text-center mb-4 text-lg">ADD LINK</h2>
      <Form layout="vertical">
        <Form.Item label="링크주소">
          <Input placeholder="링크주소" className="p-2" />
        </Form.Item>
        <Form.Item label="링크이름">
          <Input placeholder="링크이름" className="p-2" />
        </Form.Item>
        <Form.Item label="설명">
          <TextArea rows={4} placeholder="설명" />
        </Form.Item>
        <Form.Item>
          <Radio.Group
            defaultValue="private"
            className="flex justify-between"
            onChange={handleRadioChange}
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
            <Select placeholder="버디그룹">
              <Option value="group1">가족공유</Option>
              <Option value="group2">우아한캠프</Option>
            </Select>
          </Form.Item>
        )}
        <Form.Item label="폴더">
          <Select placeholder="폴더">
            <Option value="folder1">미분류</Option>
            <Option value="folder2">개발</Option>
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
