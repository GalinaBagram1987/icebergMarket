import type { MainCatalogNode, MainCatalogTree } from '../model/types';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';

/**
 * Собираем дерево каталога для главной страницы
 * запрос осн категорий, подкатегорий
 */

export const getFullTree = async (): Promise<MainCatalogTree> => {
  const rootCategories = await catalogRequest.getMainCategories();

  const results = await Promise.allSettled(
    rootCategories.map(async (parent): Promise<MainCatalogNode> => {
      if (parent.is_leaf) {
        return {
          ...parent,
          children: [],
        };
      }

      const children = await catalogRequest.getChildren(parent.slug);

      return {
        ...parent,
        children,
      };
    }),
  );

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value;
    }

    return {
      ...rootCategories[index],
      children: [],
    };
  });
};
