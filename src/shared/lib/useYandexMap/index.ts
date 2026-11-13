'use client';

import { useEffect, useRef } from 'react';

type UseYandexMapProps = {
  coordinates?: [number, number] | null;
  zoom?: number;
  controls?: string[];
};

const DEFAULT_CONTROLS = ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl'];

export const useYandexMap = ({ coordinates, zoom = 15, controls = DEFAULT_CONTROLS }: UseYandexMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const placemarkRef = useRef<any>(null);

  // Инициализация карты
  useEffect(() => {
    const ymaps = (window as any).ymaps;
    if (!ymaps || !mapRef.current || !coordinates || mapInstanceRef.current) {
      return;
    }

    let cancelled = false;

    const initMap = () => {
      if (cancelled || !mapRef.current || mapInstanceRef.current) return;

      try {
        mapInstanceRef.current = new ymaps.Map(mapRef.current, {
          center: coordinates,
          zoom,
          controls,
        });

        placemarkRef.current = new ymaps.Placemark(coordinates, {}, { preset: 'islands#redDotIcon' });

        mapInstanceRef.current.geoObjects.add(placemarkRef.current);
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
  }, [coordinates]);

  // Обновление центра и метки
  useEffect(() => {
    if (!mapInstanceRef.current || !coordinates) return;

    try {
      mapInstanceRef.current.setCenter(coordinates, zoom);
      placemarkRef.current?.geometry.setCoordinates(coordinates);
    } catch (error) {
      console.error('Ошибка при обновлении координат карты:', error);
    }
  }, [coordinates, zoom]);

  // Безопасная очистка при размонтировании
  useEffect(() => {
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error('Ошибка при удалении инстанса карты:', error);
        } finally {
          mapInstanceRef.current = null;
          placemarkRef.current = null;
        }
      }
    };
  }, []);

  return { mapRef };
};
