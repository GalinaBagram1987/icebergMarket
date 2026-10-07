import path from 'node:path';
import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse } from './type';
import type { SearchPostsRequestBody, SearchPostsResponse } from './type';
import type { GetPostDetailRequestBody, PostDetailResponse } from './type';

/**
 * Объект в котором написаны функции запросов к бэку
 * для получения данных каталога
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

    const requestPath = `posts/${path}`;

    console.log('[GET CATEGORY] path:', path);
    console.log('[GET CATEGORY] baseURL:', apiWithInterceptors.defaults.baseURL);
    console.log(
      '[GET CATEGORY] full URL:',
      apiWithInterceptors.getUri({
        method: 'GET',
        url: requestPath,
      }),
    );

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

    const requestPath = `posts/${path}`;

    console.log('[GET CATEGORY] path:', path);
    console.log('[GET CATEGORY] baseURL:', apiWithInterceptors.defaults.baseURL);
    console.log(
      '[GET CATEGORY] full URL:',
      apiWithInterceptors.getUri({
        method: 'GET',
        url: requestPath,
      }),
    );

    const { data } = await apiWithInterceptors.get<CategoryResponse>(`posts/${path}`);
    return data;
  },

  /**
   * Основной поисковой запрос
   * (POST /api/v1/posts/search)
   * @param {SearchPostsRequestBody} body - Объект с фильтрами (q, fil, sort, page, limit)
   * @returns {Promise<SearchPostsResponse>} Объект с количеством и массивом постов
   *@example
   * Обращение в коде
   * const { count, posts } = await catalogApi.getMainSearchData({ q: "колеса", limit: 20 });
   *
   * console.log(`Найдено объявлений: ${count}`);
   *
   * posts.map((post) => {
   *   post.id
   *   post.title
   *   post.price
   *   post.title_image
   *   post.author_name
   * });
   */

  getMainSearchData: async (body: SearchPostsRequestBody): Promise<SearchPostsResponse> => {
    // Предохранитель от системных запросов (возвращает пустую структуру по спецификации)
    const checkString = JSON.stringify(body);
    if (checkString.includes('favicon') || checkString.includes('.well-known')) {
      console.log('[AXIOS PREVENT] Заблокирован системный запрос к бэкенду:', body);
      return {
        count: 0,
        posts: [],
      };
    }
    const requestPath = `posts/search`;
    console.log('[SEARCH] Request Body:', body);
    console.log('[SEARCH] baseURL:', apiWithInterceptors.defaults.baseURL);
    console.log(
      '[SEARCH] full URL:',
      apiWithInterceptors.getUri({
        method: 'POST',
        url: requestPath,
      }),
    );
    const { data } = await apiWithInterceptors.post<SearchPostsResponse>(requestPath, body);
    return data;
  },

  /**
   * Поисковой запрос по ID
   * (POST /api/v1/posts/post/{post_id})
   *
   * @example
   * // Обращение
   * const postDetail = await catalogApi.getIdData({ post_id: "54321" });
   *
   * postDetail.title
   * postDetail.description
   * postDetail.images
   * postDetail.is_favourite
   *
   * Для интерактивной Яндекс.Карты (Разбор гео-координат):
   * postDetail.coordinates)Вернет строку формата POINT(43.1198 131.8869)
   *
   */

  getIdData: async (body: GetPostDetailRequestBody): Promise<PostDetailResponse> => {
    // Предохранитель от системных запросов (возвращает пустой валидный JavaScript-объект)
    if (body.post_id.includes('favicon') || body.post_id.includes('.well-known')) {
      console.log('[AXIOS PREVENT] Заблокирован системный запрос к бэкенду:', body.post_id);
      return {
        post_id: '',
        title: '',
        author_id: '',
        author: null,
        description: '',
        images: '',
        directory_name: '',
        posted_at: '',
        category_id: 0,
        price_list_name: '',
        coordinates: '',
        title_image: '',
        is_favourite: false,
      };
    }

    const requestPath = `/posts/post/${body.post_id}`;

    console.log('[POST DETAIL] ID:', body.post_id);
    console.log('[POST DETAIL] baseURL:', apiWithInterceptors.defaults.baseURL);
    console.log(
      '[POST DETAIL] full URL:',
      apiWithInterceptors.getUri({
        method: 'POST',
        url: requestPath,
      }),
    );
    const { data } = await apiWithInterceptors.post<PostDetailResponse>(requestPath, body);

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
