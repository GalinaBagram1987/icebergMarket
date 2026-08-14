import type { StaticImageData } from 'next/image';

/**
 * Тип локальной картинки для основной категории каталога.
 * Используется для связывания изображения с категорией по её slug.
 * Применяется в виджете mainCatalog для рендеринга иконок категорий.
 */
export type MainCatalogUiConfig = Record<
  string,
  {
    area: string;
    order: number;
    src: StaticImageData;
    alt?: string | null;
    bgColor: string;
    hoverColor: string;
  }
>;
