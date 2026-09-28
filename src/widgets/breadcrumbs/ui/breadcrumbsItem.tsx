import Link from 'next/link';
import type { BackendCategoryItem } from '@/shared/api/apiMethods/catalog';
import styles from './breadcrumbsItem.module.css';
import { getTranslations } from 'next-intl/server';
/**
 * Типы для комонента хлебных крошек
 */

export type BreadcrumbsProps = {
  currentCategory: BackendCategoryItem;
  parentCategory: BackendCategoryItem;
};

/**
 * Визуальное отображение хлебных крошек
 */

export const Breadcrumbs = async ({ currentCategory, parentCategory }: BreadcrumbsProps) => {
  const t = await getTranslations('icebergMarket');
  if (!currentCategory || !parentCategory) return null;

  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <ul className={styles.list}>
        <li>
          <Link href="/" className={styles.link}>
            {t('breadcrumbs.main')}
          </Link>
          <span aria-hidden="true" className={styles.separator}>
            {'>'}
          </span>
        </li>
        {parentCategory && (
          <li>
            <Link className={styles.link} href={`/${parentCategory.path}`}>
              {parentCategory.name}
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};
