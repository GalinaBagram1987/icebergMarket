/**
 * Пропсы для основного компонента категории
 */

export type SubcategoryItem = {
  id: number;
  parent_id: number;
  name: string;
  slug: string;
  path: string;
  is_leaf: boolean;
  attributes?: string[];
  count?: number;
};

export type CategoryPageProps = {
  path: string;
  subcategories: SubcategoryItem[];
};
