import styles from './mainCatalogUiConfig.module.css';
import { CatalogCard } from './catalogCard';

/**
 * Свойства компонента сетки главного каталога
 */

interface CatalogGridProps {
  /** Плоский массив объединенных данных категорий (Бэкенд + UI config) */
  categories: any[];
}

/**
 * Сетка главного каталога.
 * Выстраивает карточки категорий в асимметричную Grid-структуру на основе свойства `gridArea`.
 */

export const CatalogGrid: React.FC<CatalogGridProps> = ({ categories }) => {
  const hasCatalog = categories && categories.length > 0;

  if (!hasCatalog) {
    return null; // Или, например, <div className="empty">Каталог пуст</div>
  }

  return (
    <div className="container">
      <div className={styles.grid}>
        {categories.map((item) => (
          <div
            key={item.id}
            // Динамически связываем карточку с её законным местом в грид-карте
            style={{ gridArea: item.area }}
          >
            <CatalogCard item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};
