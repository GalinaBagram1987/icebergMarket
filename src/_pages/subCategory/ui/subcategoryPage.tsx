import { Suspense } from 'react';

import { SubCategoryPageProps } from '../model/types';
import { GlobalAndCategorySearchCatalog } from '@/features/globalAndCategorySearchCatalog';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';
/**
 * Страница подкатегории типовая
 * Сборка страницы подкатегорий
 */

export const SubcategoryPage = ({ path, subcategoryData, postsData, searchParams, t }: SubCategoryPageProps) => {
  if (!subcategoryData || !subcategoryData.category) return null;
  const queryKey = searchParams?.q || '';
  const modeKey = searchParams?.searchMode || 'global';
  const compositeSearchKey = `${queryKey}_${modeKey}`;

  return (
    <main className="container">
      <div className="containerContent">
        <Breadcrumbs currentCategory={subcategoryData.category} parentCategory={subcategoryData.category} />
        <Suspense fallback={null}>
          <GlobalAndCategorySearchCatalog key={compositeSearchKey} />
        </Suspense>

        <MapLink path={path} />
        {/**Здесь будет фильтр CatalogFilterWidget
        initialFilters={searchParams}*/}

        <Suspense fallback={<div>Обновление списка объявлений...</div>}>
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
