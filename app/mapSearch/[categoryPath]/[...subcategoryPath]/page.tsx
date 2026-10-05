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
  // map - показывает что это карта, но мешает путям. чистим его
  const allSegments = [categoryPath, ...(Array.isArray(subcategoryPath) ? subcategoryPath : [subcategoryPath])];
  console.log('[DEBUG MAP] Итоговый allSegments:', allSegments);
  const cleanSegments = allSegments.filter((segment) => segment !== 'mapSearch');
  console.log('[DEBUG MAP] Итоговый cleanSegments:', cleanSegments);
  const fullSubPath = cleanSegments.join('/');

  console.log('[DEBUG MAP] Итоговый чистый путь для бэка:', fullSubPath);

  if (!fullSubPath) return null;

  const subcategoryData = await serverFethcAndCachedSubcategory(fullSubPath);
  if (!subcategoryData || !subcategoryData.category) return null;

  // Распределяем чистые доменные данные для страницы сборки
  const cleanCategoryPath = cleanSegments[0]; // Первое слово (родитель)
  const cleanSubcategoryPath = cleanSegments.slice(1); // Весь массив для правильной работы лоадера крошек

  return <SearchMapPage categoryPath={cleanCategoryPath} subcategoryPath={cleanSubcategoryPath} />;
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
