import { Suspense } from 'react';

import { CategoryPageProps } from '../model/types';

import { SearchCategory } from '@/widgets/SearchCategory';
import { SubcategoryList } from '@/widgets/subcategoryList';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { CatalogFilterWidget } from '@/widgets/catalogFilterWidget';

/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, categoryData, postsData, searchParams }: CategoryPageProps) => {
  if (!categoryData || !categoryData.category) return null;

  return (
    <main className="container">
      <div className="containerContent">
        <Breadcrumbs currentCategory={categoryData.category} parentCategory={categoryData.category} />

        <Suspense>
          <SearchCategory
          // initialQuery={searchParams.q || ''}
          // initialMode={searchParams.searchMode || 'section'}
          />
        </Suspense>

        <Suspense fallback={null}>
          <SubcategoryList path={path} />
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
