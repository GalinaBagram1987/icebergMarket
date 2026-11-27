'use client';

import { useOpenFreeMapSingle } from '@/shared/lib';
import styles from './parts.module.css';
import { Spinner } from '@/shared/ui/LoadingRender/spinner';

/**
 * Тип для карты
 */

export type ProductMapProps = {
  coordinates?: [number, number] | null; // [longitude, latitude] - for maplibre
};

/**
 * компонент карты на странице товара
 */

export const ProductMap = ({ coordinates }: ProductMapProps) => {
  const { mapRef, isLoaded } = useOpenFreeMapSingle({ coordinates: coordinates ?? null });
  return (
    <div className={styles.mapContainer}>
      {/* Контейнер карты всегда в DOM, чтобы mapRef.current существовал */}
      <div ref={mapRef} className={styles.mapCanvas} style={{ visibility: isLoaded ? 'visible' : 'hidden' }} />

      {!isLoaded && (
        <div className={styles.mapFallback}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
