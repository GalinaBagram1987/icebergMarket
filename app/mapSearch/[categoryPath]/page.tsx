import { SearchMapPage } from '@/_pages/searchMap';
import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { Suspense } from 'react';

/**
 * тип для страницы-поиска для категорий
 */

type MapSearchCategPageProps = {
  params: Promise<{ categoryPath: string }>;
};

/**
 * По правилам некст данные нужно оборачивать
 * в Suspense
 * Выносим отдельно асинхронную логику запроса данных, формир страницы
 */
const MapSearchCategContent = async ({ params }: MapSearchCategPageProps) => {
  const { categoryPath } = await params;
  const cleanCategoryPath = categoryPath.replace('mapSearch', '');

  // Запрашиваем данные первого уровня с сервера
  const categoryData = await serverFetchAndCachedCategory(cleanCategoryPath);
  if (!categoryData || !categoryData.category) return null;

  return <SearchMapPage categoryPath={cleanCategoryPath} subcategoryPath={null} />;
};

/**
 * страница поиска для категорий
 */

const MapSearchCategPage = ({ params }: MapSearchCategPageProps) => {
  return (
    <Suspense>
      <MapSearchCategContent params={params} />
    </Suspense>
  );
};

export default MapSearchCategPage;
