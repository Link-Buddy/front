# Link-Buddy (링크 버디)
<p align="center">
  <img width="30%" alt="logo_main" src="https://github.com/user-attachments/assets/93591328-14c9-4344-885c-8a4b1a71782c">
</p>

## 📚 Repository
* Backend: [Link-Buddy/back](https://github.com/Link-Buddy/back)

## Frontend

### Frontend 사용기술
- Framework/Language

![React](https://img.shields.io/badge/React-%2361DAFB.svg?style=for-the-badge&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Ant Design](https://img.shields.io/badge/Ant%20Design-%230170FE.svg?style=for-the-badge&logo=ant-design&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

- UI

![Ant Design](https://img.shields.io/badge/Ant%20Design-%230170FE.svg?style=for-the-badge&logo=ant-design&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Frontend 폴더구조
```bash
/src
  ├── /assets
  │   └── /images  #이미지, 폰트, 아이콘 등의 정적 파일
  ├── /components  # 재사용 가능한 UI 컴포넌트
  │   └── /layout 
  │   └── /button
  │   └── /card
  ├── /hooks      # 커스텀 훅
  ├── /pages      # 페이지별 컴포넌트
  ├── /utils      # 유틸리티 함수
  ├── /styles     # 스타일링 파일
  ├── /api        # API 호출 관련 로직
  ├── /routes     # 라우팅 설정
  ├── /types      # 타입 정의
  ├── /store      # React Context API
  ├── /lib        # 프로젝트 공통 로직
  └── App.js
```

### Frontend 주요기능
1. 홈
   - 즐겨찾기
   - 오늘의 링크 추가
     - 링크 추가일마다 링크 추가 도장 표시
    <p align="center">
      <img width="40%" alt="main" src="https://github.com/user-attachments/assets/14584277-035b-4e3d-90ce-c59c98cbc947">
    </p>
    
  - 검색
    <p align="center">
      <img width="40%" alt="search" src="https://github.com/user-attachments/assets/a2f19045-495e-4cc3-967c-12671d614d23">
    </p>

2. 유저
   - 일반 회원가입 → 로그인 & 간편로그인 (구글, 네이버)
     <p align="center">
      <img width="40%" alt="login" src="https://github.com/user-attachments/assets/fd6d6238-c31f-41e6-819b-4befb01d0356">
      <img width="40%" alt="social" src="https://github.com/user-attachments/assets/fb7ced33-1f7d-403f-bc55-682187b55a0f">
    </p>

   - 등록/즐겨찾기/최근본링크
    <p align="center">
      <img width="40%" alt="recently" src="https://github.com/user-attachments/assets/0d3a8765-5f31-4630-a0bc-4535c2bab112">
      <img width="40%" alt="myinfo" src="https://github.com/user-attachments/assets/468aaf19-8660-4e97-92be-1af634ee1fee">
    </p>

3. 버디링크
   - 친구 초대
     <p align="center">
      <img width="40%" alt="invite2" src="https://github.com/user-attachments/assets/d6429016-db8b-431a-bb25-de479c6640c8">
    </p>
    
   - 버디 설정
     <div style="display: flex; gap: 40px; justify-content: center;">
      <img alt="buddy1" src="https://github.com/user-attachments/assets/d4aef135-b6a8-4033-8a83-fdcc8cfbb01b" style="width: 40%;">
      <img alt="buddy2" src="https://github.com/user-attachments/assets/aa4986f4-48f4-4af4-bf6b-4f10f8303fef" style="width: 45%;">
    </div>

4. 내 링크
   - 링크
     <p align="center">
      <img width="40%" alt="link_add" src="https://github.com/user-attachments/assets/894ba6fe-4aa7-4f7c-a870-509030d21f60">
      <img width="40%" alt="link_add" src="https://github.com/user-attachments/assets/05b2af93-d53f-4a22-b702-46481b72e9c3">
    </p>
    
   - 즐겨찾기
      <p align="center">
        <img width="40%" alt="favorite" src="https://github.com/user-attachments/assets/9c827da1-753a-41d9-8632-4feffe4abf56">
      </p>
   - 폴더(카테고리) 
     <p align="center">
      <img width="40%" alt="add_category" src="https://github.com/user-attachments/assets/b2dabd28-1639-40e7-b59c-7c693b556e12">
      <img width="40%" alt="link_move" src="https://github.com/user-attachments/assets/695a5b7b-f984-4544-a7f0-495ee7dd433c">
    </p>
