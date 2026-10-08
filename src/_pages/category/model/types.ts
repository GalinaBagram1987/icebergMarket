import { CategoryResponse } from '@/shared/api/apiMethods/catalog';
import { SearchPostsResponse } from '@/shared/api/apiMethods/catalog';
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

/**
 * Типы для страницы категорий
 */

export type CategoryPageProps = {
  path: string;
  categoryData: CategoryResponse | null;
  postsData: SearchPostsResponse | null;
  searchParams: {
    q?: string;
    searchMode?: 'section' | 'global';
    priceFrom?: string;
    priceTo?: string;
    isNew?: string;
    isUsed?: string;
    onlyWithPhoto?: string;
    sort?: string;
    page?: string;
  };
};
