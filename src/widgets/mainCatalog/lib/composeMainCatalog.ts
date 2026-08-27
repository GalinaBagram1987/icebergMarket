import type { MainCatalogUiConfig, MainCatalogCategory, mainCatalogDataFrontCategory, MainCatalogData } from '../model/types';

/**
 * Функция объединяет  текстовые данные с UI-конфигруацией
 * сортирует по порядку экранирования компонентов
 */

export const composeMainCatalog = (categoriesData: Record<string, mainCatalogDataFrontCategory>, uiConfig: MainCatalogUiConfig): MainCatalogData => {
  if (!categoriesData) {
    console.error('composeMainCatalog: categoriesData ис missing!');
    return { categories: [] };
  }

  const dataArray = Array.isArray(categoriesData) ? categoriesData : Object.values(categoriesData);

  const result = dataArray
    .flatMap((category) => {
      const ui = uiConfig[category.slug];
      if (!ui) {
        return [];
      }

      return [
        {
          name: category.name,
          slug: category.slug,
          full_path: category.full_path,
          subcategories: category.subcategories || [],
          ...ui,
        } as MainCatalogCategory,
      ];
    })
    .sort((a, b) => a.order - b.order);
  return {
    categories: result,
  };
};
