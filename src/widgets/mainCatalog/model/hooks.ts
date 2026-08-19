import { useQuery } from '@tanstack/react-query';
import { MainCatalogQueryOptions } from '@/entities/mainCatalog';
import { composeMainCatalog } from '../lib/composeMainCatalog';
import { mainCatalogUiConfig } from './uiConfigMainCatalog';

/**
 * Хук основного каталога.
 * Получает и кеширует данные с бэкенда,
 * объединяет их с UI-конфигурацией
 * и возвращает подготовленные данные для рендера.
 */

export const useMainCatalogQuery = () =>
  useQuery({
    ...MainCatalogQueryOptions,
    select: (categories) => composeMainCatalog(categories, mainCatalogUiConfig),
  });
