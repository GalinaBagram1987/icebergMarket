import { Suspense } from 'react';
import { SubcategoryListError } from '@/widgets/subcategoryList';
import { ErrorBonduary } from '@/shared/ui/errorBonduare';
import { CategoryPageProps } from '../model/types';

import { SearchCategory } from '@/widgets/SearchCategory';
import { SubcategoryList } from '@/widgets/subcategoryList';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, categoryData }: CategoryPageProps) => {
  if (!categoryData || !categoryData.category) return null;

  return (
    <main className="container">
      <div className="containerContent">
        <ErrorBonduary fallback={null}>{categoryData?.category && <Breadcrumbs currentCategory={categoryData.category} parentCategory={categoryData.category} />}</ErrorBonduary>

        <SearchCategory />

        <ErrorBonduary fallback={<SubcategoryListError />}>
          <Suspense fallback={null}>
            <SubcategoryList path={path} />
          </Suspense>
        </ErrorBonduary>
      </div>
    </main>
  );
};
