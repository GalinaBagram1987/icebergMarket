import axios from 'axios';
import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

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

export const serverFetchAndCashedCategory = async (path: string): Promise<BackendCategoryListItem[]> => {
  'use cache';

  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');
  cacheTag(`category-${normalizedPath}`);

  try {
    const categories = await catalogRequest.getCategories(normalizedPath);
    return categories;
  } catch (error) {
    // Делаем пустой массив на вывод листка, убираем его из ошибок
    if (axios.isAxiosError<CatalogErrorResponse>(error) && error.response?.status === 400 && error.response.data?.detail === LEAF_CATEGORY_DETAIL) {
      return [];
    }
    // Пробрасываем реальные ошибки дальше. Next.js перехватит её и включит error.tsx
    console.error('Ошибка получения categories каталога');
    throw error;
  }
};
