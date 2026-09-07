import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

export const fetchServerCategory = async (path: string): Promise<BackendCategoryListItem[]> => {
  'use cache';

  cacheLife('minutes');

  const safeTag = path.replace(/\//g, '-'); // Тег кэша делаем уникальным, заменяя слеши на дефисы

  cacheTag(`category-${safeTag}`);

  const categories = await catalogRequest.getFirstLevelCateg(path);
  return categories;
};
