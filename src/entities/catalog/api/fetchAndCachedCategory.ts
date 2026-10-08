'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { CategoryResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования категорий на стороне сервера
 * получает путь из запроса
 * получает данные с бэка и кеширует на указанное в конфиге некст времени
 */

export async function serverFetchAndCachedCategory(path: string): Promise<CategoryResponse> {
  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  cacheTag(`category-${normalizedPath}`);

  try {
    const data = await catalogRequest.getCategory(normalizedPath);
    return data;
  } catch (error) {
    console.error(`Ошибка получения categories каталога: ${error}`);
    throw error;
  }
}
