import Link from 'next/link';
import styles from './subcategoryList.module.css';
import { serverFethcAndCachedSubcategory } from '@/entities/catalog/api/fetchAndCashedSubcategory';

export const SubcategoryList = async ({ path }: { path: string }) => {
  const data = await serverFethcAndCachedSubcategory(path);
  // Информация о текущей подкатегории (например, имя, слаг)
  const categoryInfo = data.category;
  // Массив вложенных детей берем строго из поля .categories, как возвращает бэк
  const childrenInfo = data.categories;

  if (!childrenInfo || childrenInfo.length === 0) return null;

  return (
    <div className={styles.subcategoryList}>
      {childrenInfo.map((subcat) => {
        // Защищаем URL: кодируем спецсимволы (запятые, апострофы, слэши) из базы бэка
        const safePath = encodeURI(subcat.path);
        return (
          <div key={subcat.id} className={styles.subcategoryItem}>
            <Link className={styles.subcategoryLink} href={`/${safePath}`}>
              <span className={styles.itemText}>{subcat.name}</span>
              <span className={styles.itemNum}>{subcat.count ? Number(subcat.count).toLocaleString('ru-RU') : 0}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
};
