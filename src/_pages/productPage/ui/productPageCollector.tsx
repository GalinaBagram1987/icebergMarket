import { Suspense } from 'react';
import styles from './productPageCollector.module.css';

import { PostBreadcrumbs } from '@/entities/catalog';
import type { ProductPageCollectorProps } from '../module/types';

/**
 * Страница товара типовая
 * Сборка страницы товара
 */

export const ProductPageCollector = ({ productData, t }: ProductPageCollectorProps) => {
  if (!productData) return null;
  const {
    title,
    price_list_name, // По макету это цена, например "47 237р."
    description,
    images, // Строка с картинками
    posted_at, // Дата публикации
    post_id, // ID/Артикул
  } = productData;

  <PostBreadcrumbs post={productData} />;

  return <div> Здесь будет страница продукта</div>;
};
