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
        <Suspense fallback={<div>Обновление списка объявлений...</div>}>
          {postsData?.posts && postsData.posts.length > 0 ? (
            <div>
              <p>Найдено объявлений: {postsData.count}</p>
              <div>Здесь будет динамически сформированный объявления категории {path}</div>
              {/* <Post posts={postsData.posts} /> */}
            </div>
          ) : (
            <div>
              <p>В этой категории пока нет объявлений.</p>
              <p>Попробуйте сбросить фильтры или изменить поисковый запрос.</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
};
