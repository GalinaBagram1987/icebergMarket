import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse } from './type';
import type { SearchPostsRequestBody, SearchGetResponse } from './type';
import type { GetPostDetailRequestBody, PostDetailResponse } from './type';
import type { BackendGetPost } from './type';
import type { CategoryBackendRequest } from './type';

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

      // 1. ИСПРАВЛЕННЫЙ УЗЕЛ ПАРСИНГА СТРОКИ С ДЕЛИМИТЕЛОМ СЕГМЕНТОВ ";"
      const filParam = body.fil || '';
      let currentPath = '';

      if (filParam) {
        const segments = filParam.split(';');
        const pathSegment = segments.find((seg) => seg.startsWith('category_path='));
        if (pathSegment) {
          currentPath = pathSegment.split('=')[1] || '';
        }
      }

      // Фильтруем по тексту поиска q, если он передан (имитация полнотекстового поиска)
      const searchQuery = (body.q || '').trim().toLowerCase();
      let searchedPosts = ALL_MOCK_POSTS;

      if (searchQuery) {
        searchedPosts = ALL_MOCK_POSTS.filter((post) => post.title.toLowerCase().includes(searchQuery) || post.description.toLowerCase().includes(searchQuery));
      }

      // 2. ДИНАМИЧЕСКИЙ РАСЧЕТ КАТЕГОРИЙ для плашек до фильтрации по самой категории
      // Это позволяет видеть, сколько всего совпадений по тексту q есть в других разделах
      const categoryMap: Record<number, { name: string; slug: string; count: number }> = {
        40: { name: 'Авто-мото', slug: 'avto-moto', count: 0 },
        41: { name: 'Шины и диски', slug: 'avto-moto/shiny-i-diski', count: 0 },
      };

      searchedPosts.forEach((post) => {
        if (categoryMap[post.category_id]) {
          categoryMap[post.category_id].count += 1;
        }
      });

      const mockCategories: CategoryBackendRequest[] = Object.entries(categoryMap)
        .filter(([_, value]) => value.count > 0) // Выводим только те, где что-то нашлось
        .map(([id, value]) => ({
          id: id,
          name: value.name,
          slug: value.slug,
          count: value.count,
        }));

      // Фильтруем массив моков по выбранному пути категории
      let filteredPosts = currentPath ? searchedPosts.filter((post) => post.path === currentPath) : searchedPosts;

      // Логика сортировки — КЛЮЧИ ТЕПЕРЬ СТРОГО СОВПАДАЮТ С ВАШИМ СЕЛЕКТОРОМ SortPost
      const currentSort = body.sort || 'date:asc';

      if (currentSort === 'price:asc') {
        filteredPosts.sort((a, b) => a.price - b.price);
      } else if (currentSort === 'price:desc') {
        filteredPosts.sort((a, b) => b.price - a.price);
      } else if (currentSort === 'date:asc') {
        filteredPosts.sort((a, b) => a.date - b.date);
      }

      // Возвращаем итоговый полный контракт SearchGetResponse
      return {
        count: filteredPosts.length,
        categories: mockCategories, // Передаем сформированные категории для плашек
        posts: filteredPosts.map(({ path, ...postData }) => postData as BackendGetPost),
      };
    }
    // =========================================================================
    // THE END MOCK
    // =========================================================================

    // Предохранитель от системных запросов (возвращает пустую структуру по новой спецификации)
    const checkString = JSON.stringify(body);
    if (checkString.includes('favicon') || checkString.includes('.well-known')) {
      console.log('[AXIOS PREVENT] Заблокирован системный запрос к бэкенду:', body);
      return {
        count: 0,
        categories: [],
        posts: [],
      };
    }

    const requestPath = `posts/search`;
    console.log('[SEARCH] Request Body:', body);

    const queryString = `q=${encodeURIComponent(body.q || '')}&fil=${body.fil || ''}&page=${body.page || '1'}&limit=${body.limit || '20'}`;

    // Передаем параметры, типизированные под обновленный SearchGetResponse
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
