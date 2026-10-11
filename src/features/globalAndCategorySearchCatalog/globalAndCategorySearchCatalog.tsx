import { useState, useEffect } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { GlobalAndCategorySearch } from '@/shared/ui/globalAndCategorySearch/globalAndCategorySearch';
import type { GlobalAndCategorySearchProps } from '@/shared/ui/globalAndCategorySearch/globalAndCategorySearch.types';

export const GlobalAndCategorySearchCatalog = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
};
