import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse, BackendCategoryItem } from './type';

/**
 * Объект в котором написаны функции запросов к бэку
 * для получения данных каталога
 *
 */
export const catalogRequest = {
  /**
   * Получить данные одной категории
   * @param path - эндпоинт '/posts/${path}/'
   * обращение  в компоненте
   * data.category.name - к данным категории
   * data.category.categories - массив детей если они есть
   */

  getCategory: async (path: string): Promise<CategoryResponse> => {
    // Предохранитель от системных запросов, возвращ путые данные с вашим типом CategoryResponse
    if (path.includes('favicon') || path.includes('.well-known')) {
      console.log('[AXIOS PREVENT] Заблокирован системный запрос к бэкенду:', path);
      return {
        category: {
          id: 0,
          parent_id: null,
          name: '',
          slug: '',
          path: '',
          is_leaf: true,
          attributes: [],
        },
        categories: [], // Пустой массив, чтобы дочерний .map() не падал на клиенте
      };
    }
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

  getSubCategory: async (path: string): Promise<CategoryResponse> => {
    // Предохранитель от системных запросов, возвращающий пустые данные под ваш тип SubcategoryResponse
    if (path.includes('favicon.ico') || path.includes('.well-known')) {
      console.log('[AXIOS PREVENT] Заблокирован системный запрос к бэкенду:', path);
      return {
        category: {
          id: 0,
          parent_id: null,
          name: '',
          slug: '',
          path: '',
          is_leaf: true,
          attributes: [],
        },
        categories: [], // Пустой массив, чтобы дочерний .map() не падал на клиенте
      };
    }

    const { data } = await apiWithInterceptors.get<CategoryResponse>(`posts/${path}`);
    return data;
  },

  // =======================================================

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
};
