import { useState } from 'react';
import styles from './productGallery.module.css';
import { cn } from '@/shared/lib';
import { FaTimes } from 'react-icons/fa';

/**
 * Типы к галее в продукте
 */

export type ProductGalleryProps = {
  title: string;
  images: string[];
};

/**
 * Галерея товара  на странице продукта
 */

const PLACEHOLDER_IMAGE = '/img/noPhoto.jpg';

export const ProductGallery = ({ title, images }: ProductGalleryProps) => {
  const displayImages = images.slice(0, 4);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const handleOpenPhoto = (index: number) => setSelectedIndex(index);
  const handleClose = () => setSelectedIndex(null);

  return (
    <div className={styles.galleryWrapper}>
      {displayImages.length > 0 ? (
        <div className={styles.imageGrid}>
          {displayImages.map((imgUrl, index) => (
            <img key={`${imgUrl}-${index}`} src={imgUrl} alt={`${title} фото ${index + 1}`} onClick={() => handleOpenPhoto(index)} className={cn(styles.galleryImage, index === 0 ? styles.firstImage : styles.thumbImage)} />
          ))}
        </div>
      ) : (
        /* Выводим картинку из public, если массив пустой */
        <div className={styles.imageGrid}>
          <img src={PLACEHOLDER_IMAGE} alt={title} className={cn(styles.galleryImage, styles.firstImage)} />
        </div>
      )}

      {/* Полноэкранный режим, если выбран индекс фото */}
      {selectedIndex !== null && (
        <div className={styles.fullScreenPhoto} onClick={handleClose}>
          <img src={displayImages[selectedIndex]} alt={title} className={styles.fullscreenImage} onClick={(e) => e.stopPropagation()} />
          <button type="button" className={styles.closeBtn} onClick={handleClose} aria-label="Закрыть">
            <FaTimes />
          </button>
        </div>
      )}
    </div>
  );
};
