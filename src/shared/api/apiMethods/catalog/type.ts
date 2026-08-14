/** Тип аттрибута категории. Пока не знаем точную структуру attrs */
export type BackendCategoryAttr = unknown;

/**
 * Элемент списка категорий, полученный с бэка.
 * Сейчас используется в ответах с основными категориями
 * и подкатегориями первого уровня.
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
 * Общий тип ответа бэка для основных  категорий и категори 1 типа
 */

export type BackendCategoryListResponse = {
  categories: BackendCategoryListItem[];
};
