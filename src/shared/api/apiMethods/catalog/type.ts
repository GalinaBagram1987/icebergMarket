/**
 * Общий тип который приходит с бэка для категоий
 */

export type BackendCategoryListItem = {
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
 * тип для одной категории на главного каталога.
 * Заголовок и первый уровень вложенности
 */

export type BackendMainCategory = BackendCategoryListItem & {
  categories: BackendCategoryListItem[];
};

/**
 * Типы для каталога на главной странице
 */
export type MainCatalogResponse = {
  count?: number;
  categories: BackendMainCategory[];
};
/**
 * Тип для всех категорий
 */
export type CategoryResponse = {
  count?: number;
  categories: BackendCategoryListItem[];
};
