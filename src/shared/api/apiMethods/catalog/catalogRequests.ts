import { apiWithInterceptors } from '../../configApi';
import type { BackendCategoryListItem, BackendCategoryListResponse } from './type';

/**
 * Объект в котором написаны функции запросов к бэку
 * для получения данных каталога
 */
export const catalogRequest = {
  /**
   * получить корневые категории
   * @param path - эндпоинт '/posts/'
   */
  getRootCategories: async (): Promise<BackendCategoryListItem[]> => {
    const { data } = await apiWithInterceptors.get<BackendCategoryListResponse>('/posts/');
    return data.categories;
  },

  /**
   * получить категории первого уровня
   */

  getChildren: async (slug: string): Promise<BackendCategoryListItem[]> => {
    const { data } = await apiWithInterceptors.get<BackendCategoryListResponse>(`/posts/${slug}`);
    return data.categories;
  },
};
