import type { BackendCategoryItem } from '@/shared/api/apiMethods/catalog';
import { getTranslations } from 'next-intl/server';
import { serverFetchAndCachedCategory } from '../api/fetchAndCachedCategory';
import { serverFethcAndCachedSubcategory } from '../api/fetchAndCachedSubcategory';
import { BreadcrumbsUi } from '@/shared/ui/breadcrumbs';

/**
 * Типы для комонента хлебных крошек категорий
 */

export type CategoryBreadcrumbsProps = {
  currentCategory: BackendCategoryItem;
  parentCategory: BackendCategoryItem;
};

/**
 * Компонент хлебных крошек для категорий
 */

export const CategoryBreadcrumbs = async ({ currentCategory, parentCategory }: CategoryBreadcrumbsProps) => {
  const t = await getTranslations('icebergMarket');

  if (!currentCategory || !parentCategory) return null;

  const pathSegments = currentCategory.path.split('/');

  const resolvedSegments: { name: string; path: string }[] = [];

  for (let i = 0; i < pathSegments.length - 1; i += 1) {
    const segmentPath = pathSegments.slice(0, i + 1).join('/');

    // Если это первый сегмент
    if (segmentPath === parentCategory.path) {
      resolvedSegments.push({
        name: parentCategory.name,
        path: parentCategory.path,
      });
    } else {
      try {
        let res;

        // РАЗДЕЛЯЕМ ЗАПРОСЫ ПО ГЛУБИНЕ ВЛОЖЕННОСТИ
        if (i === 0) {
          // Первый уровень (если вдруг путь не совпал с parentCategory)
          res = await serverFetchAndCachedCategory(segmentPath);
        } else {
          // ГЛУБОКИЙ УРОВЕНЬ (вызываем функцию для подкатегорий)
          res = await serverFethcAndCachedSubcategory(segmentPath);
        }

        // Достаем имя в зависимости от того, какую структуру ответа возвращает эндпоинт
        if (res && res.category) {
          resolvedSegments.push({
            name: res.category.name,
            path: res.category.path,
          });
        }
      } catch (error) {
        console.error(`[BREADCRUMBS ERROR] Не удалось загрузить уровень: ${segmentPath}`, error);
      }
    }
  }
  // Добавляем последний активный элемент
  resolvedSegments.push({ name: currentCategory.name, path: '' });

  return <BreadcrumbsUi items={resolvedSegments} mainLabel={t('breadcrumbs.main')} />;
};
