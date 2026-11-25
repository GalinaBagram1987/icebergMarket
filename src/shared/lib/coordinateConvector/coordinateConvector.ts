/**
 * Бэк возвращает longLat
 * карта принимает latLong
 * конвектор данных
 */

export type BackendMapPoint = {
  id: string;
  coordinates: [number, number]; // long, lat whith backend
};

export type MapPoint = {
  id: string;
  coordinates: [number, number]; // lat, long for frontend and maps
};

export const coordinateConvector = ({ id, coordinates }: BackendMapPoint): MapPoint => {
  const [long, lat] = coordinates;
  return {
    id,
    coordinates: [lat, long],
  };
};
