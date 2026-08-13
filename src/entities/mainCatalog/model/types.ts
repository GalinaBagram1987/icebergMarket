import type { StaticImageData } from 'next/image';
import type { BackendCategoryListItem } from '@/shared/api/apiMethods/catalog';

/**
 * У бэка есть 2 типа эндпоинтов для главного каталога:
 * 1. Основные категории каталога.
 * 2. Подкатегории 1 уровня для каждой основной категории.
 *
 * Для быстрой загрузки, удобной передачи на фронт и SEO
 * данные собираются в единое дерево главного каталога.
 *
 * В файле собраны типы, необходимые для сборки единого дерева каталога.
 */

/**
 * Тип локальной картинки основной категории каталога
 */
export type MainCatalogImage = {
  slug: string;
  src: StaticImageData;
  alt?: string | null;
};

/**
 * Основная категория собранного главного каталога
 */
export type MainCatalogNode = BackendCategoryListItem & {
  // image: MainCatalogImage;
  children: BackendCategoryListItem[];
};

/**
 * Собранное дерево главного каталога
 */

export type MainCatalogTree = MainCatalogNode[];
