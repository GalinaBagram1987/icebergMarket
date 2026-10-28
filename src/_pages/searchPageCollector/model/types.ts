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
  categoryPath?: string;
};

/**
 * Общий тип для страницы сборки поиска
 */

export type SearchPageCollectorProps = {
  path: string;
  searchParams: SearchPageCollectorRawSearchParams; // сырые парметры
  initialSearchData: SearchGetResponse; // ответ бэка
  t: (key: string) => string;
};

// SearchGetResponse
// count: number;
//   categories: {
//     [key: string]: {
//       id: number;
//       name: string;
//       slug: string;
//       path: string;
//       count: number;
//     };
//   };
//   posts: {
//     id: string;
//     title: string;
//     price: number;
//     date: string;
//     title_image: string;
//     category_id: number;
//     description: string;
//     author_id: string;
//     author_name: string;
//     author_image: string;
//     attributes: any[];
//     views: number;
//   }[];
