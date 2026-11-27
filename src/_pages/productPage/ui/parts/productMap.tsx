'use client';

import { useState } from 'react';
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
  const { mapRef } = useOpenFreeMapSingle({ coordinates: coordinates });

  if (!coordinates) {
    setError('Кординаты не определены');
    return;
  }

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
