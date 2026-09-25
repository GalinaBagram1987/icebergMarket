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

type CatalogErrorResponse = {
  detail?: string;
};

/**
 * Константа текста ошибки листка
 */

const LEAF_CATEGORY_DETAIL = 'Cannot fetch subcategories for a leaf category. Use the search endpoint directly';

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
    // Делаем пустой массив на вывод листка, убираем его из ошибок
    if (axios.isAxiosError<CatalogErrorResponse>(error) && error.response?.status === 400 && error.response.data?.detail === LEAF_CATEGORY_DETAIL) {
      return {
        category: {
          id: 0,
          parent_id: null,
          name: '',
          slug: '',
          path: '',
          is_leaf: true,
          attributes: [],
        },
        categories: [], // Пустой массив, чтобы дочерний .map() не падал на клиенте
        hasError: true, // маркер, что произошел сбой
      };
    }
    // Пробрасываем реальные ошибки дальше. Next.js перехватит её и включит error.tsx
    const message = axios.isAxiosError(error) ? error.response?.data?.detail || error.message : 'Ошибка сети';
    console.error(`Ошибка получения subcategories каталога: ${message}`);
    throw new Error(message);
  }
};
