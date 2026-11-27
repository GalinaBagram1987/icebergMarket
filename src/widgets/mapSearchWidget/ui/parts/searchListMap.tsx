'use client';

import { useRef } from 'react';
import { useOpenFreeMapList } from '@/shared/lib/mapHooks/useOpenFreeMapList';
import type { MapPointOpenFreeMap } from '@/shared/lib';
import { Spinner } from '@/shared/ui/LoadingRender/spinner';
import styles from './parts.module.css';

/**
 * Тип копмонента карта на странце поиска
 */

export type SearchMapListProps = {
  points: MapPointOpenFreeMap[];
  activePointId?: string | null;
  isSplitView: boolean;
  onPointClick: (id: string) => void;
  onMapClick?: () => void;
};

/**
 * компонент карты для поиск товара по карте  
 */

export const SearchMapList = ({ points, activePointId = null, isSplitView, onPointClick, onMapClick }: SearchMapListProps) => {
  const { mapRef, isLoaded } = useOpenFreeMapList({
    points,
    activePointId,
    isSplitView,
    onPointClick,
    onMapClick,
  });

  return (
    <div className={`${styles.mapContainer} ${isSplitView ? styles.splitView : styles.fullView}`}>
      <div ref={mapRef} className={styles.mapCanvas} style={{ visibility: isLoaded ? 'visible' : 'hidden' }} />

      {!isLoaded && (
        <div className={styles.mapFallback}>
          <Spinner />
        </div>
      )}
    </div>
  );
};
