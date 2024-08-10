import React from 'react';
import FolderComponent from '../../components/Folder';
import FloatAddLinkBtn from '../../components/FloatAddLinkBtn';
import { SearchComponent } from 'components/Search';

const MyLinkPage: React.FC = () => {
  return (
    <div className="p-4 relative">
      <div>
        <SearchComponent />
      </div>
      <div className="flex flex-wrap justify-between ">
        <FolderComponent id={1} title="여행" count={5} />
        <FolderComponent id={2} title="폴더 2" count={3} />
        <FolderComponent id={3} title="폴더 3" count={8} />
        <FolderComponent id={4} title="폴더 4" count={2} />
      </div>
      <div
        className=" "
        style={{
          zIndex: 10, // 네비바보다 뒤에 위치하도록 설정
        }}
      >
        <FloatAddLinkBtn />
      </div>
    </div>
  );
};

export default MyLinkPage;
