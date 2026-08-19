import { queryOptions, useQuery } from '@tanstack/react-query';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';

/**
 * Загружает дерево каталога главной страницы
 * и управляет его кэшированием через Tan Stack Query
 */

export const MainCatalogQueryqueryOpt = () => {
  return queryOptions({
    queryKey: ['mainCatalogTree'],
    queryFn: catalogRequest.getMainCatalog,
    staleTime: 10 * 60 * 1000, // Только каталог свежий 10 минут
  });
};
