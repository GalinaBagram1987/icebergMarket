import Link from 'next/link';
import styles from './breadcrumbsItem.module.css';
import { getTranslations } from 'next-intl/server';

/**
 * Типы для комонента хлебных крошек
 */

export type BreadcrumbsUiProps = {
  name: string;
  path?: string;
};

/**
 * Визуальное отображение хлебных крошек
 */

export const BreadcrumbsUi = async ({ items, mainLabel }: { items: BreadcrumbsUiProps[]; mainLabel: string }) => {
  const t = await getTranslations('icebergMarket');
  return (
    <nav className={styles.breadcrumbs} aria-label="Хлебные крошки">
      <ul className={styles.list}>
        {/* Главная страница (есть всегда) */}
        <li className={styles.item}>
          <Link href="/" className={styles.link}>
            {t('breadcrumbs.main')}
          </Link>
          <span aria-hidden="true" className={styles.separator}>
            {'>'}
          </span>
        </li>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={item.path || item.name} className={styles.item} aria-current={isLast ? 'page' : undefined}>
              {!isLast && item.path ? (
                <>
                  <Link className={styles.link} href={`/${item.path}`}>
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className={styles.separator}>
                    &gt;
                  </span>
                </>
              ) : (
                <span className={styles.current}>{item.name}</span>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
