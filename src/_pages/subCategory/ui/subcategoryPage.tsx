import { Suspense } from 'react';

import { SubCategoryPageProps } from '../model/types';
import { SearchCategory } from '@/widgets/SearchCategory';
import { Breadcrumbs } from '@/widgets/breadcrumbs';

/**
 * Страница подкатегории типовая
 * Сборка страницы подкатегорий
 */

export const SubcategoryPage = ({ path, subcategoryData }: SubCategoryPageProps) => {
  if (!subcategoryData || !subcategoryData.category) return null;
  return (
    <main className="container">
      <div className="containerContent">
        <Suspense fallback={null}>
          <Breadcrumbs currentCategory={subcategoryData.category} parentCategory={subcategoryData.category} />
        </Suspense>
        <SearchCategory />
        <div>Здесь будет динамически сформированаая подкатегория {path}</div>
      </div>
    </main>
  );
};
