import { Metadata } from 'next';
import { Suspense } from 'react';
import { SubcategoryPage } from '@/_pages/subCategory';
import { serverFetchAndCachedCategory, serverFetchAndCachedMainSearch } from '@/entities/catalog';
import { buildFullPath } from '@/entities/lib';
import { isCategoryResponse } from '@/entities/lib';

/**
 * Тип для страницы покатегорий
 * примимает path.
 * для подкатегориий такого типа app/catalog/[categoryPath]/[...subcategoryPath]/page.tsx
 * некст возвращает основн строкой и далее объект
 */

type SubCategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
    subcategoryPath: string[];
  }>;
  // Все query-параметры из URL-строки всегда являются строками!
  searchParams: Promise<{
    // Фича Полнотекстового поиска
    q?: string;
    searchMode?: 'section' | 'global';

    // Фича Фильтрации
    priceFrom?: string;
    priceTo?: string;
    isNew?: string; // Прилетит строка "true" или "false"
    isUsed?: string; // Прилетит строка "true" или "false"
    onlyWithPhoto?: string; // Прилетит строка "true" или "false"

    // Фича Сортировки
    sort?: string;

    // Пагинация
    page?: string;
  }>;
};

/**
 * Динамические метаданные страницы подкатегории .
 */

export const generateMetadata = async ({ params, searchParams }: SubCategoryPageAppProps): Promise<Metadata> => {
  console.log('[PAGE] before await params');
  const resolvedParams = await params;
  const fullPath = buildFullPath(resolvedParams);
  const subcategoryData = await serverFetchAndCachedCategory(fullPath);
  const safeSubcategoryData = isCategoryResponse(subcategoryData) ? subcategoryData : null;
  if (!safeSubcategoryData) {
    return {
      title: 'Категория не найдена',
      description: 'Запрашиваемая категория не найдена.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    //   title: `${categories.name} — Айсберг Маркет`,
    //   description: `Товары и объявления в категории «${categories.name}».`,
  };
};

/**
 * Для некс переносим асинхронную логику отдельно, чтобы потом обвернуть все в suspense
 */

const SubCategoryPageContent = async ({ params, searchParams }: SubCategoryPageAppProps) => {
  const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);

  const fullPath = buildFullPath(resolvedParams);
  const filterSegments: string[] = [];
  // проверяем какие условия есть в fill
  if (resolvedSearchParams.searchMode !== 'global' && fullPath) {
    filterSegments.push(`category_path:${fullPath}`);
  }
  // Добавляем фильтры цены и состояния из URL адресной строки, если они выбраны
  if (resolvedSearchParams.priceFrom) filterSegments.push(`price_from:${resolvedSearchParams.priceFrom}`);
  if (resolvedSearchParams.priceTo) filterSegments.push(`price_to:${resolvedSearchParams.priceTo}`);
  if (resolvedSearchParams.isNew === 'true') filterSegments.push('status:new');
  if (resolvedSearchParams.isUsed === 'true') filterSegments.push('status:used');
  if (resolvedSearchParams.onlyWithPhoto === 'true') filterSegments.push('with_photo:true');

  const filterString = filterSegments.length > 0 ? filterSegments.join(';') : undefined;

  const [subcategoryData, searchPostsResponse] = await Promise.all([
    serverFetchAndCachedCategory(fullPath),
    serverFetchAndCachedMainSearch({
      q: resolvedSearchParams.q || '',
      fil: filterString,
      sort: resolvedSearchParams.sort || undefined,
      page: resolvedSearchParams.page || '1',
      limit: 20,
    }),
  ]);

  const safeSubcategoryData = isCategoryResponse(subcategoryData) ? subcategoryData : null;

  return <SubcategoryPage path={fullPath} subcategoryData={safeSubcategoryData} postsData={searchPostsResponse} searchParams={resolvedSearchParams} />;
};

/**
 *
 * Динаминческая страница каталога первой категории
 * компонент страницы (дописать позже)
 * примимает slug, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const SubCategoryPageApp = ({ params, searchParams }: SubCategoryPageAppProps) => {
  return (
    <Suspense fallback={null}>
      <SubCategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default SubCategoryPageApp;
