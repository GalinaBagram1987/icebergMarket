import { connection } from 'next/server';

import type { Metadata } from 'next';
import { CategoryPage } from '@/_pages/category';
import { serverFetchAndCachedCategory } from '@/entities/catalog';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { Suspense } from 'react';
import { isCategoryResponse } from '@/entities/lib';
import { getTranslations } from 'next-intl/server';

/**
 * Тип для страницы категорий
 * примимает path. грузит метатеги и данные
 * searchParams - втроенная в некс фича - ловит изменения из поиска и добавляет в url
 */

type CategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
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

type MetadataCatProps = Pick<CategoryPageAppProps, 'params'>;

/**
 * Динамические метаданные страницы категории первого уровня.
 */

export const generateMetadata = async ({ params }: MetadataCatProps): Promise<Metadata> => {
  console.log('[PAGE] before await params');

  const { categoryPath } = await params;

  const path = categoryPath;
  const category = await serverFetchAndCachedCategory(path);

  if (!category) {
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
    // title: `${category.name} — Айсберг Маркет`,
    // description: `Товары и объявления в категории «${category.name}».`,
  };
};

/**
 * Для некс переносим асинхронную логику отдельно, чтобы потом обвернуть все в suspense
 */

const CategoryPageContent = async ({ params, searchParams }: CategoryPageAppProps) => {
  // живое соединение, чтобы Next.js сразу переключил роут в динамический режим
  await connection();

  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const t = await getTranslations('icebergMarket');
  // const [resolvedParams, resolvedSearchParams] = await Promise.all([params, searchParams]);

  const { categoryPath } = resolvedParams;

  const filterSegments: string[] = [];
  // проверяем какие условия есть в fill
  if (categoryPath) {
    filterSegments.push(`category_path=${categoryPath}`);
  }
  // Добавляем фильтры цены и состояния из URL адресной строки, если они выбраны
  if (resolvedSearchParams.priceFrom) filterSegments.push(`price_from=${resolvedSearchParams.priceFrom}`);
  if (resolvedSearchParams.priceTo) filterSegments.push(`price_to=${resolvedSearchParams.priceTo}`);
  if (resolvedSearchParams.isNew === 'true') filterSegments.push('status=new');
  if (resolvedSearchParams.isUsed === 'true') filterSegments.push('status=used');
  if (resolvedSearchParams.onlyWithPhoto === 'true') filterSegments.push('with_photo=true');

  const filterString = filterSegments.length > 0 ? filterSegments.join(';') : undefined;

  const categoryData = await serverFetchAndCachedCategory(categoryPath);
  const searchPostsResponse = await catalogRequest.getMainSearchData({
    q: resolvedSearchParams.q || '',
    fil: filterString,
    sort: resolvedSearchParams.sort || undefined,
    page: resolvedSearchParams.page || '1',
    limit: 20,
  });

  const safeCategoryData = isCategoryResponse(categoryData) ? categoryData : null;
  return <CategoryPage t={t} path={categoryPath} categoryData={safeCategoryData} postsData={searchPostsResponse} searchParams={resolvedSearchParams} />;
};

/**
 *
 * Динаминческая страница каталога первой категории
 * компонент страницы (дописать позже)
 * примимает path, формирует путь в браузере, подгружает страницу
 * Метаданные (title, description) заданы динамически на основании названия раздела
 *
 * Вносить изменения в бизнесс-логику в компонент /написать тут
 */

const CategoryPageApp = async ({ params, searchParams }: CategoryPageAppProps) => {
  return (
    <Suspense fallback={null}>
      <CategoryPageContent params={params} searchParams={searchParams} />
    </Suspense>
  );
};

export default CategoryPageApp;
