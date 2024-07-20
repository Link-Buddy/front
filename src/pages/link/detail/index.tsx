import { Divider, Flex, Image, Tooltip, Typography } from "antd";
import { LinkComponent } from "components/Link";
import { SearchComponent } from "components/Search";
import { useParams } from "react-router-dom";

const LinkDetailComponent = () => {
    const { id } = useParams();

    return (
        <div style={{ height: '100%', paddingBottom: 50}}>
            <Flex justify="flex-start">
                <Typography.Title level={3}>링크</Typography.Title>
            </Flex>
            <div style={{ padding: '10px 0px 0px 0px'}}>
                <SearchComponent />
            </div>
            <Divider />
            <LinkComponent />
        </div>
    )
}
export default LinkDetailComponent;