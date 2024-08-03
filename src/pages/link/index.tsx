import { Button, Typography } from "antd";
import { useNavigate } from "react-router-dom";

const LinkPage = () => {
    const navigate = useNavigate();

    const onClickDetail = () => {
        console.log('폴더 상세 이동')
        navigate(`/link/${1}`)    
    }

    return (
        <>
            <Typography.Title level={4}>내 링크</Typography.Title>
            <Button onClick={onClickDetail}>폴더 상세 이동</Button>
        </>
    )
}
export default LinkPage;