import type { StaticImageData } from 'next/image';
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
 * Содержание 1 категории главного каталога
 */

export type mainCatalogDataFrontCategory = {
  name: string;
  slug: string;
  full_path: string;
  inline?: boolean;
  isDots?: boolean;
  hasSeparator?: boolean;
};

/**
 * Содержание всего главного каталога
 */

export type mainCatalogDataFront = mainCatalogDataFrontCategory & {
  subcategories: mainCatalogDataFrontCategory[];
};

/**
 * Категория главного каталога, объединённая с UI-настройками.
 */
export type MainCatalogCategory = mainCatalogDataFront & MainCatalogUiConfigItem;

/**
 * Подготовленные данные главного каталога.
 */
export type MainCatalogData = {
  categories: MainCatalogCategory[];
};
