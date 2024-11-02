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
  Input,
} from 'antd';
import { useEffect, useState } from 'react';
import { ISearchLink } from 'types/Link';

interface SearchListProps {
  fetchLinks: (value?: string) => Promise<ISearchLink[]>; // 링크를 가져오는 함수
  title: string; // 제목
}

const SearchList: React.FC<SearchListProps> = ({ fetchLinks, title }) => {
  const [initLoading, setInitLoading] = useState(true);
  const [list, setList] = useState<ISearchLink[]>([]);
  const [searchValue, setSearchValue] = useState('');

  // onSearch 함수 정의
  const onSearch = async (value: string) => {
    setInitLoading(true); // 로딩 상태 시작
    const searchData = await fetchLinks(value); // 검색어를 기반으로 링크 가져오기
    setList(searchData); // 가져온 데이터로 리스트 업데이트
    setInitLoading(false); // 로딩 상태 종료
  };

  useEffect(() => {
    const fetchMyLinks = async () => {
      const mylinks = await fetchLinks(); // 초기 데이터 가져오기
      setList(mylinks);
      setInitLoading(false);
    };

    fetchMyLinks();
  }, [fetchLinks]);

  const handleDataPath = (link: ISearchLink) => {
    let path = [];
    path.push({ title: link.shareTypeCd === 10 ? 'Private' : 'Buddy' });
    if (link.shareTypeCd === 20) {
      path.push({ title: link.buddyName ? link.buddyName : '' });
    }
    path.push({ title: link.categoryName });

    return path;
  };

  return (
    <div>
      <div style={{ padding: '0px 25px 50px 25px ' }}>
        <Flex justify="flex-start">
          <Typography.Title level={3}>{title}</Typography.Title>
        </Flex>
      </div>
      {title == '검색' && (
        <Input.Search
          placeholder="검색어를 입력해주세요."
          allowClear
          onSearch={onSearch}
          onChange={(e) => setSearchValue(e.target.value)}
          style={{ width: '100%', height: 40 }}
        />
      )}
      <Divider />
      {list.length > 0 ? (
        <List
          loading={initLoading}
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item: ISearchLink) => (
            <Space
              direction="vertical"
              size="middle"
              style={{
                width: '100%',
                paddingBottom: 20,
              }}
            >
              <Badge.Ribbon
                color={item.shareTypeCd === 10 ? '#faad14' : '#52c41a'}
                text={item.shareTypeCd === 10 ? 'Private' : 'Buddy'}
              >
                <Card
                  style={{
                    width: '100%',
                    cursor: 'pointer',
                  }}
                  onClick={() => window.open(item.linkUrl)}
                >
                  <div className="flex flex-row justify-between">
                    <div className="flex flex-col gap-1">
                      <Breadcrumb separator=">" items={handleDataPath(item)} />
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
  );
};

export default SearchList;
