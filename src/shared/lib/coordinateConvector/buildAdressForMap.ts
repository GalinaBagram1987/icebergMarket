/**
 * Тип для функциисборки адреса
 */

export type BuildAddressType = {
  city?: string;
  street?: string;
  house?: string;
};

/**
 * Функция сборки адреса
 */

export const buildAddressForMap = (address?: BuildAddressType | null): string => {
  if (!address) return '';
  return [address.city, address.street, address.house]
    .filter(Boolean) // убираем undefined/пустые строки
    .join(' ');
};
