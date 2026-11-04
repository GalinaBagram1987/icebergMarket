import { SearchMapPage } from '@/_pages/searchMap';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { Suspense } from 'react';
/**
 * тип для страницы поиска  по карте для подкатегорий
 */

type SearchMapSubcategProps = {
  params: Promise<{
    categoryPath: string;
    subcategoryPath: string[];
  }>;
  searchParams: Promise<{ query?: string; categoryId?: string }>;
};

/**
 * По правилам некст данные нужно оборачивать
 * в Suspense
 * Выносим отдельно асинхронную логику запроса данных, формир страницы
 */

const MapSubcategContent = async ({ params, searchParams }: SearchMapSubcategProps) => {
  const { categoryPath, subcategoryPath } = await params;
  const { query, categoryId } = await searchParams;

  // Собираем все сегменты в один массив и очищаем от технического префикса 'mapSearch'
  const allSegments = [categoryPath, ...(Array.isArray(subcategoryPath) ? subcategoryPath : [subcategoryPath])];
  const cleanSegments = allSegments.filter((segment) => segment !== 'mapSearch');

  // Полный путь для бэкенда (например, "cars/legkovye/sedany")
  const fullSubPath = cleanSegments.join('/');

  if (!fullSubPath) return null;

  // Последний сегмент — это текущий активный слаг подкатегории (например, "sedany")
  const currentSlug: string = cleanSegments[cleanSegments.length - 1] || '';

  // ДЕЛАЕМ ОДИН ГЛАВНЫЙ ЗАПРОС ПОИСКА
  const searchResponse = await catalogRequest.getMainSearchData({
    category: {
      slug: currentSlug,
      path: fullSubPath,
    },
    q: query || undefined, // Используем 'q' в соответствии с типом бэкенда
  });

  if (!searchResponse) return null;

  // Ищем совпадение подкатегории по слагу в ответе бэкенда
  const matchedCategory = Object.values(searchResponse.categories).find((cat) => cat.slug === currentSlug);

  // Определяем ID активной категории (приоритет: URL -> найденный слаг -> первый ключ словаря)
  const activeCategoryId = categoryId || (matchedCategory ? String(matchedCategory.id) : undefined) || Object.keys(searchResponse.categories)[0];

  return <SearchMapPage searchResponse={searchResponse} activeCategoryId={activeCategoryId} searchQuery={query} />;
};

/**
 * страницa поиска по карте для подкатегорий
 */

const mapSearchSubcategoryPage = ({ params, searchParams }: SearchMapSubcategProps) => {
  return (
    <Suspense fallback={null}>
      <MapSubcategContent params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default mapSearchSubcategoryPage;
