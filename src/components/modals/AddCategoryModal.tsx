import React, { useState } from 'react';
import { Modal, Input } from 'antd';

interface AddCategoryModalProps {
  onClose: () => void;
  onAdd: (categoryName: string) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  onClose,
  onAdd,
}) => {
  const [categoryName, setCategoryName] = useState<string>('');

  const handleAddClick = () => {
    if (categoryName.trim()) {
      onAdd(categoryName);
      setCategoryName('');
    }
  };

  return (
    <Modal
      title="새 폴더 추가"
      open={true} // Ensure the modal is visible
      onOk={handleAddClick}
      onCancel={onClose}
      okText="추가"
      cancelText="닫기"
    >
      <Input
        placeholder="폴더 이름 입력"
        value={categoryName}
        onChange={(e) => setCategoryName(e.target.value)}
      />
    </Modal>
  );
};

export default AddCategoryModal;
