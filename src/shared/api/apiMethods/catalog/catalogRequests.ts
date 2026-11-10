import { apiWithInterceptors } from '../../configApi';
import type { BackendCategory, MainCatalog, CategoryResponse } from './type';
import type { SearchPostsRequestBody, SearchGetResponse } from './type';
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
   * (GET /api/v1/posts/search)
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
      // 1. Моки строго по типу SearchGetResponse['posts']
      const ALL_MOCK_POSTS: SearchGetResponse['posts'] = [
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
          date: '1718234800', // строка
          views: 45,
          description: 'Оригинальная передняя правая дверь в отличном состоянии. Без вмятин и глубоких царапин. Подходит для моделей 2019-2023 годов.',
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
          date: '1718321200',
          views: 112,
          description: 'Передний бампер, под покраску. Все крепления целые, трещин нет. Небольшие потертости по нижней кромке.',
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
          date: '1718407600',
          views: 250,
          description: 'Комплект премиальных летних шин. Износ минимальный (один сезон). Отличное сцепление как на сухом, так и на мокром асфальте.',
        },
      ];

      // 2. Парсинг фильтров
      const filParam = body.fil || '';
      let currentPath = '';

      if (filParam) {
        const segments = filParam.split(';');
        const pathSegment = segments.find((seg) => seg.startsWith('category_path='));
        if (pathSegment) {
          currentPath = pathSegment.split('=')[1] || '';
        }
      }

      const searchQuery = (body.q || '').trim().toLowerCase();
      let searchedPosts = ALL_MOCK_POSTS;

      if (searchQuery) {
        searchedPosts = ALL_MOCK_POSTS.filter((post) => post.title.toLowerCase().includes(searchQuery) || post.description.toLowerCase().includes(searchQuery));
      }

      // 3. Расчет категорий
      const categoryMap: Record<number, { name: string; slug: string; count: number }> = {
        40: { name: 'Авто-мото', slug: 'avto-moto', count: 0 },
        41: { name: 'Шины и диски', slug: 'avto-moto/shiny-i-diski', count: 0 },
      };

      searchedPosts.forEach((post) => {
        if (categoryMap[post.category_id]) {
          categoryMap[post.category_id].count += 1;
        }
      });

      // 4. Формируем categories как объект (согласно SearchGetResponse)
      const categoriesObject: SearchGetResponse['categories'] = {};
      Object.entries(categoryMap)
        .filter(([_, value]) => value.count > 0)
        .forEach(([id, value]) => {
          categoriesObject[id] = {
            id: Number(id),
            name: value.name,
            slug: value.slug.split('/').pop() || '',
            path: value.slug,
            count: value.count,
          };
        });

      // 5. Фильтрация по категории (используем category_id вместо отсутствующего path)
      let filteredPosts = searchedPosts;
      if (currentPath === 'avto-moto') {
        filteredPosts = searchedPosts.filter((p) => p.category_id === 40);
      } else if (currentPath === 'avto-moto/shiny-i-diski') {
        filteredPosts = searchedPosts.filter((p) => p.category_id === 41);
      }

      // 6. Сортировка
      const currentSort = body.sort || 'date:asc';
      if (currentSort === 'price:asc') {
        filteredPosts.sort((a, b) => Number(a.price) - Number(b.price));
      } else if (currentSort === 'price:desc') {
        filteredPosts.sort((a, b) => Number(b.price) - Number(a.price));
      } else if (currentSort === 'date:asc') {
        filteredPosts.sort((a, b) => Number(a.date) - Number(b.date));
      }

      return {
        count: filteredPosts.length,
        categories: categoriesObject,
        posts: filteredPosts,
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
        categories: {},
        posts: [],
      };
    }

    const requestPath = `posts/search`;
    console.log('[SEARCH] Request Body:', body);

    const params = new URLSearchParams();

    if (body.q && body.q.trim() !== '') {
      params.append('q', body.q.trim());
    }

    // Локальные переменные для очистки данных
    let finalCategoryPath = body.category?.path || '';
    let finalFil = body.fil || '';

    //  если в fil по ошибке пришла категория
    if (finalFil.includes('category_path=')) {
      // Вытаскиваем значение категории из строки вида "category_path=avto-moto;other=1" или "category_path=avto-moto"
      const match = finalFil.match(/category_path=([^;&]+)/);
      if (match && match[1]) {
        finalCategoryPath = decodeURIComponent(match[1]);
      }
      // Удаляем category_path из строки fil, чтобы не ломать бэкенд знаком "="
      finalFil = finalFil.replace(/category_path=[^;&]+(;?)/g, '').replace(/^;|;$/, ''); // убираем лишние точки с запятой
    }

    // Добавляем категорию в выделенный параметр category
    if (finalCategoryPath) {
      params.append('category', finalCategoryPath);
    }

    //  Добавляем остальные фильтры в fil, если они остались и не пустые
    if (finalFil && finalFil.trim() !== '') {
      params.append('fil', finalFil);
    }

    // Пагинация
    params.append('page', body.page || '1');
    params.append('limit', String(body.limit || '20'));

    const queryString = params.toString();
    console.log('[AXIOS SUCCESSFUL URL]:', `${requestPath}?${queryString}`);

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
        views: 0,
        price: 0,
        title: '',
        author_id: '',
        author: null,
        attributes: [],
        description: '',
        breadcrumbs: [],
        images: [],
        directory_name: '',
        posted_at: '',
        category_id: 0,
        price_list_name: '',
        coordinates: null,
        title_image: '',
        is_favourite: 'false', // Строка, так как в типе указан тип string
      };
    }

    // =========================================================================
    // ВРЕМЕННАЯ ЗАГЛУШКА (MOCK) — удалить, когда бэкенд заработает
    // =========================================================================
    const useStub = true;

    if (useStub) {
      console.log('[MOCK GET DETAIL] Возвращаем карточку товара для ID:', body.post_id);

      // Мок-данные строго по типу PostDetailResponse
      const mockPostDetail: PostDetailResponse = {
        post_id: body.post_id, // используем переданный ID
        views: 125,
        price: 15000,
        title: 'Дверь передняя правая (оригинал)',
        author_id: 'user_1',
        author: {
          id: 'user_1',
          name: 'АвтоРазбор НСК',
          email: 'test@example.com',
          image: '/images/avatar-placeholder.jpg',
          date_created: '2024-01-15T10:30:00Z',
          full_name: 'Иванов Иван Иванович',
          telephone: '+79991234567',
          description: 'Официальный разбор автомобилей',
          delivery_description: 'Доставка по городу и области',
        },
        attributes: [
          { key: 'Состояние', value: 'Б/у' },
          { key: 'Производитель', value: 'Оригинал' },
          { key: 'Цвет', value: 'Серебристый' },
        ],
        description: 'Оригинальная передняя правая дверь в отличном состоянии. Без вмятин и глубоких царапин. Подходит для моделей 2019-2023 годов. Все крепления целые.',
        breadcrumbs: [
          { id: 1, name: 'Авто-мото', slug: 'avto-moto' },
          { id: 2, name: 'Запчасти', slug: 'zapchasti' },
          { id: 3, name: 'Кузовные детали', slug: 'kuzovnye-detali' },
        ],
        images: ['/mockImg/1(1).png', '/mockImg/1(2).png', '/mockImg/1(3).png'],
        directory_name: 'mock-directory',
        posted_at: '2026-10-27T09:31:35.809029+00:00',
        category_id: 40,
        price_list_name: 'test_price_list',
        coordinates: [55.7558, 37.6173], // Москва
        title_image: '/mockImg/1(1).png',
        is_favourite: 'False',
      };

      return mockPostDetail;
    }
    // =========================================================================
    // THE END MOCK
    // =========================================================================

    const requestPath = `/posts/post/${body.post_id}`;

    console.log('[GET DETAIL] ID:', body.post_id);
    console.log('[GET DETAIL] baseURL:', apiWithInterceptors.defaults.baseURL);
    console.log(
      '[GET DETAIL] full URL:',
      apiWithInterceptors.getUri({
        method: 'GET',
        url: requestPath,
      }),
    );
    const { data } = await apiWithInterceptors.get<PostDetailResponse>(requestPath);

    return data;
  },

  /**
   * Удаление товара по его ID
   */

  // deleteIdData: {

  // }

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
