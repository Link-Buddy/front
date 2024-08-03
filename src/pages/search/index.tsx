import { Avatar, Breadcrumb, Button, Divider, Empty, Flex, List, Select, Skeleton, Typography } from "antd";
import Search from "antd/es/input/Search";
import { useEffect, useState } from "react";
import { mockSearchData } from "utils/mockData";

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const SearchPage = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [list, setList] = useState<any[]>([]);

    // useEffect(() => {
    //   fetch(fakeDataUrl)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       setInitLoading(false);
    //       setData(res.results);
    //       setList(res.results);
    //     });
    // }, []);
    
    // const onLoadMore = () => {
    //   setLoading(true);
    // //   setList(
    // //     data.concat(
    // //       [...new Array(count)].map(() => ({
    // //         loading: true,
    // //         name: {},
    // //         picture: {},
    // //       })),
    // //     ),
    // //   );
    //   fetch(fakeDataUrl)
    //     .then((res) => res.json())
    //     .then((res) => {
    //       const newData = data.concat(res.results);
    //       setData(newData);
    //       setList(newData);
    //       setLoading(false);
    //       // Resetting window's offsetTop so:to display react-virtualized demo underfloor.
    //       // In real scene, you can using public method of react-virtualized:
    //       // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
    //       window.dispatchEvent(new Event('resize'));
    //     });
    // };

    // const loadMore =
    // !initLoading && !loading ? (
    //   <div
    //     style={{
    //       textAlign: 'center',
    //       marginTop: 12,
    //       height: 32,
    //       lineHeight: '32px',
    //     }}
    //   >
    //     <Button onClick={onLoadMore}>loading more</Button>
    //   </div>
    // ) : null;

    const onSearch = (value: any) => {
        console.log(value);
        const searchData = mockSearchData.filter((data) => {
            console.log(data);
            return data.url.includes(value);
        })
        console.log(searchData);
        setList(searchData);
        setInitLoading(false);
    }

    return (
        <div style={{ padding: '0px 25px 50px 25px ' }}>
            <Flex justify="flex-start">
                    <Typography.Title level={3}>검색</Typography.Title>
                </Flex>
            {/* <Select
                showSearch 
                style={{ width: '100%', height: 40 }} 
                placeholder="검색어를 입력해주세요."
                optionFilterProp="label"
                filterSort={(option, anotherOption) => {
                    // localeCompare : 두 문자열 비교해서 정렬 순서 결정
                    return (option.label ?? "").toLowerCase().localeCompare((anotherOption.label ?? "").toLowerCase());
                }}
                options={mockSearchData}
                onSearch={onSearch}
            /> */}
            <Search
                placeholder="검색어를 입력해주세요."
                allowClear
                onSearch={onSearch}
                // style={{ width: 360 }}
                style={{ width: '100%', height: 40 }}
            />
            <Divider />
            <div>
                {list.length > 0 ? (
                    <List
                        loading={initLoading}
                        itemLayout="horizontal"
                        // loadMore={loadMore}
                        dataSource={list}
                        renderItem={(item : any) => (
                        <List.Item
                        >
                            <Flex vertical>
                                <Breadcrumb separator=">" items={item.path} />
                                <Typography.Text>{item.url}</Typography.Text>
                            </Flex>
                        </List.Item>
                        )}
                    />
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    )
}
export default SearchPage;