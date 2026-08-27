import { composeMainCatalog } from '../lib/composeMainCatalog';
import { mainCatalogDataFront } from '../model/mainCatalogDataFront';
import type { MainCatalogData } from '../model/types';
import styles from './mainCatalog.module.css';
import { CatalogCard } from './catalogCard';
import { cn } from '@/shared/lib';
import { mainCatalogUiData } from '../model/uiConfigMainCatalog';

/**
 * Собираем хардкод данных каталога один раз на уровне файла
 */

const { categories }: MainCatalogData = composeMainCatalog(mainCatalogDataFront, mainCatalogUiData);

/**
 * Главный каталог (Сетка главного каталога)
 * Выстраивает карточки категорий в асимметричную Grid-структуру на основе свойства `gridArea`.
 */

export const MainCatalog: React.FC = () => {
  return (
    <div className={cn('containerContent', styles.margin)}>
      <div className={styles.grid}>
        {categories.map((item) => (
          <div
            key={item.slug}
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
