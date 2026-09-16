import Link from 'next/link';
import styles from './subcategoryList.module.css';
import { serverFetchAndCashedCategory } from '@/entities/category';

export const SubcategoryList = async ({ path }: { path: string }) => {
  const subcategories = await serverFetchAndCashedCategory(path);

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
