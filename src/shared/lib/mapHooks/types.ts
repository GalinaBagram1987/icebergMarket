/**
 * Здесь расплагаются типы для OpenFreeMap
 */

/**
 * Точка для карты OpenFreeMap (MapLibre GL)
 * Формат координат [long, lat] — совпадает с ответом бэкенда
 */
export type MapPointOpenFreeMap = {
  id: string;
  coordinates: [number, number]; // [long, lat]
};

/**
 * Параметры для хука одиночной карты (страница товара)
 */
export type UseOpenFreeMapSingleParams = {
  coordinates: [number, number] | null; // [long, lat]
  zoom?: number;
};

/**
 * Параметры для хука карты выдачи со списком пинов (поиск / раздел / подраздел)
 */
export type UseOpenFreeMapListParams = {
  points: MapPointOpenFreeMap[];
  activePointId: string | null;
  isSplitView: boolean;
  onPointClick: (id: string) => void;
  onMapClick?: () => void;
  defaultCenter?: [number, number]; // [long, lat], по умолчанию Сочи
  defaultZoom?: number;
};
