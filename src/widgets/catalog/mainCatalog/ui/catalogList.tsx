import styles from './mainCatalog.module.css';
import type { MainCatalogCategory } from '../model/types';
import { cn } from '@/shared/lib';
import Link from 'next/link';

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
              <Link href={child.full_path}>{child.name}</Link>
              {child.hasSeparator && '\u00A0\—\u00A0'}
            </li>
          );
        })}
      </ul>
    </div>
  );
};
