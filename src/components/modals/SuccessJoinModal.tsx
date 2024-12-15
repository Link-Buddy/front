import { Button, Divider, Modal, Row, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

interface ModalProps {
  isOpen: boolean;
  closeModal: (key: string) => void;
}

const SuccessJoinModal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  const navigate = useNavigate();
  const handleOk = () => {
    closeModal('successJoin');
    navigate('/login');
  };

  return (
    <Modal
      open={isOpen}
      closable={false}
      style={{ padding: 30 }}
      footer={[
        <Button
          block
          size="large"
          type="primary"
          htmlType="submit"
          className="mt-5"
          onClick={handleOk}
          style={{ fontWeight: 'bold', height: 50, fontSize: 17 }}
        >
          로그인 화면으로 이동
        </Button>,
      ]}
    >
      <Typography.Title
        level={4}
        style={{ paddingTop: 30, textAlign: 'start' }}
      >
        Link-Buddy 회원가입 성공!
      </Typography.Title>
      <Typography.Text style={{ color: '#808080' }}>
        로그인 후에 친구와 링크를 공유해보세요!
      </Typography.Text>
      <Row justify={'center'} style={{ paddingBottom: 60, paddingTop: 60 }}>
        <img src="/images/logo_main.png" style={{ width: 170 }} />
      </Row>
    </Modal>
  );
};
export default SuccessJoinModal;
