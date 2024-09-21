import { Button, Form, Input, message } from 'antd';
import { addBuddy } from 'api/buddy';

const AddBuddyPage = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const onFinish = async (values: any) => {
        console.log('Success:', values);
        const result = await addBuddy(values);
        console.log('result', result);
        if (result.status === 'OK') {
            messageApi.open({
                type: 'success',
                content: '버디 추가가 완료되었습니다.',
            });
        } else if (result.status === 'CONFLICT') {
            messageApi.open({
                type: 'error',
                content: '동일한 이름의 버디가 존재합니다.',
            });
        } else {
            messageApi.open({
                type: 'error',
                content: '오류가 발생하였습니다. 잠시 후 다시 시도해주세요.',
            });
        }
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            {contextHolder}
            <div className="flex flex-col gap-8">
                <h2 className="font-semibold text-xl">버디 추가</h2>
                <Form
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="버디명"
                        name="name"
                        rules={[
                            {
                                required: true,
                                message: '버디명을 입력해주세요.',
                            },
                        ]}
                    >
                        <Input placeholder="버디명" className="p-2" />
                    </Form.Item>
                    <Form.Item className="mt-20">
                        <Button
                            type="primary"
                            className="w-full h-12 flex items-center justify-center"
                            htmlType="submit"
                        >
                            추가
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </>
    );
};
export default AddBuddyPage;
