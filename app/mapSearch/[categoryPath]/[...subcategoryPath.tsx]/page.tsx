import { SearchMapPage } from '@/_pages/searchMap';
import { serverFethcAndCachedSubcategory } from '@/entities/catalog/api/fetchAndCashedSubcategory';
import { Suspense } from 'react';
/**
 * тип для страницы поиска  по карте для подкатегорий
 */

type SearchMapSubcategProps = {
  params: Promise<{
    categoryPath: string;
    subcategoryPath: string[];
  }>;
};

/**
 * По правилам некст данные нужно оборачивать
 * в Suspense
 * Выносим отдельно асинхронную логику запроса данных, формир страницы
 */

const MapSubcategContent = async ({ params }: SearchMapSubcategProps) => {
  const { categoryPath, subcategoryPath } = await params;

  const fullSubPath = `${categoryPath}/${subcategoryPath.join('/')}`;

  const subcategoryData = await serverFethcAndCachedSubcategory(fullSubPath);
  if (!subcategoryData || !subcategoryData.category) return null;

  return <SearchMapPage categoryPath={categoryPath} subcategoryPath={subcategoryPath} />;
};

/**
 * тип страницы поиска по карте для подкатегорий
 */

const mapSearchSubcategoryPage = ({ params }: SearchMapSubcategProps) => {
  return (
    <Suspense fallback={null}>
      <MapSubcategContent params={params} />
    </Suspense>
  );
};

export default mapSearchSubcategoryPage;
