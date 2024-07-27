import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';

const FloatAddLinkBtn: React.FC = () => (
  <div className="">
    <FloatButton
      shape="circle"
      type="primary"
      icon={<PlusOutlined />}
      className=""
    />
  </div>
);

export default FloatAddLinkBtn;
