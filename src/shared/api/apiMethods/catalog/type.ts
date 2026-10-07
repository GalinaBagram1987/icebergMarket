//==================================
/**
 * Типы экранизации каталога
 */
//=================================

/**
 * Общий тип одной категории,
 * который приходит с бэкенда.
 */

export type BackendCategoryItem = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  path: string;
  is_leaf: boolean; // if true - нет детей (конечная категория), if false - есть дети
  attributes: string[];
  count?: number;
};

/**
 * Ответ сервера для конкретной категории/подкатегории
 * GET /api/v1/posts/[categoryPath] (например, /posts/avto-moto)
 * GET /api/v1/posts/[categoryPath]/[subcategoryPath]
 * * @example
 * // Как обращаться к запросу (Деструктуризация):
 * const { category, categories } = await getSubCategories("avto-moto/zapchasti");
 * category.name; // Текущая подкатегория "Запчасти"
 * categories; // Массив вложенных в неё детей на ОДНОМ уровне с ней
 */

export type CategoryResponse = {
  category: BackendCategoryItem;
  categories: BackendCategoryItem[];
};

//==================================
/**
 * Основной поиск.
 * Тип запроса и типы возвращаемых данных
 * /
 //=================================

 /** 
 * Тип который описывает тело запроса
 * POST /api/v1/posts/search/[параметры запроса, каждый необязательный]
 */
export type SearchPostsRequestBody = {
  page?: string;
  limit?: number;
  fil?: string;
  q?: string;
  sort?: string;
};

/**
 * Параметры одного значения, которое приходит от бэка
 * которое возвращет поиск
 */

export type BackendPostItem = {
  id: string;
  title: string;
  price: number;
  title_image: string;
  category_id: number;
  author_id: string;
  author_name: string;
  author_image: string;
  attributes: any[];
};

/**
 * Полный ответ поиска
 */

export type SearchPostsResponse = {
  count: number;
  posts: BackendPostItem[];
};

//==================================
/**
 * Поиск по ID.
 * Тип запроса и типы возвращаемых данных
 * /
 //=================================

/**
 * Тип который описывает тело запроса
 * POST /api/v1/posts/post/{post_id} — Поиск объявлени
 */

export type GetPostDetailRequestBody = {
  post_id: string;
};

/**
 * Тип возвращаемых данных к поиску по ID
 * обращаемся к данным
 *
 */

export type PostDetailResponse = {
  post_id: string;
  title: string;
  author_id: string;
  author: any; // Специфичный JSON автора
  description: string;
  images: string;
  directory_name: string;
  posted_at: string;
  category_id: number;
  price_list_name: string;
  coordinates: string; // POINT гео-координаты
  title_image: string;
  is_favourite: boolean;
};

// ================================================

/**
 * Категория для каталога на главной странице.
 * Сейчас это хардкод. но есть такой эндпоинт.
 * оставляем под него типы и запрос
 * на случай если уберут в будущем хардкод
 */

export type BackendCategory = BackendCategoryItem & {
  subcategory: BackendCategoryItem[];
};

/**
 * Ответ для каталога на главной странице:
 * GET /api/v1/posts/
 * сейчас это хардкод
 */
export type MainCatalog = {
  count?: number;
  categories: BackendCategory[];
};
//===========================================
