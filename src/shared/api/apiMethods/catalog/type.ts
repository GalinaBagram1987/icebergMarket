/**
 * Общий тип одной категории,
 * который приходит с бэкенда.
 */

export type BackendListItem = {
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
export type BackendCategory = BackendListItem & {
  subcategory: BackendListItem[];
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
 */
export type CategoryResponse = {
  count?: number;
  category: BackendCategory;
};

/**
 * Ответ сервера для конкретной категории/подкатегории
 * GET /api/v1/posts/[categoryPath]/[subcategoryPath]
 */

export type SubcategoryResponse = {
  count?: number;
  category: BackendListItem;
  categories: BackendListItem[];
};
