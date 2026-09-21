'use cache';

import 'server-only';

import axios from 'axios';
import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { SubcategoryResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования подкатегорий на строне сервера
 * получает путь из запроса
 * плучает данные с бэка и кеширует на указанное в конфигурации время
 */

export const serverFethcAndCachedSubcategory = async (path: string): Promise<SubcategoryResponse> => {
  console.log('[CACHE CALL subcat]', { path });
  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  console.log('[normalizedPath]', normalizedPath);
  cacheTag(`subcategory-${normalizedPath}`);

  try {
    const data = await catalogRequest.getSubCategory(normalizedPath);
    return data;
  } catch (error) {
    // Пробрасываем реальные ошибки дальше. Next.js перехватит её и включит error.tsx
    console.error('Ошибка получения categories каталога');
    throw error;
  }
};
