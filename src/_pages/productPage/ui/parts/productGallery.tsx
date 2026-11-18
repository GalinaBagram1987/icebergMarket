'use client';
import { useState, useEffect } from 'react';
import styles from './productGallery.module.css';
import { cn } from '@/shared/lib';
import { FaTimes } from 'react-icons/fa';
import { createPortal } from 'react-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

/**
 * Типы к галее в продукте
 */

export type ProductGalleryProps = {
  title: string;
  images: string[];
  className?: string;
};

/**
 * Галерея товара  на странице продукта
 */

const PLACEHOLDER_IMAGE = '/img/product-placeholder.jpg';

export const ProductGallery = ({ title, images }: ProductGalleryProps) => {
  const displayImages = images.slice(0, 3);
  const total = displayImages.length;

  // Индекс текущего главного фото на странице (по умолчанию 0)
  const [mainPhoto, setMainPhoto] = useState<number>(0);
  // Индекс фото в полноэкранном режиме (null = модалка закрыта)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpenPhoto = () => setSelectedIndex(mainPhoto);
  const handleClose = () => {
    if (selectedIndex !== null) {
      setMainPhoto(selectedIndex);
    }
    setSelectedIndex(null);
  };

  const handleMainPhoto = (index: number) => {
    setMainPhoto(index);
  };

  // Листание стрелками в полноэкранном режиме
  const handlePrevModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev - 1 + total) % total : 0));
  };

  const handleNextModal = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev !== null ? (prev + 1) % total : 0));
  };

  // для кнопок с клавиатуры
  useEffect(() => {
    if (selectedIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrevModal();
      if (e.key === 'ArrowRight') handleNextModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, total]);

  if (total === 0) {
    return (
      <div className={styles.galleryWrapper}>
        <div className={styles.mainImageBox}>
          <img src={PLACEHOLDER_IMAGE} alt={title} className={styles.firstImage} />
        </div>
      </div>
    );
  }

  return (
    <div className={styles.galleryWrapper}>
      {total > 0 ? (
        <div className={cn(styles.imageGrid, total <= 1 && styles.singleGrid)}>
          {/* Главное фото (занимает 1-ю колонку и все 4 строки по высоте) */}
          <img src={displayImages[mainPhoto]} alt={`${title} фото ${mainPhoto + 1}`} onClick={handleOpenPhoto} className={styles.firstImage} />

          {/* Боковые миниатюры (встают во 2-ю колонку друг под другом) */}
          {total > 1 && displayImages.map((imgUrl, index) => <img key={`${imgUrl}-${index}`} src={imgUrl} alt={`${title} фото ${index + 1}`} onClick={() => handleMainPhoto(index)} className={cn(styles.galleryImage, index === mainPhoto && styles.activeImage)} />)}
        </div>
      ) : (
        <div className={cn(styles.imageGrid, styles.singleGrid)}>
          <img src={PLACEHOLDER_IMAGE} alt={title} className={styles.firstImage} />
        </div>
      )}

      {/* Полноэкранный режим со стрелками */}
      {selectedIndex !== null &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className={styles.fullScreenPhoto} onClick={handleClose}>
            <div className={styles.modalBox} onClick={(e) => e.stopPropagation()}>
              <img src={displayImages[selectedIndex]} alt={`${title} фото ${selectedIndex + 1}`} className={styles.fullscreenImage} />

              {total > 1 && (
                <>
                  <button type="button" className={cn(styles.arrowBtn, styles.arrowLeft)} onClick={handlePrevModal} aria-label="Предыдущее фото">
                    <FaChevronLeft />
                  </button>
                  <button type="button" className={cn(styles.arrowBtn, styles.arrowRight)} onClick={handleNextModal} aria-label="Следующее фото">
                    <FaChevronRight />
                  </button>
                </>
              )}

              <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Закрыть">
                <FaTimes />
              </button>
            </div>
          </div>,
          document.body,
        )}
    </div>
  );
};
