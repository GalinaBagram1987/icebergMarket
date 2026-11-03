import { Suspense } from 'react';

import { SubCategoryPageProps } from '../model/types';
import { GlobalAndCategorySearchCatalog } from '@/features/globalAndCategorySearchCatalog';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';
import { SortPost } from '@/features/sortPosts';
import { FilterPanel } from '@/features/filterPanel';
import { normalizedPostItem } from '@/shared/lib';

/**
 * Страница подкатегории типовая
 * Сборка страницы подкатегорий
 */

export const SubcategoryPage = ({ path, subcategoryData, postsData, searchParams, t }: SubCategoryPageProps) => {
  if (!subcategoryData || !subcategoryData.category) return null;
  const queryKey = searchParams?.q || '';
  const modeKey = searchParams?.searchMode || 'global';
  const compositeSearchKey = `${queryKey}_${modeKey}`;

  // Создаем нормализованный массив постов прямо в компоненте страницы
  const normalizedPosts = postsData?.posts?.map((post) => normalizedPostItem(post)) || [];

  return (
    <div className="containerContent">
      <Breadcrumbs currentCategory={subcategoryData.category} parentCategory={subcategoryData.category} />
      <Suspense fallback={null}>
        <GlobalAndCategorySearchCatalog key={compositeSearchKey} />
      </Suspense>

      <FilterPanel />

      <div className="l-sortAndMapWrapper">
        <SortPost />
        <MapLink path={path} />
      </div>

      <Suspense fallback={<div className="noDataP">{t('postsList.fallback')}</div>}>
        {postsData && normalizedPosts.length > 0 ? (
          <PostList
            postsData={{
              count: postsData.count || 0,
              posts: normalizedPosts,
            }}
          />
        ) : (
          <div>
            <p className="noDataP">{t('postsList.textWarOne')}</p>
          </div>
        )}
      </Suspense>
    </div>
  );
};
