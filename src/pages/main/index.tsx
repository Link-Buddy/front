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
import { generateRandomColor } from 'utils/randomColor';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [invitationCount, setInvitationCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null); // 사용자 ID를 저장할 상태
  const [name, setName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string>(
    '/images/basicProfile.png'
  );
  const accessToken = getAccessKey(); // localStorage에서 accessToken 가져오기

  /** 사용자 정보 호출 */
  const fetchUserInfo = async () => {
    try {
      if (accessToken) {
        const user = await getMyInfo(); // API 호출
        setUserId(user.id); // 사용자 정보 상태에 저장
        setName(user.name);
        if (user.imageUrl) {
          setUserImage(user.imageUrl);
        }
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
      <FavoritesComponent />
      <AddLinkComponent />
    </div>
  );
};

export default HomePage;
