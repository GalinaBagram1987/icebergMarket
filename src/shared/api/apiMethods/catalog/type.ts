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
 * Одна главная категория
 * с её непосредственными подкатегориями.
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

/**
 * Ответ сервера для конкретной категории/подкатегории
 * GET /api/v1/posts/[categoryPath] (например, /posts/avto-moto)
 @example
 * // Как обращаться к запросу (Деструктуризация):
 * const { category } = await getCategories("avto-moto");
 * category.name; // "Авто-мото"
 * category.subcategory; // Массив подкатегорий внутр
*/

export type CategoryResponse = {
  count?: number;
  category: BackendCategory;
};

/**
 * Ответ сервера для конкретной категории/подкатегории
 * GET /api/v1/posts/[categoryPath]/[subcategoryPath]
 * * @example
 * // Как обращаться к запросу (Деструктуризация):
 * const { category, categories } = await getSubCategories("avto-moto/zapchasti");
 * category.name; // Текущая подкатегория "Запчасти"
 * categories; // Массив вложенных в неё детей на ОДНОМ уровне с ней
 */

export type SubcategoryResponse = {
  count?: number;
  category: BackendCategoryItem;
  categories: BackendCategoryItem[];
};
