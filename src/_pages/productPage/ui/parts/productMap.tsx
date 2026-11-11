'use client';

import { useEffect, useRef } from 'react';
import { getCoordinatesByAddress } from '@/shared/lib';
import styles from './parts.module.css';

/**
 * Тип для карты
 */

export type ProductMapProps = {
  address: string;
};

/**
 * компонент карты на странице товара
 */

export const ProductMap = ({ address }: ProductMapProps) => {
  const coordinates = getCoordinatesByAddress(address);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Проверяем, что API Яндекс.Карт доступно в глобальном объекте window
    const ymaps = (window as any).ymaps;

    if (!ymaps || !mapRef.current) return;

    // Функция инициализации карты
    const initMap = () => {
      // Защита от повторного рендеринга (если карта уже создана — просто двигаем центр)
      if (mapInstanceRef.current) {
        mapInstanceRef.current.setCenter(coordinates, 15);
        return;
      }

      //  Создаем саму карту в нашем контейнере ref
      mapInstanceRef.current = new ymaps.Map(mapRef.current, {
        center: coordinates,
        zoom: 15,
        // Оставляем только нужные элементы управления, как на вашем макете
        controls: ['zoomControl', 'fullscreenControl', 'typeSelector', 'geolocationControl'],
      });

      // Добавляем красную маркерную точку (Placemark)
      const placemark = new ymaps.Placemark(
        coordinates,
        {},
        {
          preset: 'islands#redDotIcon', // Красный маркер как на скриншоте
        },
      );

      mapInstanceRef.current.geoObjects.add(placemark);
    };

    // Яндекс требует, чтобы инициализация происходила внутри ymaps.ready
    ymaps.ready(initMap);

    // Чистим за собой инстанс карты при размонтировании компонента страницы
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [coordinates]);

  return (
    /* Контейнер карты с вашими скруглениями */
    <div className={styles.mapContainer}>
      <div ref={mapRef} className={styles.mapCanvas} />
    </div>
  );
};
