import styles from './mainCatalog.module.css';
import { cn } from '@/shared/lib';

export const CatalogHeader = ({ item }: { item: any }) => {
  const bgClassFromModule = item.bgColor === 'headerBgFirstVar' ? styles.headerBgFirstVar : styles.headerBgSecondVar;
  const imgSrcString = item.src?.src || item.src;
  return (
    <div className={cn(styles.catalogHeader, bgClassFromModule)}>
      <img src={imgSrcString} alt={item.alt} />
      <h3 className={styles.headerTitle}>{item.name}</h3>
    </div>
  );
};
