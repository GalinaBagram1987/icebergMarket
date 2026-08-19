/** Тип аттрибута категории. Пока не знаем точную структуру attrs */
export type BackendCategoryAttr = unknown;

/**
 * Общий тип который приходит с бэка для категоий
 */

export type BackendCategoryListItem = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  full_path: string;
  is_leaf: boolean; // if true - нет детей (конечная категория), if false - есть дети
  attrs: BackendCategoryAttr[];
};

/**
 * тип для одной категории на главного каталога.
 * Заголовок и первый уровень вложенности
 */

export type BackendMainCategory = BackendCategoryListItem & {
  subcategory: BackendCategoryListItem[];
};

/**
 * Типы для каталога на главной странице
 */
export type MainCatalogResponse = {
  categories: BackendMainCategory[];
};
/**
 * Тип для категори первого уроня
 */
export type FirstLevCategoryResponse = {
  categories: BackendCategoryListItem[];
};
