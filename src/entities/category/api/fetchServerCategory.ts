import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

export const fetchServerCategory = async (slug: string): Promise<BackendCategoryListItem[]> => {
  'use cache';

  cacheLife('minutes');
  cacheTag(`category-${slug}`);

  const categories = await catalogRequest.getFirstLevelCateg(slug);
  return categories;
};
