import type { CategoryPageProps } from '../model/types';
import { SearchCategory } from '@/widgets/SearchCategory';
import { SubcategoryList } from '@/widgets/subcategoryList';

/**
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, subcategories }: CategoryPageProps) => {
  return (
    <main className="container">
      <div className="containerContent">
        <SearchCategory />
        <SubcategoryList subcategories={subcategories} />
      </div>
    </main>
  );
};
