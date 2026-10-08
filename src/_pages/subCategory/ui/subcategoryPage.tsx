import { Suspense } from 'react';

import { SubCategoryPageProps } from '../model/types';
import { SearchCategory } from '@/widgets/SearchCategory';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { CatalogFilterWidget } from '@/widgets/catalogFilterWidget';

/**
 * Страница подкатегории типовая
 * Сборка страницы подкатегорий
 */

export const SubcategoryPage = ({ path, subcategoryData, postsData }: SubCategoryPageProps) => {
  if (!subcategoryData || !subcategoryData.category) return null;
  return (
    <main className="container">
      <div className="containerContent">
        <Breadcrumbs currentCategory={subcategoryData.category} parentCategory={subcategoryData.category} />
        <Suspense fallback={null}>
          <SearchCategory
          // initialQuery={searchParams.q || ''}
          // initialMode={searchParams.searchMode || 'section'}
          />
        </Suspense>

        <MapLink path={path} />

        <CatalogFilterWidget
        // initialFilters={searchParams}
        />

        <Suspense>
          {postsData?.posts && postsData.posts.length > 0 ? (
            <div>
              <p className="mb-2 text-sm text-neutral-500">Найдено объявлений: {postsData.count}</p>
              <div>Здесь будет динамически сформированаая подкатегория {path}</div>
              {/* <Post posts={postsData.posts} /> */}
            </div>
          ) : (
            <div className="py-10 text-center text-neutral-500">
              <p>В этой категории пока нет объявлений.</p>
              <p className="mt-1 text-xs">Попробуйте сбросить фильтры или изменить поисковый запрос.</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
};
