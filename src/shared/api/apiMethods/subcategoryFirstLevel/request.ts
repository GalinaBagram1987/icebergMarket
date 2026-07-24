import { apiWithInterceptors } from '../../configApi';
import { SubcategoryFirstLevel, SubcategoryFLevResponse } from './model';

/**
 * Функция запрашивает подкатегории первого уровня для переданного пути.
 * @param path - slug корневой категории (например, 'mebel')
 * @returns Массив подкатегорий первого уровня
 */

export const fetchSubcategoriesFLev = async (path: string): Promise<SubcategoryFirstLevel[]> => {
  // Запрос идет через экземпляр с интерцепторами
  const response = await apiWithInterceptors.get<SubcategoryFLevResponse>(`/posts/${path}`);
  return response.data.categories;
};
