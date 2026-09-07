import { MainCatalogCategory } from '../model/types';
import styles from './mainCatalog.module.css';
import { cn } from '@/shared/lib';
import Link from 'next/link';

/**
 *  Типы для шапки карточки каталога главной страницы
 */

interface CatalogHeaderProps {
  item: MainCatalogCategory;
}

/**
 * Шапка карточки каталога главной страницы
 */

export const CatalogHeader = ({ item }: CatalogHeaderProps) => {
  const bgClassFromModule = item.bgColor === 'headerBgFirstVar' ? styles.headerBgFirstVar : styles.headerBgSecondVar;

  const imgSrcString = (item.src?.src || item.src) as string;

  const href = item.full_path.startsWith('/') ? item.full_path : `/${item.full_path}`;

  return (
    <div className={cn(styles.catalogHeader, bgClassFromModule)}>
      <img src={imgSrcString} alt={item.alt ?? ''} />
      <h3 className={styles.headerTitle}>
        <Link href={href}>{item.name}</Link>
      </h3>
    </div>
  );
};
