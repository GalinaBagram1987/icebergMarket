'use client';

import { useEffect, useRef } from 'react';

/**
 * Тип для одной точки
 */

export type MapPointItem = {
  id: string | number;
  coordinates: [number, number];
};

/**
 * Тип для списка точек
 */

export type UseYandexMapListProps = {
  points: MapPointItem[];
  activePointId?: string | number | null;
  defaultCenter?: [number, number];
  defaultZoom?: number;
  controls?: string[];
  onPointClick?: (id: string | number) => void;
  onMapClick?: () => void;
};

/**
 * Дефолтные координаты и настройки
 */

const DEFAULT_CONTROLS = ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl'];
const DEFAULT_CENTER: [number, number] = [43.5855, 39.7231];

/**
 * Хук инициализации яндекс-карт для поиска по карте
 * выдает список точек на карте
 * есть клик по точке. посдветка активной точки
 */

export const useYandexMapList = ({ points, activePointId = null, defaultCenter = DEFAULT_CENTER, defaultZoom = 11, controls = DEFAULT_CONTROLS, onPointClick, onMapClick }: UseYandexMapListProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const collectionRef = useRef<any>(null);
  const placemarksMapRef = useRef<Map<string | number, any>>(new Map());

  const callbacksRef = useRef({ onPointClick, onMapClick });
  callbacksRef.current = { onPointClick, onMapClick };

  // 1. Инициализация карты
  useEffect(() => {
    const ymaps = (window as any).ymaps;
    if (!ymaps || !mapRef.current || mapInstanceRef.current) {
      return;
    }

    let cancelled = false;

    const initMap = () => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      try {
        const initialCenter = points.length > 0 ? points[0].coordinates : defaultCenter;

        const map = new ymaps.Map(mapRef.current, {
          center: initialCenter,
          zoom: defaultZoom,
          controls,
        });

        const collection = new ymaps.GeoObjectCollection();

        // Клик по точке -> Состояние В
        collection.events.add('click', (e: any) => {
          e.stopPropagation();
          const target = e.get('target');
          const clickedId = target?.properties.get('itemId');

          if (clickedId !== undefined) {
            callbacksRef.current.onPointClick?.(clickedId);
          }
        });

        // Клик по пустой области карты -> Состояние А
        map.events.add('click', () => {
          callbacksRef.current.onMapClick?.();
        });

        map.geoObjects.add(collection);
        mapInstanceRef.current = map;
        collectionRef.current = collection;
      } catch (error) {
        console.error('Ошибка при инициализации Яндекс.Карты:', error);
      }
    };

    try {
      ymaps.ready(initMap);
    } catch (error) {
      console.error('Ошибка ожидания ymaps.ready:', error);
    }

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2. Отрисовка всех точек
  useEffect(() => {
    const ymaps = (window as any).ymaps;
    const map = mapInstanceRef.current;
    const collection = collectionRef.current;

    if (!ymaps || !map || !collection) return;

    try {
      collection.removeAll();
      placemarksMapRef.current.clear();

      if (points.length === 0) return;

      points.forEach((point) => {
        const isSelected = point.id === activePointId;
        const placemark = new ymaps.Placemark(point.coordinates, { itemId: point.id }, { preset: isSelected ? 'islands#redDotIcon' : 'islands#blueDotIcon' });

        placemarksMapRef.current.set(point.id, placemark);
        collection.add(placemark);
      });

      const bounds = collection.getBounds();
      if (bounds) {
        map.setBounds(bounds, {
          checkZoomRange: true,
          zoomMargin: 40,
        });
      }
    } catch (error) {
      console.error('Ошибка при обновлении точек на карте:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [points]);

  // 3. Подсветка активной точки при клике (Состояние В) без перерисовки всей карты
  useEffect(() => {
    placemarksMapRef.current.forEach((placemark, id) => {
      const isSelected = id === activePointId;
      placemark.options.set('preset', isSelected ? 'islands#redDotIcon' : 'islands#blueDotIcon');
    });
  }, [activePointId]);

  // 4. Очистка при размонтировании
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error('Ошибка при удалении инстанса карты:', error);
        } finally {
          mapInstanceRef.current = null;
          collectionRef.current = null;
          placemarksMapRef.current.clear();
        }
      }
    };
  }, []);

  return { mapRef };
};
