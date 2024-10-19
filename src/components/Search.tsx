import { Select } from 'antd';
import { useNavigate } from 'react-router-dom';

export const SearchComponent = () => {
    const navigate = useNavigate();

    return (
        <>
            <div style={{ paddingBottom: 20 }}>
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
                    onClick={() => navigate('/search')}
                />
            </div>
        </>
    );
};
