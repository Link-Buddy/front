// import { Link } from '../types/Link';

const API_BASE_URL = 'http://localhost:8080';

export const GetMyLinkByLinkId = async (linkId: number): Promise<any> => {
  try {
    const response = await fetch(`${API_BASE_URL}/link/${linkId}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data: any = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching links: ${error}`);
    throw error;
  }
};

//TODO : 만들어야 함
// export const GetMyLinkByCategoryId = async (): Promise<any> => {
//   const { accessKey } = useAuth(); // useAuth 훅에서 accessKey를 가져옵니다.
//   if (!accessKey) {
//     throw new Error('Unauthorized: Access key is missing.');
//   }

//   try {
//     const response = await fetch(`${API_BASE_URL}/links`);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     const data: any = await response.json();
//     return data;
//   } catch (error) {
//     console.error('Error fetching links:', error);
//     throw error;
//   }
// };
