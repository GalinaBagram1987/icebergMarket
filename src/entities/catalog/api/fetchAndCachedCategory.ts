'use cache';

import 'server-only';

import axios from 'axios';
import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { CategoryResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Листок проходит через ошибку.
 * Но это не ошибка, а констатация факта, что тут нет подкатегорий
 * Для верного использования далее ошибку эту надо вернуть как пустой массив
 * Общий тип для ошибки
 */

type CatalogErrorResponse = {
  detail?: string;
};

/**
 * Константа текста ошибки листка
 */

const LEAF_CATEGORY_DETAIL = 'Cannot fetch subcategories for a leaf category. Use the search endpoint directly';

/**
 * Функция получения и кеширования категорий на стороне сервера
 * получает путь из запроса
 * получает данные с бэка и кеширует на указанное в конфиге некст времени
 */

export const serverFetchAndCachedCategory = async (path: string): Promise<CategoryResponse | {}> => {
  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  cacheTag(`category-${normalizedPath}`);

  try {
    const data = await catalogRequest.getCategory(normalizedPath);
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
    console.error(`Ошибка получения categories каталога: ${message}`);
    throw new Error(message);
  }
};
