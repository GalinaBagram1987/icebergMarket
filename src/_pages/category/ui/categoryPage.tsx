import { Suspense } from 'react';

import { CategoryPageProps } from '../model/types';
import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import { SubcategoryList } from '@/widgets/subcategoryList';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';

/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, categoryData, postsData, searchParams }: CategoryPageProps) => {
  if (!categoryData || !categoryData.category) return null;
  const queryKey = searchParams?.q || '';

  return (
    <main className="container">
      <div className="containerContent">
        <Breadcrumbs currentCategory={categoryData.category} parentCategory={categoryData.category} />
        <Suspense fallback={null}>
          <GlobalSearchCatalog key={queryKey} />
        </Suspense>
        <Suspense fallback={null}>
          <SubcategoryList path={path} />
        </Suspense>
        <MapLink path={path} />
        {/** Здесь будет фильтр 
        initialFilters={searchParams}*/}
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
