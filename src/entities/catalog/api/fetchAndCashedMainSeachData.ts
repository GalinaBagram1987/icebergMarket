'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { SearchPostsResponse, SearchPostsRequestBody } from '@/shared/api/apiMethods/catalog/type';

/**
 * Функция получения и кеширования данных поиска
 * получает тело поиска в запрос
 * получает данные с бэка и кэширует
 */

export const fetchAndCachedMainCategory = async (body: SearchPostsRequestBody): Promise<SearchPostsResponse> => {
  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  cacheTag(`category-${normalizedPath}`);

  try {
    const data = await catalogRequest.getMainSearchData(body);
    return data;
  } catch (error) {
    console.error('Ошибка получения данных search: ${error}');
  }
};
