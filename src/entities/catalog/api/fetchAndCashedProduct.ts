'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования данныч продукта
 * получает id
 * получает данные с бэка и кеширует на указанное в конфиге некст
 */

export async function serverFetchAndCachedProduct(id: string): Promise<PostDetailResponse> {
  cacheLife('minutes');
  const normalizedId = id.replace(/^\/+|\/+$/g, '');
  cacheTag(`productId-${normalizedId}`);

  try {
    const data = await catalogRequest.getIdData({ post_id: normalizedId });
    return data;
  } catch (error) {
    console.log(`Ошибка получения data product по id каталога: ${error}`);
    throw error;
  }
}
