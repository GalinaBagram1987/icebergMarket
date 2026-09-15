export type SubcategoryItem = {
  id: number;
  name: string;
  path: string;
  count?: number;
};

export type CategoryTagsProps = {
  subcategories: SubcategoryItem[];
};
