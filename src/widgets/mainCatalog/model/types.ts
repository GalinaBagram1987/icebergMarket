import type { StaticImageData } from 'next/image';

/**
 * Тип локальной картинки для основной категории каталога.
 * Используется для связывания изображения с категорией по её slug.
 * Применяется в виджете mainCatalog для рендеринга иконок категорий.
 */
export type MainCatalogImage = {
  slug: string;
  src: StaticImageData;
  alt?: string | null;
};
