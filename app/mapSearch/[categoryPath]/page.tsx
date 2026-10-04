import { SearchMapPage } from '@/_pages/searchMap';

type MapSearchCategPageProps = {
  params: Promise<{ categoryPath: string }>;
};

const mapSearchCategPage = async ({ params }: MapSearchCategPageProps) => {
  const { categoryPath } = await params;

  // Запрашиваем данные первого уровня с сервера
  const categoryData = await serverFetchAndCachedCategory(categoryPath);
  if (!categoryData || !categoryData.category) return null;
   
  currentCategory={categoryData.category} 
      parentCategory={categoryData.category} // на 1-м уровне родитель совпадает с текущей
  return <SearchMapPage categoryPath={categoryPath} subcategoryPath={null} />;
};
