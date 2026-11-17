import styles from './productPageCollector.module.css';

import { PostBreadcrumbs } from '@/entities/catalog';
import type { ProductPageCollectorProps } from '../module/types';
import { cn } from '@/shared/lib';
import { ProductMetaBar } from './parts/productMetaBar';
import { ActionBar } from './parts/actionsBar';
import { FirstCompanyInfo } from './parts/firstCompanyInfo';
import { ProductAttributes } from './parts/fromAttributesBlock';
import { ProductDescription } from './parts/descriptionProduct';
import { SecondCompanyInfo } from './parts/secondCompanyInfo';
import { ProductMap } from './parts/productMap';
import { ProductGallery } from './parts/productGallery';

/**
 * Страница товара типовая
 * Сборка страницы товара
 */

export const ProductPageCollector = ({ productData, t }: ProductPageCollectorProps) => {
  if (!productData) return null;
  const { post_id, views, price, title, author_id, author, attributes, description, images, posted_at, category_id, price_list_name, title_image, is_favourite, address } = productData;

  return (
    <div>
      <PostBreadcrumbs post={productData} />
      <div className={cn(styles.bgColorAndMargin)}>
        <h1 className={styles.titleStyle}>{title}</h1>
        <ProductMetaBar productData={{ post_id, views, posted_at }} t={t} />
        <ActionBar productId={post_id} />

        {/**Первая сетка. цена, инфо, фото */}
        <div className={styles.gridOne}>
          <div className={styles.leftPartGridOne}>
            <span className={styles.price}>{price} p.</span>
            <FirstCompanyInfo productSeller={author.name} address={address} telephone={author.telephone} />
            <ProductAttributes attributes={attributes} />
          </div>

          <ProductGallery className={styles.containerByFoto} title={title} images={images} />
        </div>

        <ProductDescription description={description} />
        <div className={styles.companyInfoWrapper}>
          <SecondCompanyInfo image={author.image} productSeller={author.name} date_created={author.date_created} address={address ?? author.address} telephone={author.telephone} />
          <ProductMap address={address} />
        </div>
      </div>
    </div>
  );
};
