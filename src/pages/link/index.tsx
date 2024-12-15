import { useEffect, useState } from 'react';
import FolderComponent from '../../components/Folder';
import FloatAddLinkBtn from '../../components/FloatAddLinkBtn';
import { SearchComponent } from 'components/Search';
import { Category } from 'types/Category';
import { createMyCategory, getMyCategoryList } from 'api/category';
import { Divider, Row, Typography } from 'antd';
import AddCategoryModal from 'components/modals/AddCategoryModal';

const MyLinkPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleNavigate = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAddFolder = (categoryName: string) => {
    console.log('New folder added:', categoryName);
    setIsModalOpen(false);
    // TODO: Implement API call to add the folder
  };
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryList = await getMyCategoryList();
        setCategories(categoryList);
      } catch (err) {
        setError('Failed to fetch categories.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4 relative">
      <div>
        <SearchComponent />
      </div>
      <Row justify={'end'}>
        <Typography.Text>
          <a onClick={handleNavigate}>+ 새 폴더</a>
        </Typography.Text>
      </Row>
      <Divider style={{ margin: '10px 0px' }} />
      <div className="flex flex-wrap justify-between ">
        {categories.map((category) => (
          <FolderComponent
            key={category.id}
            id={category.id}
            title={category.categoryName}
            count={category.linkCount}
          />
        ))}
      </div>
      <div
        className=" "
        style={{
          zIndex: 10, // 네비바보다 뒤에 위치하도록 설정
        }}
      >
        <FloatAddLinkBtn />
      </div>
      {isModalOpen && (
        <AddCategoryModal
          onClose={closeModal}
          onAdd={async (categoryName) => {
            handleAddFolder(categoryName);
            try {
              const newCategory = await createMyCategory(categoryName);
              //  window.location.reload();
              setCategories((prevCategories) => [
                ...prevCategories,
                { id: newCategory.id, categoryName, linkCount: 0 },
              ]); // 새 카테고리 추가
            } catch (error) {
              console.error('새폴더 추가 실패:', error); // 에러 처리
            }
          }}
        />
      )}
    </div>
  );
};

export default MyLinkPage;
