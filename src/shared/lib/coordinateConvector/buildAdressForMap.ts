/**
 * Тип для функциисборки адреса
 */

export type buildAddressType = {
  city: string;
  street: string;
  house: string;
};

/**
 * Функция сборки адреса
 */

export const buildAddressForMap = ({ city, street, house }: buildAddressType) => {
  return `${city} ${street} ${house}`.trim();
};
