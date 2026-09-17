import { Suspense } from 'react';
import { SubcategoryListError } from '@/widgets/subcategoryList';
import { ErrorBonduary } from '@/shared/ui/errorBonduare';

import { SearchCategory } from '@/widgets/SearchCategory';
import { SubcategoryList } from '@/widgets/subcategoryList';

/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path }: { path: string }) => {
  return (
    <main className="container">
      <div className="containerContent">
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
