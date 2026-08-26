import styles from './mainCatalog.module.css';

export const CatalogList = ({ item }: { item: any }) => {
  const subcategories = item.subcategory || [];
  return (
    <div className={styles.catalogListContainer}>
      <ul>
        {subcategories.map((child: any) => (
          <li key={child.id}>{child.name}</li>
        ))}
      </ul>
    </div>
  );
};
