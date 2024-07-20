import { Select, Typography } from "antd";
import Search from "antd/es/input/Search"

export const SearchComponent = () => {
    const selectSearchOptions = [
        {
            value: '0',
            label: "찾을 수 없습니다."
        },
        {
            value: '1',
            label: "김유진"
        },
        {
            value: '2',
            label: "이여름"
        },
        {
            value: '3',
            label: "김보풀"
        },
        {
            value: '4',
            label: "유여"
        },
    ]

    /** 검색 */
    const onSearch = (value: string) => {
        console.log(value);
    }

    return (
        <>
            {/* <div style={{ paddingBottom: 20 }}>
                <Typography.Title level={5} style={{ paddingBottom: 8}}>
                Input 검색 컴포넌트
                </Typography.Title>
                <Search 
                    placeholder="검색어를 입력해주세요."
                    allowClear
                    onSearch={onSearch}
                    style={{ width: 400 }}
                />
            </div> */}
            <div style={{ paddingBottom: 20 }}>
                <Select 
                    showSearch 
                    style={{ width: '100%', height: 40 }} 
                    placeholder="검색어를 입력해주세요."
                    optionFilterProp="label"
                    filterSort={(option, anotherOption) => {
                        // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                        return (option.label ?? "").toLowerCase().localeCompare((anotherOption.label ?? "").toLowerCase());
                    }}
                    options={selectSearchOptions}
                />
            </div>
        </>
    )
}