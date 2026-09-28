import { CategoryResponse } from '@/shared/api/apiMethods/catalog';

export const isCategoryResponse = (data: unknown): data is CategoryResponse => {
  if (typeof data !== 'object') {
    return false;
  }

  if (data === null) {
    return false;
  }

  if (!('category' in data)) {
    return false;
  }

  if (!('categories' in data)) {
    return false;
  }

  return true;
};
