import { Suspense } from 'react';
import styles from './productPageCollector.module.css';

import { PostBreadcrumbs } from '@/entities/catalog';
import type { ProductPageCollectorProps } from '../module/types';
import { cn } from '@/shared/lib';
import { ProductMetaBar } from './parts/productMetaBar';
import { ActionBar } from './parts/actionsBar';

/**
 * Страница товара типовая
 * Сборка страницы товара
 */

export const ProductPageCollector = ({ productData, t }: ProductPageCollectorProps) => {
  if (!productData) return null;
  const { post_id, views, price, title, attributes, description, images, posted_at, coordinates, adress } = productData;

  return (
    <div>
      <PostBreadcrumbs post={productData} />
      <div className={cn(styles.bgColorAndMargin)}>
        <h1 className={styles.titleStyle}>{title}</h1>
        <ProductMetaBar productData={{ post_id, views, posted_at }} t={t} />
        <ActionBar productId={post_id} />
        {/**Первая сетка. цена, инфо, фото */}
        <div className={styles.gridOne}>
          <h1 className={styles.price}>{price} p.</h1>
        </div>
      </div>
    </div>
  );
};
