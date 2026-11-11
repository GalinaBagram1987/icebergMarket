/**
 * Функция  конвектора адреса в координаты
 */

export const getCoordinatesByAddress = async (address: string): Promise<[number, number]> => {
  if (!address.trim()) {
    throw new Error('Передана пустая строка адреса');
  }

  const ymaps = (window as any).ymaps;
  if (!ymaps || !ymaps.geocode) {
    throw new Error('API Яндекс.Карт не инициализировано');
  }

  const response = await ymaps.geocode(address);
  const firstGeoObject = response.geoObjects.get(0);

  if (!firstGeoObject) {
    throw new Error('Не удалось определить координаты для указанного адреса');
  }

  // Яндекс возвращает [Широта, Долгота]
  const yandexCoords: [number, number] = firstGeoObject.getCoordinates();

  return yandexCoords;
};
