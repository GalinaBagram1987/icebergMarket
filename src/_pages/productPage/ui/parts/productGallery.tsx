import { useState } from 'react';
import styles from './productGallery.module.css';
import { cn } from '@/shared/lib';
import { FaTimes } from 'react-icons/fa';
// import { useTranslations } from 'next-intl';

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

export const productGallery = ({ title, images }: ProductGalleryProps) => {
  // клиентский компонент
  // const t = useTranslations('icebergMarket');

  const displayImages = images.slice(0, 4);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (displayImages.length === 0) {
    return null;
    // <div>{t('productPage.noPhoto')}</div>;
  }

  const handleOpenPhoto = (index: number) => setSelectedIndex(index);
  const handleClose = (index: number) => {
    setSelectedIndex(null);
  };

  return (
    <div className={styles.galleryWrapper}>
      <div className={styles.imageGrid}>
        {displayImages.map((imgUrl, index) => (
          <img key={`${imgUrl} ${index}`} src={`imgUrl`} alt={`${title} фото ${index + 1}`} onClick={() => handleOpenPhoto(index)} className={cn(styles.galleryImage, index === 0 ? styles.firstImage : styles.thumbImage)} />
        ))}
      </div>
      {}
    </div>
  );
};
