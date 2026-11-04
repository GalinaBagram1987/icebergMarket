import { SearchMapPage } from '@/_pages/searchMap';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { Suspense } from 'react';

/**
 * тип для страницы-поиска для категорий
 */

type MapSearchCategPageProps = {
  params: Promise<{ categoryPath: string }>;
  searchParams: Promise<{ query?: string; categoryId?: string }>;
};

/**
 * По правилам некст данные нужно оборачивать
 * в Suspense
 * Выносим отдельно асинхронную логику запроса данных, формир страницы
 */
const MapSearchCategContent = async ({ params, searchParams }: MapSearchCategPageProps) => {
  const { categoryPath } = await params;
  const { query, categoryId } = await searchParams;
  const cleanCategoryPath = categoryPath.replace('mapSearch', '');

  const pathSegments = cleanCategoryPath.split('/').filter(Boolean);
  const currentSlug: string = pathSegments[pathSegments.length - 1] || '';

  const searchResponse = await catalogRequest.getMainSearchData({
    category: {
      slug: currentSlug,
      path: cleanCategoryPath,
    },
    q: query || '',
  });

  if (!searchResponse) return null;
  // Ищем категорию, чей slug или path соответствует текущему cleanCategoryPath
  const matchedCategory = Object.values(searchResponse.categories).find((cat) => cat.slug === cleanCategoryPath || cleanCategoryPath.endsWith(cat.slug));
  const activeCategoryId = categoryId || (matchedCategory ? String(matchedCategory.id) : undefined) || Object.keys(searchResponse.categories)[0];

  return <SearchMapPage searchResponse={searchResponse} activeCategoryId={activeCategoryId} searchQuery={query} />;
};

/**
 * страница поиска для категорий
 */

const MapSearchCategPage = ({ params, searchParams }: MapSearchCategPageProps) => {
  return (
    <Suspense>
      <MapSearchCategContent params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default MapSearchCategPage;
