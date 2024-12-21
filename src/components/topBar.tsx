import { PiEnvelopeLight } from 'react-icons/pi';
import { Avatar, Badge } from 'antd';
import { useNavigate } from 'react-router-dom';
import MyTopProfile from 'components/MyTopPrifile';
import { getBuddyInvitation } from 'api/buddy';
import { useEffect, useState } from 'react';
import { getAccessKey } from 'utils/authStorage';
import { getMyInfo } from 'api/user';

const TopBar = () => {
  const navigate = useNavigate();
  const [invitationCount, setInvitationCount] = useState<number>(0);
  const [userId, setUserId] = useState<number | null>(null); // 사용자 ID를 저장할 상태
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

  /** 받은 초대장 개수 조회 */
  const getInvitationCount = async () => {
    const result = await getBuddyInvitation();
    const notAcceptList = result.filter((data) => data.acceptTf === false);
    setInvitationCount(notAcceptList.length);
  };

  useEffect(() => {
    getInvitationCount();
  }, []);

  /** 회원 사진 클릭 */
  const handleDetailClick = () => {
    navigate(`/user/${userId}`);
  };

  /** 편지봉투 클릭 (초대장) */
  const onClickEnvelope = () => {
    navigate('/buddy/invitation');
  };

  useEffect(() => {
    getInvitationCount();
  }, []);

  return (
    <div
      className="flex justify-end items-center gap-4 p-4 bg-white "
      style={{
        position: 'fixed', // 상단바 고정
        top: 0,
        paddingTop: '26px',
        width: '100%',
        maxWidth: '769px', // 전체 너비
        zIndex: 1000, // 다른 요소들보다 위에 배치
      }}
    >
      <Badge count={invitationCount} className="mt-1">
        <PiEnvelopeLight
          className="text-4xl text-neutral-600 cursor-pointer"
          onClick={onClickEnvelope}
        />
      </Badge>
      <div onClick={handleDetailClick} className="cursor-pointer">
        <MyTopProfile imageUrl={userImage} />
      </div>
    </div>
  );
};

export default TopBar;
