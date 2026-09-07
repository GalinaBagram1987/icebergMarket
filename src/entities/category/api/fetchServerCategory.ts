import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования категорий на стороне сервера
 * получает путь из запроса
 * получает данные с бэка и кеширует на указанное в конфиге некст времени
 */

export const fetchServerCategory = async (slug: string): Promise<BackendCategoryListItem[]> => {
  'use cache';

  cacheLife('minutes');
  cacheTag(`category-${slug}`);

  try {
    const categories = await catalogRequest.getFirstLevelCateg(slug);
    return categories;
  } catch (error) {
    console.error('Ошибка получения categories каталога');
    // Пробрасываем ошибку дальше. Next.js перехватит её и включит error.tsx
    throw error;
  }
};
