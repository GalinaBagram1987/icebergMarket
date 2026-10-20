import type { SearchGetResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Тип для строки поиска
 * Сырые параметры из url пришедшие на
 * страницу сборки поииска
 */

export type SearchPageCollectorRawSearchParams = {
  q?: string;
  priceFrom?: string;
  priceTo?: string;
  isNew?: string;
  isUsed?: string;
  onlyWithPhoto?: string;
  sort?: string;
  page?: string;
};

/**
 * Общий тип для страницы сборки поиска
 */

export type SearchPageCollectorProps = {
  path: string;
  searchParams: SearchPageCollectorRawSearchParams; // сырые парметры
  initialSearchData: SearchGetResponse; // ответ бэка
};
