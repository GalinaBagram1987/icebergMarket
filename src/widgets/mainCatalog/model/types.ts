import type { StaticImageData } from 'next/image';
import { BackendMainCategory } from '@/shared/api/apiMethods/catalog/type';

/**
 * UI-настройки одной категории.
 */
export type MainCatalogUiConfigItem = {
  area: string;
  order: number;
  src: StaticImageData;
  alt?: string | null;
  bgColor: string;
  headerTitleSize?: string;
  leftMarginTitle?: string;
  headerHeight?: string;
  cardHeight?: string;
  listPaddingLeft?: string;
  listPaddingTop?: string;
  listPaggingRight?: string;
  listPaddindBottom?: string;
};

/**
 * UI-конфигурация категорий.
 * Ключ — slug категории.
 */
export type MainCatalogUiConfig = {
  [slug: string]: MainCatalogUiConfigItem | undefined;
};

/**
 *
 */

export type mainCatalogDataFrontItem = {
  name: string;
  slug: string;
  full_path: string;
};

export type mainCatalogDataFront = 

id: ;
order: ;
{
  subcategory: mainCatalogDataFrontItem[];
}



/**
 * Категория с бэкенда, объединённая с UI-настройками.
 */
export type MainCatalogItem = mainCatalogDataFront & MainCatalogUiConfigItem;

/**
 * Подготовленные данные главного каталога.
 */
export type MainCatalogData = {
  categories: MainCatalogItem[];
};
