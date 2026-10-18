import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse } from './type';
import type { SearchPostsRequestBody, SearchGetResponse } from './type';
import type { GetPostDetailRequestBody, PostDetailResponse } from './type';
import type { BackendGetItem } from './type';

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
    // =========================================================================
    // ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ КАТЕГОРИЙ — ИСПРАВЛЕНО
    // =========================================================================
    const useStub = true;

    if (useStub) {
      console.log('[MOCK GET CATEGORY] Возвращаем структуру категории для пути:', path);
      return {
        category: {
          id: 40,
          parent_id: null,
          name: 'Авто-мото',
          slug: 'avto-moto',
          path: 'avto-moto',
          is_leaf: false,
          attributes: [],
        },
        categories: [
          {
            id: 41,
            parent_id: 40,
            name: 'Шины и диски',
            slug: 'shiny-i-diski',
            path: 'avto-moto/shiny-i-diski',
            is_leaf: false,
            attributes: [],
          },
        ],
      };
    }
    // =========================================================================
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

    // =========================================================================
    // ВРЕМЕННАЯ ЗАГЛУШКА ДЛЯ ПОДКАТЕГОРИЙ — удалить, когда бэкенд заработает
    // =========================================================================
    const useStub = true;

    if (useStub) {
      console.log('[MOCK GET SUB-CATEGORY] Возвращаем заглушку для пути:', path);

      // Проверяем, насколько глубоко зашел пользователь
      if (path.includes('kolpaki')) {
        return {
          category: {
            id: 42,
            parent_id: 41,
            name: 'Колпаки',
            slug: 'kolpaki',
            path: 'avto-moto/shiny-i-diski/kolpaki',
            is_leaf: true, // это самый глубокий уровень
            attributes: [],
          },
          categories: [], // детей больше нет
        };
      }

      // По умолчанию считаем, что мы на уровне "avto-moto/shiny-i-diski"
      return {
        category: {
          id: 41,
          parent_id: 40,
          name: 'Шины и диски',
          slug: 'shiny-i-diski',
          path: 'avto-moto/shiny-i-diski',
          is_leaf: false,
          attributes: [],
        },
        categories: [
          {
            id: 42,
            parent_id: 41,
            name: 'Колпаки',
            slug: 'kolpaki',
            path: 'avto-moto/shiny-i-diski/kolpaki',
            is_leaf: true,
            attributes: [],
          },
        ],
      };
    }
    // =========================================================================

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
   * (GET /api/v1/get/search)
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

  getMainSearchData: async (body: SearchPostsRequestBody): Promise<SearchGetResponse> => {
    // =========================================================================
    // ВРЕМЕННАЯ ЗАГЛУШКА(MOCK) — удалить этот блок, когда бэкенд заработает.
    // =========================================================================
    const useStub = true;

    if (useStub) {
      const ALL_MOCK_POSTS = [
        {
          id: 'mock_avto_1',
          title: 'Дверь передняя правая',
          price: 15000,
          title_image: '/mockImg/1(1).png',
          category_id: 40,
          author_id: 'user_1',
          author_name: 'АвтоРазбор НСК',
          author_image: '/images/avatar-placeholder.jpg',
          attributes: {},
          date: 1718234800,
          views: 45,
          description: 'Оригинальная передняя правая дверь в отличном состоянии. Без вмятин и глубоких царапин. Подходит для моделей 2019-2023 годов.',
          path: 'avto-moto',
        },
        {
          id: 'mock_avto_2',
          title: 'Бампер передний',
          price: 8500,
          title_image: '/mockImg/1(2).png',
          category_id: 40,
          author_id: 'user_2',
          author_name: 'Дмитрий В.',
          author_image: '/images/avatar-placeholder.jpg',
          attributes: {},
          date: 1718321200,
          views: 112,
          description: 'Передний бампер, под покраску. Все крепления целые, трещин нет. Небольшие потертости по нижней кромке.',
          path: 'avto-moto',
        },
        {
          id: 'mock_shiny_1',
          title: 'Летние шины Michelin Primacy 4',
          price: 32000,
          title_image: '/mockImg/1(3).png',
          category_id: 41,
          author_id: 'user_3',
          author_name: 'Шинный Центр',
          author_image: '/images/avatar-placeholder.jpg',
          attributes: { size: 'R17' },
          date: 1718407600,
          views: 250,
          description: 'Комплект премиальных летних шин. Износ минимальный (один сезон). Отличное сцепление как на сухом, так и на мокром асфальте.',
          path: 'avto-moto/shiny-i-diski',
        },
      ];

      // =========================================================================
      // ИСПРАВЛЕННЫЙ УЗЕЛ ПАРСИНГА СТРОКИ С ДЕЛИМИТЕЛОМ СЕГМЕНТОВ ";"
      // =========================================================================
      const filParam = body.fil || '';
      let currentPath = '';

      if (filParam) {
        // Разрезаем общую строку фильтров по точке с запятой ";"
        // "category_path=avto-moto;price_from=10" -> ["category_path=avto-moto", "price_from=10"]
        const segments = filParam.split(';');

        // Ищем сегмент, который начинается со строки "category_path="
        const pathSegment = segments.find((seg) => seg.startsWith('category_path='));

        if (pathSegment) {
          // Вытаскиваем чистый путь после знака "="
          currentPath = pathSegment.split('=')[1] || '';
        }
      }

      // Фильтруем массив моков по чистому пути
      let filteredPosts = currentPath ? ALL_MOCK_POSTS.filter((post) => post.path === currentPath) : ALL_MOCK_POSTS;

      // Логика сортировки — КЛЮЧИ ТЕПЕРЬ СТРОГО СОВПАДАЮТ С ВАШИМ СЕЛЕКТОРОМ SortPost
      const currentSort = body.sort || 'date:asc';

      if (currentSort === 'price:asc') {
        filteredPosts.sort((a, b) => a.price - b.price); // Дешевле
      } else if (currentSort === 'price:desc') {
        filteredPosts.sort((a, b) => b.price - a.price); // Дороже
      } else if (currentSort === 'date:asc') {
        filteredPosts.sort((a, b) => a.date - b.date); // По дате
      }

      return {
        count: filteredPosts.length,
        posts: filteredPosts.map(({ path, ...postData }) => postData as BackendGetItem),
      };
    }
    // =========================================================================
    // THE END MOCK
    // =========================================================================

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
        method: 'GET',
        url: requestPath,
        params: body,
      }),
    );
    const queryString = `q=${encodeURIComponent(body.q || '')}&fil=${body.fil || ''}&page=${body.page || '1'}&limit=${body.limit || '20'}`;
    // Передаем параметры через объект { params: body }
    // Axios сам автоматически превратит объект в строку вида ?q=...&fil=...
    const { data } = await apiWithInterceptors.get<SearchGetResponse>(`${requestPath}?${queryString}`);

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
