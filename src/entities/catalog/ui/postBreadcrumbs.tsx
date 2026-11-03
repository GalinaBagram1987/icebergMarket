import { getTranslations } from 'next-intl/server';
import { BreadcrumbsUi } from '@/shared/ui/breadcrumbs';
import { PostDetailResponse } from '@/shared/api/apiMethods/catalog';

/**
 * Компонент хлебные крошки карточки товара
 */

export const PostBreadcrumbs = async ({ post }: { post: PostDetailResponse }) => {
  const t = await getTranslations('icebergMarket');

  const items: { name: string; path: string }[] = [];
  let accumulatedPath = '';

  post.breadcrumbs.forEach((crumb) => {
    accumulatedPath = accumulatedPath ? `${accumulatedPath}/${crumb.slug}` : crumb.slug;
    items.push({
      name: crumb.name,
      path: accumulatedPath,
    });
  });

  // Добавляем имя самого объявления
  items.push({ name: post.title, path: '' });

  return <BreadcrumbsUi items={items} mainLabel={t('breadcrumbs.main')} />;
};
