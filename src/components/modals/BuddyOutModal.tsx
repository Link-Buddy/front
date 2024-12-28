import { Button, Divider, message, Modal, Row, Typography } from 'antd';
import { deleteBuddy, deleteBuddyUser } from 'api/buddy';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  closeModal: (key: string) => void;
  buddyData: {
    buddyId: string | undefined;
    isCreator: boolean;
  };
}

const BuddyOutModal: React.FC<ModalProps> = ({
  isOpen,
  closeModal,
  buddyData,
}) => {
  const navigate = useNavigate();
  const title = buddyData.isCreator
    ? '버디를 삭제하시겠습니까?'
    : '버디를 나가시겠습니까?';
  const subText = buddyData.isCreator
    ? '멤버를 모두 버디에서 내보내고 모든 정보가 삭제됩니다.'
    : '버디를 나갈 경우 모든 정보가 삭제됩니다.';

  const handleOk = async () => {
    let result: { status: string; data: boolean } = { status: '', data: false };
    if (buddyData.isCreator) {
      result = await deleteBuddy(Number(buddyData.buddyId));
      console.log('creator delete result', result);
    } else {
      result = await deleteBuddyUser(Number(buddyData.buddyId));
      console.log('delete result', result);
    }
    if (result.status === 'OK') {
      message.open({
        type: 'success',
        content: buddyData.isCreator ? '버디 삭제 성공' : '버디 나가기 성공',
      });
    } else {
      message.open({
        type: 'error',
        content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      });
    }
    setTimeout(() => {
      closeModal('buddyOut');
    }, 3000);
    navigate('/buddy/list');
  };

  return (
    <Modal
      open={isOpen}
      style={{ padding: 30 }}
      onOk={handleOk}
      onCancel={() => closeModal('buddyOut')}
      okText="확인"
      cancelText="취소"
      footer={
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Button
            size="large"
            style={{ flex: 1, marginRight: 8 }}
            onClick={() => closeModal('buddyOut')}
          >
            취소
          </Button>
          <Button
            size="large"
            type="primary"
            style={{ flex: 1, marginLeft: 8 }}
            onClick={handleOk}
          >
            확인
          </Button>
        </div>
      }
    >
      <div style={{ paddingBottom: 40 }}>
        <Typography.Title
          level={4}
          style={{ paddingTop: 30, textAlign: 'start' }}
        >
          {title}
        </Typography.Title>
        <Typography.Text style={{ color: '#808080' }}>
          {subText}
        </Typography.Text>
      </div>
    </Modal>
  );
};
export default BuddyOutModal;
