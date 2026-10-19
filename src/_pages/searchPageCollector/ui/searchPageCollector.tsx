import { Suspense } from 'react';

import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import type { SearchPageCollectorProps } from '../model/types';
import { SortPost } from '@/features/sortPosts';
import { MapLink } from '@/shared/ui/mapLink';

/**
 * Сборка страницы поиска
 */
export const SearchPageCollector = ({ path, searchParams }: SearchPageCollectorProps) => {
  return (
    <main className="container">
      <div className="contaierContent">
        <Suspense fallback={null}>
          <GlobalSearchCatalog />
        </Suspense>

        <div className="l-sortAndMapWrapper">
          <SortPost />
          <MapLink path={path} />
        </div>
      </div>
    </main>
  );
};
