/**
 * Типы для конверктора координат
 */

export type CoordinateConvectorProps = {
  coordinates: [longitude: number, latitude: number];
};

/**
 * Бэк отдает долгота, широта
 * Яндекс принимает широта, долгота.
 * Функция конвертирует координаты как нужно яндексу
 */

export const CoordinateConvector = (props: CoordinateConvectorProps) => {
  const coordinates = props.coordinates;
  const [longitude, latitude] = coordinates;
  const BASE_COORDINATES: [number, number] = [43.5853, 39.7203];
  if (longitude == null || latitude == null) {
    return BASE_COORDINATES;
  }

  return [latitude, longitude];
};
