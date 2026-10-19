import { Suspense } from 'react';

import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import type { GlobalSearchProps } from '@/shared/ui/globalSearch/globalSearch.types';
import { SortPost } from '@/features/sortPosts';
import { MapLink } from '@/shared/ui/mapLink';

export const SearchPage = () => {
  return (
    <main className="container">
      <div className="contaierContent">
        <Suspense fallback={null}>
          <GlobalSearchCatalog />
        </Suspense>

        <div className="l-sortAndMapWrapper">
          <SortPost />
          <MapLink />
        </div>
      </div>
    </main>
  );
};
