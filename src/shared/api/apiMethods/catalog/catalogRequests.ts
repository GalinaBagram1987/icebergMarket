import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse, SubcategoryResponse } from './type';

/**
 * Объект в котором написаны функции запросов к бэку
 * для получения данных каталога
 *
 */
export const catalogRequest = {
  /**
   * получаем категории для главного каталога
   * заголовки и ссылки первого уровня
   * @param path - эндпоинт '/posts/'
   * На данный момент каталог захардкоден
   * Запрос оставляю
   */

  getMainCatalog: async (): Promise<BackendCategory[]> => {
    const { data } = await apiWithInterceptors.get<MainCatalog>('posts/');
    return data.categories;
  },

  /**
   * Получить данные одной категории
   * @param path - эндпоинт '/posts/${path}/'
   * обращение  в компоненте
   * data.category.name - к данным категории
   * data.category.categories - массив детей если они есть
   */

  getCategory: async (path: string): Promise<CategoryResponse> => {
    const { data } = await apiWithInterceptors.get<CategoryResponse>(`posts/${path}`);
    return data;
  },

  /**
   * Получить данные одной подкатегории
   * @param path - эндпоинт '/posts/${path}/${path}'
   * обращение  в компоненте
   * data.category.name - к данным категории
   * data.categories - массив детей если они есть
   */

  getSubCategory: async (path: string): Promise<SubcategoryResponse> => {
    const { data } = await apiWithInterceptors.get<SubcategoryResponse>(`posts/${path}`);
    return data;
  },
};
