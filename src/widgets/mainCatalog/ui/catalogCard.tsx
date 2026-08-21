import styles from './mainCatalogUiConfig.module.css';
import { CatalogList } from './catalogList';
import { CatalogHeader } from './catalogHeader';

export const CatalogCard = ({ item }: { item: any }) => {
  return (
    <div
      className={styles.catalogCard}
      style={{
        '--header-title-size': item.headerTitleSize,
        '--left-margin-size': item.leftMarginTitle,
        '--header-height': item.headerHeight,
        '--card-height': item.cardHeight,
        '--list-padding-left': item.listPaddingLeft,
        '--list-padding-top': item.listPaddingTop,
        '--list-padding-right': item.listPaggingRight,
        '--list-padding-bottom': item.listPaddindBottom,
      }}
    >
      <CatalogHeader item={item} />
      {item.children && item.children.length > 0 && <CatalogList item={item} />}
    </div>
  );
};
