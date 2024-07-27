import { Flex, Select, Typography } from "antd";

const SearchComponent = () => {
    return (
        <div style={{ padding: '0px 25px 50px 25px ' }}>
            <Flex justify="flex-start">
                    <Typography.Title level={3}>검색</Typography.Title>
                </Flex>
            <Select
                showSearch 
                style={{ width: '100%', height: 40 }} 
                placeholder="검색어를 입력해주세요."
                optionFilterProp="label"
                // filterSort={(option, anotherOption) => {
                //     // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                //     return (option.label ?? "").toLowerCase().localeCompare((anotherOption.label ?? "").toLowerCase());
                // }}
                // options={selectSearchOptions}
            />
        </div>
    )
}
export default SearchComponent;