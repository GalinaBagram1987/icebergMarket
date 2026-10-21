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
 * Тип, который описывает тело запроса
 * POST /api/v1/posts/search/
 */
export type SearchPostsRequestBody = {
  page?: string;
  limit?: number;
  fil?: string; // Формат: "category_path=avto-moto;price_from=1000"
  q?: string; // Строка полнотекстового поиска
  sort?: string; // Направление сортировки, например "date:asc"
};

/**
 * Параметры одного поста, которые возвращает бэк
 */
export type BackendGetPost = {
  id: string;
  title: string;
  price: number;
  title_image: string;
  category_id: number;
  author_id: string;
  author_name: string;
  author_image: string;
  attributes: Record<string, string | number | boolean>;
  date: number; // Unix Timestamp
  views: number | string;
  description: string;
};

/**
 * Параметры одной категории с количеством совпадений, которые возвращает бэк
 */
export type CategoryBackendRequest = {
  id: string;
  name: string;
  slug: string;
  count: number; // Каунтер для серых плашек над выдачей
  path: string; // добавила для подкатегорий
};

/**
 * Полный ответ поиска (200 OK)
 */
export type SearchGetResponse = {
  count?: number;
  categories: CategoryBackendRequest[]; // Приходит массив категорий
  posts: BackendGetPost[]; // Приходит массив постов
};

//==================================
/**
 * Поиск по ID.
 * Тип запроса и типы возвращаемых данных
 */

//=================================

/**
 * Тип который описывает тело запроса
 * GET /api/v1/posts/post/{post_id} — Поиск объявлени
 */

export type GetPostDetailRequestBody = {
  post_id: string;
};

/**
 * Тип возвращаемых данных к поиску по ID
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
