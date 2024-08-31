import React, { useEffect, useState } from 'react';
import FolderComponent from '../../components/Folder';
import FloatAddLinkBtn from '../../components/FloatAddLinkBtn';
import { SearchComponent } from 'components/Search';
import { Category } from 'types/Category';
import { getMyCategoryList } from 'api/category';

const MyLinkPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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
    </div>
  );
};

export default MyLinkPage;
