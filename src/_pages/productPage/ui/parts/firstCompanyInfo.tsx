import { useEffect, useState } from 'react';
import { getAddressByCoordinates } from '@/shared/lib';
/**
 * Типы к первому инфо-блоку о компании на странице товара
 */
export type FirstComponyInfoProps = {
  productSaler: string;
  coordinates: [number, number] | null;
};

/**
 * Первый инфо блок о компании на странице товара
 */

export const FirstComponyInfo = (coordinates: [number, number] | null) => {
  const [address, setAddress] = useState('Загрузка...');
};
