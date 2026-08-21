import styles from './mainCatalogUiConfig.module.css';

export const CatalogList = ({ item }: { item: any }) => {
  const children = item.children || [];
  return (
    <div className={styles.catalogListContainer}>
      <ul>
        {children.map((child: any) => (
          <li key={child.id}>child.name</li>
        ))}
      </ul>
    </div>
  );
};
