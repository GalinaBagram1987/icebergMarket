import { Suspense } from 'react';

import { CategoryPageProps } from '../model/types';
import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import { SubcategoryList } from '@/widgets/subcategoryList';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';

/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, categoryData, postsData, searchParams, t }: CategoryPageProps) => {
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
        <Suspense fallback={<div>{t('postsList.fallback')}</div>}>
          {postsData?.posts && postsData.posts.length > 0 ? (
            <PostList
              postsData={{
                count: postsData.count || 0,
                postList: postsData.posts,
              }}
            />
          ) : (
            <div>
              <p>{t('postsList.textWarOne')}</p>
              <p>{t('postsList.textWarTwo')}</p>
            </div>
          )}
        </Suspense>
      </div>
    </main>
  );
};
