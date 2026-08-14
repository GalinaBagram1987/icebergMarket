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
 * Основная категория собранного главного каталога
 */
export type MainCatalogNode = BackendCategoryListItem & {
  children: BackendCategoryListItem[];
};

/**
 * Собранное дерево главного каталога
 */

export type MainCatalogTree = MainCatalogNode[];
