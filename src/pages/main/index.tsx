import React, { useEffect, useState } from 'react';
import FavoritesComponent from '../../components/Favorites';
import AddLinkComponent from '../../components/AddLink';
import { useNavigate } from 'react-router-dom';
import MyTopProfile from 'components/MyTopPrifile';
import { PiEnvelopeLight } from "react-icons/pi";
import { Badge } from 'antd';
import { getBuddyInvitation } from 'api/buddy';

const HomePage: React.FC = () => {
  const userId = 1;
  const navigate = useNavigate();
  const [invitationCount, setInvitationCount] = useState<number>(0);

  /** 회원 사진 클릭 */
  const handleDetailClick = () => {
    navigate(`/user/${userId}`);
  };

  /** 편지봉투 클릭 (초대장) */
  const onClickEnvelope = () => {
    console.log('envelope open')
    navigate('/buddy/invitation');
  }

  /** 받은 초대장 개수 조회 */
  const getInvitationCount = async () => {
    const result = await getBuddyInvitation();
    console.log('result ????', result);
    const notAcceptList = result.filter((data) => {
      return data.acceptTf === false
    });
    setInvitationCount(notAcceptList.length);
  }

  useEffect(() => {
    getInvitationCount();
  }, [])

  return (
    <div className="max-w-screen-md mx-auto p-4">
      <div className="flex flex-row justify-end gap-4">
        <Badge count={invitationCount} className='mt-1'>
      <PiEnvelopeLight className="text-4xl text-neutral-600 cursor-pointer" onClick={onClickEnvelope}/>
        </Badge>
      <div onClick={handleDetailClick} className='cursor-pointer'>
        <MyTopProfile userId={1} imgSrc="/images/bopul_1.jpg"/>
      </div>
      </div>

      <FavoritesComponent />
      <AddLinkComponent />
    </div>
  );
};

export default HomePage;
