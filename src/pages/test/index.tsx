import { Divider } from "antd";
import { LinkComponent } from "components/Link";
import { SearchComponent } from "components/Search";


const TestPage = () => {
    return (
        <div>
            <div style={{ paddingBottom: 20}}>
            <h1>공통 컴포넌트 </h1>
            </div>
            <div style={{ paddingBottom: 20}}>
                <SearchComponent />
            </div>
            <Divider />
            <div>
                {/* <LinkComponent linkList={}/> */}
            </div>
        </div>
    )
}
export default TestPage;