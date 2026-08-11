import type { StaticImageData } from 'next/image';

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

/** Тип аттрибута категории. Пока не знаем точную структуру attrs */
export type BackendCategoryAttr = unknown;

/**
 * Элемент списка категорий, полученный с бэка.
 * Сейчас используется в ответах с основными категориями
 * и подкатегориями первого уровня.
 */

export type BackendCategoryListItem = {
  id: number;
  parent_id: number | null;
  name: string;
  slug: string;
  full_path: string;
  is_leaf: boolean;
  attrs: BackendCategoryAttr[];
};
/**
 * Общий тип ответа бэка для основных  категорий и категори 1 типа
 */

export type BackendCategoryListResponse = {
  categories: BackendCategoryListItem[];
};

/**
 * Тип локальной картинки основной категории каталога
 */
export type MainCatalogImage = {
  id: number;
  src: StaticImageData;
  alt?: string | null;
};

/**
 * Основная категория собранного главного каталога
 */
export type MainCatalogNode = BackendCategoryListItem & {
  image: MainCatalogImage;
  children: BackendCategoryListItem[];
};

/**
 * Собранное дерево главного каталога
 */

export type MainCatalogTree = MainCatalogNode[];
