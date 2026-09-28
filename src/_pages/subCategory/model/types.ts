import { CategoryResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Пропсы для основного компонента подкатегории
 */

export type SubCategoryPageProps = {
  path: string;
  subcategoryData: CategoryResponse | null;
};
