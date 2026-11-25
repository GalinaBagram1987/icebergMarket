'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { useOpenFreeMapSingle } from '@/shared/lib';
import styles from './mapModalSingle.module.css';
import { Spinner } from '../LoadingRender/spinner';

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  coordinates: [number, number] | null;
  error?: string | null;
};

/**
 * Карта внутри модалки.
 * монтируется при открытии. Удаляется при закрытии модалки
 */

const MapModalInner = ({ onClose, coordinates, error }: Omit<MapModalProps, 'isOpen'>) => {
  const { mapRef } = useOpenFreeMapSingle({ coordinates });
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <FaTimes />
        </button>

        <div ref={mapRef} className={styles.mapContainer} style={{ visibility: coordinates && !error ? 'visible' : 'hidden' }} />

        {error && <div className={styles.loader}>{error}</div>}
        {!error && !coordinates && (
          <div className={styles.loader}>
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Модальное окно для одного компонента
 */

export const MapModalSingle = ({ isOpen, onClose, coordinates, error }: MapModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Защита для createPortal (SSR/гидратация)
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Закрытие по Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  // Блокировка скролла body
  useEffect(() => {
    if (!isOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  // Если модалка закрыта или еще не смонтирована — ничего не рендерим
  if (!isOpen || !mounted) return null;

  return createPortal(<MapModalInner onClose={onClose} coordinates={coordinates} error={error} />, document.body);
};
