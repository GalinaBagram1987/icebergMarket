import { getFullTree } from './getMainCatalogTree';
import { useQuery } from '@tanstack/react-query';

/**
 * Загружает дерево каталога главной страницы
 * и управляет его кэшированием через Tan Stack Query
 */

export const useMainCatalogTreeQuery = () => {
  return useQuery({
    queryKey: ['mainCatalogTree'],
    queryFn: getFullTree,
    staleTime: 10 * 60 * 1000, // Только каталог свежий 10 минут
  });
};
