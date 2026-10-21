import { Suspense } from 'react';

import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import type { SearchPageCollectorProps } from '../model/types';
import { SortPost } from '@/features/sortPosts';
import { MapLink } from '@/shared/ui/mapLink';
import { PostList } from '@/entities/posts';

/**
 * Сборка страницы поиска
 */
export const SearchPageCollector = ({ path, searchParams, initialSearchData }: SearchPageCollectorProps) => {
  return (
    <div className="containerContent">
      <Suspense fallback={null}>
        <GlobalSearchCatalog />
      </Suspense>
      <div className="l-sortAndMapWrapper">
        <SortPost />
        <MapLink path={path} />
      </div>
      <Suspense fallback={null}>
        <PostList postsData={{ postList: initialSearchData.posts }} />
      </Suspense>
    </div>
  );
};
