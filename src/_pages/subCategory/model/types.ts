import type { CategoryResponse } from '@/shared/api/apiMethods/catalog';
import type { SearchPostsResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Пропсы для основного компонента подкатегории
 */

export type SubCategoryPageProps = {
  path: string;
  subcategoryData: CategoryResponse | null;
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
