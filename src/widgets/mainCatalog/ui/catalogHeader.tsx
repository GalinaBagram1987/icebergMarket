import { MainCatalogCategory } from '../model/types';
import styles from './mainCatalog.module.css';
import { cn } from '@/shared/lib';

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

  return (
    <div className={cn(styles.catalogHeader, bgClassFromModule)}>
      <img src={imgSrcString} alt={item.alt ?? ''} />
      <h3 className={styles.headerTitle}>{item.name}</h3>
    </div>
  );
};
