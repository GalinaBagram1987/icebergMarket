export interface SubcategoryFirstLevel {
  id: number;
  parent_id: number;
  name: string;
  slug: string;
  full_path: string;
  is_leaf: boolean;
  attrs: any[];
}

export interface SubcategoryFLevResponse {
  categories: SubcategoryFirstLevel[]; //название должно совпадать с бэком!
}
