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

export async function serverFetchAndCachedSearchId(body: GetPostDetailRequestBody): Promise<PostDetailResponse> {
  cacheLife('minutes');
  cacheTag('id-search');

  try {
    const data = await catalogRequest.getIdData(body);
    return data;
  } catch (error) {
    console.log(`Ошибка получения данных searchID: ${error}`);
    return {
      post_id: '',
      title: '',
      author_id: '',
      author: '',
      description: '',
      images: '',
      directory_name: '',
      posted_at: '',
      category_id: 0,
      price_list_name: '',
      coordinates: '',
      title_image: '',
      is_favourite: false,
    };
  }
}
