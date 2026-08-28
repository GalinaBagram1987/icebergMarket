import styles from './mainCatalog.module.css';
import type { MainCatalogCategory } from '../model/types';
import { cn } from '@/shared/lib';

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
        {subcategories.map((child) => {
          const inlineClass = child.inline ? styles.inlineItem : '';
          const dotsClass = child.isDots ? styles.dotsItem : '';

          return (
            <li key={child.slug} className={cn(inlineClass, dotsClass)}>
              <a href={child.full_path}>{child.name}</a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
