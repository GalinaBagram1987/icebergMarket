/**
 * Функция  конвектора адреса в координаты
 */

export const getCoordinatesByAddress = async (address: string): Promise<[number, number]> => {
  const cleanAddress = address.trim();
  if (!cleanAddress) {
    throw new Error('Передана пустая строка адреса');
  }

  const geocoderKey = process.env.NEXT_PUBLIC_GEOKODER_KEY;
  if (!geocoderKey) {
    throw new Error('Не задан ключ NEXT_PUBLIC_GEOKODER_KEY');
  }

  const url = `https://geocode-maps.yandex.ru/1.x/?apikey=${geocoderKey}&geocode=${encodeURIComponent(cleanAddress)}&format=json&results=1`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Ошибка HTTP Геокодера: ${response.status}`);
  }

  const data = await response.json();

  // Безопасное извлечение массива
  const featureMember = data?.response?.GeoObjectCollection?.featureMember;

  if (!Array.isArray(featureMember) || featureMember.length === 0) {
    throw new Error('Не удалось определить координаты для указанного адреса');
  }

  // Безопасное извлечение строки координат
  const pos: string | undefined = featureMember[0]?.GeoObject?.Point?.pos;
  if (!pos) {
    throw new Error('Геокодер вернул объект без координат');
  }

  // Парсинг координат: Яндекс отдает "долгота широта"
  const [lng, lat] = pos.split(' ').map(Number);

  // Проверка на NaN и бесконечность
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) {
    throw new Error('Некорректный формат координат');
  }

  // Возвращаем кортеж [Широта, Долгота]
  return [lat, lng];
};
