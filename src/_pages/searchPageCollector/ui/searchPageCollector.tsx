import { Suspense } from 'react';

import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import type { SearchPageCollectorProps } from '../model/types';
import { SortPost } from '@/features/sortPosts';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';
import { CategoryFilterBadges } from '@/widgets/categoryFilterBadges';
import { normalizedPostItem } from '@/shared/lib';

/**
 * Сборка страницы поиска
 */
export const SearchPageCollector = ({ path, searchParams, initialSearchData, t }: SearchPageCollectorProps) => {
  // нормализуем ответ бэка
  const normalizedPosts = initialSearchData?.posts?.map((post) => normalizedPostItem(post)) || [];
  // Проверяем, есть ли товары в ответе бэкенда
  const hasPosts = normalizedPosts && normalizedPosts.length > 0;
  const searchQuery = searchParams.q || '';
  return (
    <div className="containerContent">
      <Suspense fallback={null}>
        <GlobalSearchCatalog />
        {/* Плашки категорий показываем только если бэк вернул хоть какие-то смежные категории */}
        {initialSearchData?.categories && Object.keys(initialSearchData.categories).length > 0 && <CategoryFilterBadges categories={initialSearchData.categories} />}
      </Suspense>

      {hasPosts ? (
        <>
          {/* Сетка с товарами и сортировкой */}
          <div className="l-sortAndMapWrapper">
            <SortPost />
            <MapLink path={path} />
          </div>
          <Suspense fallback={<div className="noDataP">{t('postsList.fallback')}</div>}>
            <PostList postsData={{ posts: normalizedPosts }} />
          </Suspense>
        </>
      ) : (
        /* Информационная заглушка, если товаров нет */
        <div className="emptySearchState">
          <p className="noDataP">
            {t('emptySearch.textPartOne')} «{searchQuery}» {t('emptySearch.textPartTwo')}
          </p>
        </div>
      )}
    </div>
  );
};
