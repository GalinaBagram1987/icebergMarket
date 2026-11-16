'use client';

import { useEffect, useState } from 'react';
import { buildAddressForMap } from '@/shared/lib';
import { getCoordinatesByAddress } from '@/shared/lib';
import { useYandexMap } from '@/shared/lib';
import styles from './parts.module.css';
import { Spinner } from '@/shared/ui/LoadingRender/spinner';

/**
 * Тип для карты
 */

export type ProductMapProps = {
  address?: {
    city?: string;
    street?: string;
    house?: string;
  };
};

/**
 * компонент карты на странице товара
 */

export const ProductMap = ({ address }: ProductMapProps) => {
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fullAddress = buildAddressForMap(address);
  const { mapRef } = useYandexMap({ coordinates: coords });

  useEffect(() => {
    if (!fullAddress) {
      setError('Адрес не указан');
      return;
    }

    let isCancelled = false;

    const fetchCoords = async () => {
      try {
        setError(null);
        const yandexCoords = await getCoordinatesByAddress(fullAddress);
        if (!isCancelled) {
          setCoords(yandexCoords);
        }
      } catch (error) {
        console.error('Ошибка геокодирования в ProductMap:', error);
        if (!isCancelled) {
          setError('Не удалось загрузить карту по указанному адресу');
        }
      }
    };

    fetchCoords();

    return () => {
      isCancelled = true;
    };
  }, [fullAddress]);

  return (
    <div className={styles.mapContainer}>
      {/* Контейнер карты всегда в DOM, чтобы mapRef.current существовал */}
      <div ref={mapRef} className={styles.mapCanvas} style={{ display: coords && !error ? 'block' : 'none' }} />

      {error && <div className={styles.mapFallback}>{error}</div>}
      {!error && !coords && (
        <div className={styles.mapFallback}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
