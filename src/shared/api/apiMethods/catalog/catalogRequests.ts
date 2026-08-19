import { apiWithInterceptors } from '../../configApi';
import type { BackendCategoryListItem, BackendMainCategory, MainCatalogResponse, FirstLevCategoryResponse } from './type';

/**
 * Объект в котором написаны функции запросов к бэку
 * для получения данных каталога
 */
export const catalogRequest = {
  /**
   * получаем категории для главного каталога
   * заголовки и ссылки первого уровня
   * @param path - эндпоинт '/posts/'
   */
  getMainCatalog: async (): Promise<BackendMainCategory[]> => {
    const { data } = await apiWithInterceptors.get<MainCatalogResponse>('/posts/');
    return data.categories;
  },

  /**
   * получить категории первого уровня
   * @param path - эндпоинт '/posts/${slug}'
   */

  getFirstLevelCateg: async (slug: string): Promise<BackendCategoryListItem[]> => {
    const { data } = await apiWithInterceptors.get<FirstLevCategoryResponse>(`/posts/${slug}`);
    return data.categories;
  },
};
