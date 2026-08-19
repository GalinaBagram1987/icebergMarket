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
  hoverColor: string;
};

/**
 * UI-конфигурация категорий.
 * Ключ — slug категории.
 */
export type MainCatalogUiConfig = {
  [slug: string]: MainCatalogUiConfigItem | undefined;
};

/**
 * Категория с бэкенда, объединённая с UI-настройками.
 */
export type MainCatalogItem = BackendMainCategory & MainCatalogUiConfigItem;

/**
 * Подготовленные данные главного каталога.
 */
export type MainCatalogData = {
  categories: MainCatalogItem[];
};
