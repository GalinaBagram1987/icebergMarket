import type { BackendMainCategory } from '@/shared/api/apiMethods/catalog/type';
import type { MainCatalogUiConfig, MainCatalogData } from '../model/types';

/**
 * Функция объединяет данные с бэкенда с UI-конфигруацией
 * сортирует по порядку экранирования компонентов
 * @param categories
 * @param uiConfig
 * @returns каталог с объединенными данными
 */

export const composeMainCatalog = (categories: BackendMainCategory[], uiConfig: MainCatalogUiConfig): MainCatalogData => {
  const result = categories
    .flatMap((category) => {
      const ui = uiConfig[category.slug];
      if (!ui) {
        return [];
      }

      return [
        {
          ...category,
          ...ui,
        },
      ];
    })
    .sort((a, b) => a.order - b.order);
  return {
    categories: result,
  };
};
