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
