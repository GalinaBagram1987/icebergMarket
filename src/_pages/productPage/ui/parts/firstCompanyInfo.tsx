'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { ShowButtonPhone } from '@/features/showPhoneButton';
import styles from './parts.module.css';
import { FaTimes } from 'react-icons/fa';

/**
 * Типы к первому инфо-блоку о компании на странице товара
 */
export type FirstCompanyInfoProps = {
  productSeller: string;
  address?: {
    city?: string;
    street?: string;
    house?: string;
  };
  telephone: string;
  onMapClick?: () => void;
};

/**
 * Первый инфо блок о компании на странице товара
 */

export const FirstComponyInfo = ({ productSeller, address, telephone, onMapClick }: FirstCompanyInfoProps) => {
  const t = useTranslations('icebergMarket');
  
  const seller = productSeller;
  const city = address?.city || '';
  const street = `${address?.street} || '' ${address?.house} || ''`;
  const phone = telephone;

  const [openMap, setIsOpenMap] = useState<boolean>(false);

  const handleOpenMap = () => setIsOpenMap(true);
  const handleCloseMap = () => setIsOpenMap(false);

  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      console.log(containerRef.current.getBoundingClientRect());
    }
  }, []);

  return (
    <div className={styles.fComWrapper}>
      <span className={styles.fCompSeller}>{seller}</span>
      <span className={styles.fCompCity}>{city}</span>
      <div className={styles.streetMapWrapper}>
        <span className={styles.fCompStreet}>{street}</span>
        <span className={styles.linkForMap}>{t('productPage.showMap')}</span>
      </div>
      <ShowButtonPhone onClick={handleOpenMap} className={styles.fcompShowButton} phone="phone" />
      {setIsOpenMap(true) && (

      )}
    </div>
  );
};
