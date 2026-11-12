'use client';

import { useEffect, useRef } from 'react';

/**
 * Тип хука инициализации карты
 */

type UseYandexMapProps = {
  coordinates?: [number, number] | null;
  zoom?: number;
};

/**
 * Хук инициализации карты. Нужен для использования во всех компонентах, где есть карта
 * @param coordinates, zoom
 * @returns  mapRef
 */

export const useYandexMap = ({ coordinates, zoom = 15 }: UseYandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);

  useEffect(() => {
    const ymaps = (window as any).ymaps;

    if (!ymaps || !mapRef.current || !coordinates) return;

    const initMap = () => {
      // Если карта уже создана — плавно обновляем центр и позицию метки
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(coordinates, zoom);
        if (placemarkRef.current) {
          placemarkRef.current.geometry.setCoordinates(coordinates);
        }
        return;
      }

      // Создаём новый экземпляр карты
      mapInstanceRef.current = new ymaps.Map(mapRef.current, {
        center: coordinates,
        zoom,
        controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl'],
      });

      // Создаём и сохраняем ссылку на метку
      placemarkRef.current = new ymaps.Placemark(
        coordinates,
        {},
        {
          preset: 'islands#redDotIcon',
        },
      );

      mapInstanceRef.current.geoObjects.add(placemarkRef.current);
    };

    ymaps.ready(initMap);

    // Очистка при размонтировании компонента
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
        placemarkRef.current = null;
      }
    };
  }, [coordinates, zoom]);

  return { mapRef };
};
