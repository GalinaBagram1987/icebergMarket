/**
 * Интерфейс подкатегории (1шт) первого уровня, полученная от API.
 */

export interface SubcategoryFirstLevel {
  id: number;
  parent_id: number;
  name: string;
  slug: string;
  full_path: string;
  is_leaf: boolean;
  attrs: any[];
}

/**
 * Ответ API со списком подкатегорий первого уровня.
 */
export interface SubcategoryFLevResponse {
  categories: SubcategoryFirstLevel[]; //название должно совпадать с бэком!
}
