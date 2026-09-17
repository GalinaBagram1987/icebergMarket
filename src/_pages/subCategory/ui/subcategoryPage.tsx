import { Suspense } from 'react';

import { SubCategoryPageProps } from '../model/types';
import { SearchCategory } from '@/widgets/SearchCategory';

export const SubcategoryPage = ({ path }: SubCategoryPageProps) => {
  return (
    <main className="container">
      <div className="containerContent">
        <SearchCategory />
        <Suspense fallback={null}></Suspense>
        <div>Здесь будет динамически сформированаая подкатегория {path}</div>
      </div>
    </main>
  );
};
