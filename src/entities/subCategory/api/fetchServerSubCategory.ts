import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

/**
 * Функция получения и кеширования подкатегорий на стороне сервера
 * получает путь из запроса
 * получает данные с бэка и кеширует на указанное в конфиге некст времени
 */

export const fetchServerSubcategory = async (path: string): Promise<BackendCategoryListItem[]> => {
  'use cache';

  cacheLife('minutes');

  const safeTag = path.replace(/\//g, '-'); // Тег кэша делаем уникальным, заменяя слеши на дефисы

  cacheTag(`category-${safeTag}`);

  try {
    const categories = await catalogRequest.getFirstLevelCateg(path);
    return categories;
  } catch (error) {
    console.error('Ошибка получения subcategories каталога');
    // Пробрасываем ошибку дальше. Next.js перехватит её и включит error.tsx
    throw error;
  }
};
