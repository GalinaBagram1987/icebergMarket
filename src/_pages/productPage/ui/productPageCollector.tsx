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
  const { post_id, views, price_list_name, title, attributes, description, images, posted_at, coordinates, adress } = productData;

  return (
    <div>
      <PostBreadcrumbs post={productData} />
      <div className={cn(styles.bgColorAndMargin)}>
        <h1 className={styles.titleStyle}>{title}</h1>
        <div className={styles.upperBtnGroup}>
          <ActionBar productId={post_id} />
          <ProductMetaBar productData={{ post_id, views, posted_at }} t={t} />
        </div>
      </div>
    </div>
  );
};
