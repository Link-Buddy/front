import {
    Badge,
    Breadcrumb,
    Card,
    Divider,
    Empty,
    Flex,
    List,
    Space,
    Typography,
} from 'antd';
import Search from 'antd/es/input/Search';
import { searchLink } from 'api/link';
import { useState } from 'react';
import { SearchLink } from 'types/Link';

const SearchPage = () => {
    const [initLoading, setInitLoading] = useState(true);
    const [list, setList] = useState<SearchLink[]>([]);

    const onSearch = async (value: any) => {
        console.log(value);
        const searchData = await searchLink(value);
        console.log(searchData);
        setList(searchData);
        setInitLoading(false);
    };

    const handleSearchDataPath = (link: SearchLink) => {
        let path = [];
        path.push({ title: link.shareTypeCd === 10 ? 'Private' : 'Buddy' });
        if (link.shareTypeCd === 20) {
            path.push({ title: link.buddyName ? link.buddyName : '' });
        }
        path.push({ title: link.categoryName });

        return path;
    };

    return (
        <div style={{ padding: '0px 25px 50px 25px ' }}>
            <Flex justify="flex-start">
                <Typography.Title level={3}>검색</Typography.Title>
            </Flex>
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
                        renderItem={(item: SearchLink) => (
                            <Space
                                direction="vertical"
                                size="middle"
                                style={{
                                    width: '100%',
                                    paddingBottom: 20,
                                }}
                            >
                                <Badge.Ribbon
                                    color={
                                        item.shareTypeCd === 10
                                            ? '#faad14'
                                            : '#52c41a'
                                    }
                                    text={
                                        item.shareTypeCd === 10
                                            ? 'Private'
                                            : 'Buddy'
                                    }
                                >
                                    <Card
                                        style={{
                                            width: '100%',
                                            cursor: 'pointer',
                                        }}
                                        onClick={() =>
                                            window.open(item.linkUrl)
                                        }
                                    >
                                        <div className="flex flex-row justify-between">
                                            <div className="flex flex-col gap-1">
                                                <Breadcrumb
                                                    separator=">"
                                                    items={handleSearchDataPath(
                                                        item
                                                    )}
                                                />
                                                <Typography.Text className="flex justify-start text-base font-semibold pr-2 pt-2">
                                                    {item.linkName}
                                                </Typography.Text>
                                                <Typography.Text className="flex justify-start pt-2 text-slate-400 text-xs">
                                                    {item.linkDescription}
                                                </Typography.Text>
                                                <Typography.Text className="flex justify-start font-medium">
                                                    {item.linkUrl}
                                                </Typography.Text>
                                            </div>
                                        </div>
                                    </Card>
                                </Badge.Ribbon>
                            </Space>
                        )}
                    />
                ) : (
                    <Empty />
                )}
            </div>
        </div>
    );
};
export default SearchPage;
