import { CategoryResponse } from '@/shared/api/apiMethods/catalog';

export const isCategoryResponse = (data: unknown): data is CategoryResponse => {
  return typeof data === 'object' && data !== null && 'category' in data && 'categories' in data;
};
