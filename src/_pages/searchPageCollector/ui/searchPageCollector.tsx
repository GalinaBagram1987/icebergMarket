import { Suspense } from 'react';

import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import type { SearchPageCollectorProps } from '../model/types';
import { SortPost } from '@/features/sortPosts';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';
import { CategoryFilterBadges } from '@/widgets/categoryFilterBadges';

/**
 * Сборка страницы поиска
 */
export const SearchPageCollector = ({ path, searchParams, initialSearchData }: SearchPageCollectorProps) => {
  // Проверяем, есть ли товары в ответе бэкенда
  const hasPosts = initialSearchData && initialSearchData.posts.length > 0;
  const searchQuery = searchParams.q || '';
  return (
    <div className="containerContent">
      <Suspense fallback={null}>
        <GlobalSearchCatalog />
        {/* Плашки категорий показываем только если бэк вернул хоть какие-то смежные категории */}
        {initialSearchData.categories.length > 0 && <CategoryFilterBadges categories={initialSearchData.categories} />}
      </Suspense>
      <div className="l-sortAndMapWrapper">
        <SortPost />
        <MapLink path={path} />
      </div>
      {hasPosts ? (
        <>
          {/* Сетка с товарами и сортировкой */}
          <div className="l-sortAndMapWrapper">
            <SortPost />
            <MapLink path={path} />
          </div>
          <Suspense fallback={null}>
            <PostList postsData={{ postList: initialSearchData.posts }} />
          </Suspense>
        </>
      ) : (
        /* Информационная заглушка, если товаров нет */
        <div className="emptySearchState">
          <h2>По запросу «{searchQuery}» ничего не найдено</h2>
          <p>Попробуйте проверить орфографию или сформулировать запрос иначе</p>
        </div>
      )}
    </div>
  );
};
