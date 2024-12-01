import React, { useEffect, useState } from 'react';
import FavoritesComponent from '../../components/Favorites';
import AddLinkComponent from '../../components/AddLink';
import { useNavigate } from 'react-router-dom';
import MyTopProfile from 'components/MyTopPrifile';
import { PiEnvelopeLight } from 'react-icons/pi';
import { Avatar, Badge } from 'antd';
import { getBuddyInvitation } from 'api/buddy';
import { getAccessKey } from 'utils/authStorage';
import { getMyInfo } from 'api/user';
import { UserOutlined } from '@ant-design/icons';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [invitationCount, setInvitationCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null); // 사용자 ID를 저장할 상태
  const [name, setName] = useState<string | null>(null);
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  const accessToken = getAccessKey(); // localStorage에서 accessToken 가져오기

  /** 사용자 정보 호출 */
  const fetchUserInfo = async () => {
    try {
      if (accessToken) {
        const user = await getMyInfo(); // API 호출
        setUserId(user.id); // 사용자 정보 상태에 저장
        setName(user.name);
        setImgUrl(user.imageUrl);
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getInvitationCount();
    fetchUserInfo(); // 컴포넌트 렌더링 후 사용자 정보 호출
  }, []); // 빈 배열로 한번만 호출

  /** 회원 사진 클릭 */
  const handleDetailClick = () => {
    navigate(`/user/${userId}`);
  };

  /** 편지봉투 클릭 (초대장) */
  const onClickEnvelope = () => {
    console.log('envelope open');
    navigate('/buddy/invitation');
  };

  /** 받은 초대장 개수 조회 */
  const getInvitationCount = async () => {
    const result = await getBuddyInvitation();
    console.log('result ????', result);
    const notAcceptList = result.filter((data) => {
      return data.acceptTf === false;
    });
    setInvitationCount(notAcceptList.length);
  };

  useEffect(() => {
    getInvitationCount();
  }, []);

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="flex flex-row justify-end gap-4">
        <Badge count={invitationCount} className="mt-1">
          <PiEnvelopeLight
            className="text-4xl text-neutral-600 cursor-pointer"
            onClick={onClickEnvelope}
          />
        </Badge>
        <div onClick={handleDetailClick} className="cursor-pointer">
          {imgUrl ? (
            <MyTopProfile imageUrl={imgUrl} />
          ) : (
            <Avatar
              size={40}
              src={undefined} // imgUrl이 없으면 undefined로 설정
              icon={<UserOutlined />} // imgUrl이 없을 경우 기본 아이콘 표시
            />
          )}
        </div>
      </div>

      <FavoritesComponent />
      <AddLinkComponent />
    </div>
  );
};

export default HomePage;
