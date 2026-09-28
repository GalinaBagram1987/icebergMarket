/**
 * для подкатегориий типа app/catalog/[categoryPath]/[...subcategoryPath]/page.tsx
 * некст возвращает основн строкой и далее объект
 */

type SubCategoryPageAppProps = {
  params: Promise<{
    categoryPath: string;
    subcategoryPath: string[];
  }>;
};

type ResolvedSubCategoryParams = Awaited<SubCategoryPageAppProps['params']>;
/**
 * собираем общий путь
 */

export const buildFullPath = ({ categoryPath, subcategoryPath }: ResolvedSubCategoryParams): string => {
  return [categoryPath, ...subcategoryPath].join('/');
};
