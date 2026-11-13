/**
 * Функция  конвектора адреса в координаты
 */

export const getCoordinatesByAddress = async (address: string): Promise<[number, number]> => {
  const cleanAddress = address.trim();
  if (!cleanAddress) {
    throw new Error('Передана пустая строка адреса');
  }

  const ymaps = (window as any).ymaps;
  if (!ymaps || !ymaps.geocode) {
    throw new Error('API Яндекс.Карт не инициализировано');
  }

  // дождаться полной готовности API (если ещё не готов)
  await new Promise<void>((resolve) => ymaps.ready(resolve));

  const response = await ymaps.geocode(cleanAddress);
  const firstGeoObject = response.geoObjects.get(0);

  if (!firstGeoObject) {
    throw new Error('Не удалось определить координаты для указанного адреса');
  }

  const coords = firstGeoObject.getCoordinates();
  if (!coords || coords.length < 2) {
    throw new Error('Геокодер вернул объект без координат');
  }

  return [coords[0], coords[1]];
};
