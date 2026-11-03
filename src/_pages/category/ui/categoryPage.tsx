import { Suspense } from 'react';

import { CategoryPageProps } from '../model/types';
import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import { SubcategoryList } from '@/widgets/subcategoryList';
import { Breadcrumbs } from '@/widgets/breadcrumbs';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';
import { SortPost } from '@/features/sortPosts';
import { normalizeAttributes } from '@/shared/lib';
/**
 * Страница категории типовая
 * Сборка страницы категорий
 */

export const CategoryPage = ({ path, categoryData, postsData, searchParams, t }: CategoryPageProps) => {
  if (!categoryData || !categoryData.category) return null;
  const queryKey = searchParams?.q || '';

  // 1. Создаем нормализованный массив постов прямо в компоненте страницы
  const normalizedPosts =
    postsData?.posts?.map((post) => ({
      ...post,
      attributes: normalizeAttributes(post.attributes),
      price: Number(post.price),
      date: Number(post.date),
    })) || [];

  return (
    <div className="containerContent">
      <Breadcrumbs currentCategory={categoryData.category} parentCategory={categoryData.category} />
      <Suspense fallback={null}>
        <GlobalSearchCatalog key={queryKey} />
      </Suspense>
      <Suspense fallback={null}>
        <SubcategoryList path={path} />
      </Suspense>
      <div className="l-sortAndMapWrapper">
        <SortPost />
        <MapLink path={path} />
      </div>

      <Suspense fallback={<div>{t('postsList.fallback')}</div>}>
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
