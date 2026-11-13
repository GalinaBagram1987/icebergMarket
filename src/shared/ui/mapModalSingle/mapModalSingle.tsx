'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FaTimes } from 'react-icons/fa';
import { useYandexMap } from '@/shared/lib';
import styles from './mapModal.module.css';

type MapModalProps = {
  isOpen: boolean;
  onClose: () => void;
  coordinates: [number, number] | null;
  error?: string | null;
};

export const MapModalSingle = ({ isOpen, onClose, coordinates, error }: MapModalProps) => {
  const [mounted, setMounted] = useState(false);

  // Хук вызывается всегда на верхнем уровне
  const { mapRef } = useYandexMap({ coordinates });

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

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.content} onClick={(e) => e.stopPropagation()}>
        <button type="button" className={styles.closeBtn} onClick={onClose} aria-label="Закрыть">
          <FaTimes />
        </button>

        {/* 
          Контейнер карты ВСЕГДА в DOM. 
          Скрываем его через display: none, пока нет координат или есть ошибка.
        */}
        <div ref={mapRef} className={styles.mapContainer} style={{ display: coordinates && !error ? 'block' : 'none' }} />

        {/* Лоадер или ошибка поверх контейнера */}
        {error && <div className={styles.loader}>{error}</div>}
        {!error && !coordinates && <div className={styles.loader}>Загрузка координат...</div>}
      </div>
    </div>,
    document.body,
  );
};
