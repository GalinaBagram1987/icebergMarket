import { connection } from 'next/server';
import { Suspense } from 'react';

import type { Metadata } from 'next';
import { SearchPageCollector } from '@/_pages/searchPageCollector';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { getTranslations } from 'next-intl/server';

/**
 * Тип для страницы поиска
 * принимает парметры поиска
 */

type SearchPageAppProps = {
  searchParams: Promise<{
    q?: string;
    priceFrom?: string;
    priceTo?: string;
    isNew?: string;
    isUsed?: string;
    onlyWithPhoto?: string;
    sort?: string;
    page?: string;
  }>;
};

// Внутренний тип для прослойки SearchPageContent
type SearchPageContentProps = {
  path: string;
  searchParams: SearchPageAppProps['searchParams']; // Строго Promise!
};

/**
 * Динамические метаданные страницы поиска
 */

export const generateMetadata = async ({ searchParams }: SearchPageAppProps): Promise<Metadata> => {
  const resolvedSearchParams = await searchParams;
  const query = resolvedSearchParams.q || '';

  if (query.trim()) {
    return {
      title: `Поиск: ${query} | Айсберг Маркет`,
      description: `Результаты поиска объявлений по запросу ${query}.`,
      robots: { index: false, follow: true }, // Поиск закрываем от роботов
    };
  }

  // Дефолтные метаданные для пустой страницы поиска
  return {
    title: 'Поиск объявлений | Айсберг Маркет',
    description: 'Поиск товаров и объявлений на Айсберг Маркет.',
    robots: { index: false, follow: true },
  };
};

/**
 * Для некс переносим асинхронную логику отдельно, чтобы потом обвернуть все в suspense
 */

const SearchPageContent = async ({ path, searchParams }: SearchPageContentProps) => {
  // живое соединение, чтобы Next.js сразу переключил роут в динамический режим
  await connection();

  const resolvedSearchParams = await searchParams;

  const t = await getTranslations('icebergMarket');

  // Запрашиваем данные у бэка строго по вашей спецификации API
  const searchPostsResponse = await catalogRequest.getMainSearchData({
    q: resolvedSearchParams.q || '', // Текст поиска ("дверь", "машина"...)
    sort: resolvedSearchParams.sort || 'date:asc', // Сортировка ("Дешевле", "По дате")
    page: resolvedSearchParams.page || '1', // Номер страницы для пагинации
    limit: 20, // Ограничение на страницу
    fil: undefined, // Фильтров тут нет, бэк ищет по всей базе!
  });

  return <SearchPageCollector t={t} path={path} initialSearchData={searchPostsResponse} searchParams={resolvedSearchParams} />;
};

/**
 * Страница поиска по каталогу
 * принимает searchParams
 * Метаданные (title, description) заданы динамически
 *
 * Вносить изменения в бизнесс-логику в компонент SearchPageCollector
 */

const SearchPageApp = ({ searchParams }: SearchPageAppProps) => {
  return (
    <Suspense fallback={null}>
      <SearchPageContent path="search" searchParams={searchParams} />
    </Suspense>
  );
};
export default SearchPageApp;
