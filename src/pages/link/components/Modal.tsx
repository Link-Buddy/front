import { Flex, Modal, Radio, Select, Space, Typography } from "antd";
import { useState } from "react";

interface ModalProps {
    isOpen: boolean;
    setIsOpen: (e: boolean) => void;
    options: { value: string, label: string }[];
    selectedLink?: number[]; 
}

const ModalComponent: React.FC<ModalProps> = ({ isOpen, setIsOpen, options, selectedLink }) => {
    const [radioValue, setRadioValue] = useState('private');

    const handleRadioChange = (e: any) => {
      setRadioValue(e.target.value);
    };

    const handleOk = () => {
        setIsOpen(false);
    };
    const handleCancel = () => {
        setIsOpen(false);
    };

    return (
        <Modal 
                title="링크 이동" 
                open={isOpen} 
                onOk={handleOk} 
                onCancel={handleCancel}
                style={{ padding: 30 }}
            >
                <Typography.Text style={{ color: '#132639' }} strong>
                    선택한 링크 key :  
                    {selectedLink && selectedLink.map((link, index) => {
                        return (
                            <Typography.Text style={{ color: '#132639' }} key={index}>
                                {link}, 
                            </Typography.Text>
                        )
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
                    <Radio.Button value="private" className="flex-1 text-center">
                    PRIVATE
                    </Radio.Button>
                    <Radio.Button value="buddy" className="flex-1 text-center">
                    BUDDY
                    </Radio.Button>
                </Radio.Group>
                    {radioValue === 'buddy' && (
                        <Select style={{ width: '100%' }} placeholder="버디그룹" options={[{ label: '가족', value: 'family'}, { label: '스터디', value: 'study'}]} />
                    )}
                    <Select
                        showSearch 
                        style={{ width: '100%' }} 
                        placeholder="폴더를 선택해주세요."
                        optionFilterProp="label"
                        filterSort={(option, anotherOption) => {
                            // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                            return (option.label ?? "").toLowerCase().localeCompare((anotherOption.label ?? "").toLowerCase());
                        }}
                        options={options}
                    />
                </Space>
            </Modal>
    )
}
export default ModalComponent;