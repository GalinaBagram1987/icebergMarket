'use cache';

import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { CategoryResponse } from '@/shared/api/apiMethods/catalog';

export const serverFethcAndCachedSubcategory = async (path: string): Promise<CategoryResponse> => {
  cacheLife('minutes');
  const normalizedPath = path.replace(/^\/+|\/+$/g, '');

  cacheTag(`subcategory-${normalizedPath}`);

  try {
    const data = await catalogRequest.getSubCategory(normalizedPath);
    return data;
  } catch (error) {
    console.error(`Ошибка получения subcategories каталога: ${error}`);
    throw error;
  }
};
