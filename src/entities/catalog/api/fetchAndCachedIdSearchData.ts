'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { GetPostDetailRequestBody, PostDetailResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования данных поиска по ID
 * получает id в виде строки на вход
 * получает данные с бэка и кэширует
 */

export const serverFetchAndCachedSearchId = async (body: GetPostDetailRequestBody): Promise<PostDetailResponse> => {
  cacheLife('minutes');
  cacheTag('id-search');

  try {
    const data = await catalogRequest.getIdData(body);
    return data;
  } catch (error) {
    console.error('Ошибка получения данных searchID: ${error}');
    throw error;
  }
};
