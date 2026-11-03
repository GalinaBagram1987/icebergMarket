import type { AttributeItem, BackendAttributes } from '@/shared/api/apiMethods/catalog/type';

/**
 * нормализует данные атрибутов которые пришли с бэка
 * @param attributes
 * @returns объект с данными
 */

export const normalizeAttributes = (attributes: BackendAttributes): AttributeItem[] => {
  if (Array.isArray(attributes)) {
    const firstItem = attributes[0];
    if (firstItem && typeof firstItem === 'object' && 'key' in firstItem) {
      return attributes as AttributeItem[];
    }
    return [];
  }

  if (attributes && typeof attributes === 'object') {
    return Object.entries(attributes).map(([key, value]) => ({
      key,
      value: value as string | number | boolean, // кастуем к примитивам, так как Record описывает их
    }));
  }

  return [];
};
