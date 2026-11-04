import { getTranslations } from 'next-intl/server';
import { BreadcrumbsUi } from '@/shared/ui/breadcrumbs';
import type { BreadcrumbsUiProps } from '@/shared/ui/breadcrumbs/breadcrumbsItem';
import { SearchGetResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Типы крошек для страницы поиска
 */

export type SearchBreadcrumbsProps = {
  searchResponse: SearchGetResponse;
  activeCategoryId?: string; // если выбрана категория
  searchQuery?: string; // Строка поиска из URL (например, ?query=машина), если не выбрана категория
};

/**
 * Комопонент халебные крошки для результатов поиска
 */

export const SearchBreadcrumbs = async ({ searchResponse, activeCategoryId, searchQuery }: SearchBreadcrumbsProps) => {
  const t = await getTranslations('icebergMarket');
  const items: BreadcrumbsUiProps[] = [];
  // если категория не выбрана только query-параметр
  if (!activeCategoryId || !searchResponse.categories[activeCategoryId]) {
    if (searchQuery) {
      items.push({
        name: `${t('breadcrumbs.search')}: «${searchQuery}»`,
        path: undefined, // Последний элемент некликабельный
      });
      return <BreadcrumbsUi items={items} mainLabel={t('breadcrumbs.main')} />;
    }
    return null;
  }
  // если выбрана и категория и query-парметр
  const targetCategory = searchResponse.categories[activeCategoryId];
  const pathSegments = targetCategory.path.split('/');
  let accumulatedPath = '';

  pathSegments.forEach((segmentSlug, index) => {
    accumulatedPath = accumulatedPath ? `${accumulatedPath}/${segmentSlug}` : segmentSlug;
    const isLast = index === pathSegments.length - 1;

    const matchedCategory = Object.values(searchResponse.categories).find((cat) => cat.slug === segmentSlug);

    // Формируем ссылку. Если есть еще и текстовый запрос, сохраняем его при переходе назад
    const querySuffix = searchQuery ? `&query=${encodeURIComponent(searchQuery)}` : '';

    items.push({
      name: matchedCategory ? matchedCategory.name : segmentSlug,
      path: isLast ? undefined : `search?category=${matchedCategory?.id || accumulatedPath}${querySuffix}`,
    });
  });

  return <BreadcrumbsUi items={items} mainLabel={t('breadcrumbs.main')} />;
};
