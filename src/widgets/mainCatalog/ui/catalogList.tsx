import styles from './mainCatalog.module.css';
import type { MainCatalogCategory } from '../model/types';

/**
 * Типы для списка подкатегорий на главной
 */

interface CatalogListProps {
  item: MainCatalogCategory;
}

/**
 * Список подкатегорий. входит в карточку каталога
 */

export const CatalogList = ({ item }: CatalogListProps) => {
  const subcategories = item.subcategories || [];
  return (
    <div className={styles.catalogListContainer}>
      <ul>
        {subcategories.map((child) => (
          <li key={child.slug}>{child.name}</li>
        ))}
      </ul>
    </div>
  );
};
