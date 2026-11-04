import { BackendCategoryItem } from '@/shared/api/apiMethods/catalog';
import { getTranslations } from 'next-intl/server';
import { serverFetchAndCachedCategory } from '../api/fetchAndCachedCategory';
import { serverFethcAndCachedSubcategory } from '../api/fetchAndCachedSubcategory';
import { BreadcrumbsUi } from '@/shared/ui/breadcrumbs';

/**
 * Типы для компонента хлебных крошек подкатегорий
 */

export type SubcategoryBreadcrumbsProps = {
  currentCategory: BackendCategoryItem;
  parentCategory: BackendCategoryItem;
};

/**
 * Хлебные крошки для покатегорий
 */

export const SubcategoryBreadcrumbs = async ({ currentCategory, parentCategory }: SubcategoryBreadcrumbsProps) => {
  const t = await getTranslations('icebergMarket');

  if (!currentCategory || !parentCategory) return null;

  // Разделяем путь текущей подкатегории на сегменты: ['avto-moto', 'shiny-i-diski', 'kolpaki']
  const pathSegments = currentCategory.path.split('/');
  const resolvedSegments: { name: string; path: string }[] = [];

  for (let i = 0; i < pathSegments.length - 1; i += 1) {
    const segmentPath = pathSegments.slice(0, i + 1).join('/');

    if (segmentPath === parentCategory.path) {
      resolvedSegments.push({
        name: parentCategory.name,
        path: parentCategory.path,
      });
      continue;
    }

    try {
      const isFirstLevel = segmentPath.split('/').length === 1;

      const res = isFirstLevel ? await serverFetchAndCachedCategory(segmentPath) : await serverFethcAndCachedSubcategory(segmentPath);

      if (res && res.category) {
        resolvedSegments.push({
          name: res.category.name,
          path: res.category.path,
        });
      }
    } catch (error) {
      console.error(`[SUBCATEGORY BREADCRUMBS ERROR] Ошибка загрузки уровня: ${segmentPath}`, error);
    }
  }

  // Добавляем в самый конец активную подкатегорию, путь пустой, чтобы была некликабельной
  resolvedSegments.push({
    name: currentCategory.name,
    path: '',
  });

  return <BreadcrumbsUi items={resolvedSegments} mainLabel={t('breadcrumbs.main')} />;
};
