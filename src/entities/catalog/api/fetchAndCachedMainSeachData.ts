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

export const serverFetchAndCachedMainSearch = async (body: SearchPostsRequestBody): Promise<SearchPostsResponse> => {
  cacheLife('minutes');

  cacheTag('category-main-search');

  try {
    const data = await catalogRequest.getMainSearchData(body);
    return data;
  } catch (error) {
    console.error('Ошибка получения данных search: ${error}');
    throw error;
  }
};
