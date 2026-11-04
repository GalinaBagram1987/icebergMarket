import { Suspense } from 'react';
import { SearchBreadcrumbs } from '@/entities/catalog';
import { SearchMapFilter } from '@/features/searchMapFilter';
import { SearchGetResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Типы для поиска по карте
 */

export type SearchMapPageProps = {
  searchResponse: SearchGetResponse;
  activeCategoryId?: string;
  searchQuery?: string;
};

export const SearchMapPage = ({ searchResponse, activeCategoryId, searchQuery }: SearchMapPageProps) => {
  return (
    <div className="containerContent">
      <SearchBreadcrumbs searchResponse={searchResponse} activeCategoryId={activeCategoryId} searchQuery={searchQuery} />

      <Suspense fallback={null}>
        <SearchMapFilter />
      </Suspense>
    </div>
  );
};
