import Link from 'next/link';
import type { CategoryTagsProps } from '../model/type';
import styles from './subcategoryList.module.css';

export const SubcategoryList = ({ subcategories }: CategoryTagsProps) => {
  if (!subcategories || subcategories.length === 0) return null;

  return (
    <div className={styles.subcategoryList}>
      {subcategories.map((subcat) => {
        // Защищаем URL: кодируем спецсимволы (запятые, апострофы, слэши) из базы бэка
        const safePath = encodeURI(subcat.path);
        return (
          <div key={subcat.id} className={styles.subcategoryItem}>
            <Link className={styles.subcategoryLink} href={`/${safePath}`}>
              <span className={styles.itemText}>{subcat.name}</span>
              <span className={styles.itemNum}>{subcat.count}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
