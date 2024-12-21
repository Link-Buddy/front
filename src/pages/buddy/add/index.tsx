import { Button, Flex, Form, Input, Typography } from 'antd';
import { addBuddy } from 'api/buddy';
import { useMessage } from 'hooks/useMessage';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddBuddyPage = () => {
  const message = useMessage();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    console.log('Success:', values);
    const result = await addBuddy(values);
    console.log('result', result);
    if (result.status === 'OK') {
      message.open({
        type: 'success',
        content: '버디 추가가 완료되었습니다.',
      });
      setLoading(false);
      navigate('/buddy/list');
    } else if (result.status === 'CONFLICT') {
      message.open({
        type: 'error',
        content: '동일한 이름의 버디가 존재합니다.',
      });
      setLoading(false);
    } else {
      message.open({
        type: 'error',
        content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
      });
      setLoading(false);
    }
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div
      style={{
        padding: '0px 25px 50px 25px',
        width: '100%',
        height: '100%',
      }}
    >
      <Flex justify="flex-start">
        <Typography.Title
          level={4}
          style={{ paddingTop: 30, textAlign: 'start' }}
        >
          버디 추가
        </Typography.Title>
      </Flex>
      <Form
        //   layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <div className="pt-5">
          <Typography.Text
            strong
            className="flex justify-start text-md text-slate-900 pb-2"
          >
            버디명
          </Typography.Text>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: '버디명을 입력해주세요.',
              },
            ]}
          >
            <Input placeholder="버디명" className="p-2" size="large" />
          </Form.Item>
        </div>
        <div>
          <Form.Item>
            <Button
              block
              size="large"
              type="primary"
              className="w-full h-12 flex items-center justify-center mb-14"
              htmlType="submit"
            >
              추가
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
};
export default AddBuddyPage;
