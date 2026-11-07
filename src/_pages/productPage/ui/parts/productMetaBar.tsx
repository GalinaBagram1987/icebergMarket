import styles from './parts.module.css';
import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';
import { formatToHumanDate } from '@/shared/lib';

/**
 * Типы для инфо меню страницы
 */

export type ProductMetaBarProps = {
  productData: Pick<PostDetailResponse, 'views' | 'posted_at' | 'post_id'>;
  t: (key: string, options?: Record<string, any>) => string; // Принимаем функцию перевода
};

/**
 * Компонент метабар на странице товара
 */

export const ProductMetaBar = ({ productData, t }: ProductMetaBarProps) => {
  const { views, posted_at, post_id } = productData;

  const hasAnyData = views != null || posted_at || post_id != null;
  if (!hasAnyData) return null;

  return (
    <>
      <ul className={styles.metabarUl}>
        {post_id != null && (
          <li className={styles.metabarLi}>
            <span>
              {t('productPage.id')} {post_id}
            </span>
          </li>
        )}
        {posted_at != null && (
          <li className={styles.metabarLi}>
            <span>{formatToHumanDate(posted_at)}</span>
          </li>
        )}

        {views != null && (
          <li className={styles.metabarLi}>
            <span>{t('productPage.views', { count: views })}</span>
          </li>
        )}
      </ul>
    </>
  );
};
