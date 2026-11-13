'use client';

import { useTranslations } from 'next-intl';
import { useState, useRef, useEffect } from 'react';
import { ShowButtonPhone } from '@/features/showPhoneButton';
import styles from './parts.module.css';
import { buildAddressForMap } from '@/shared/lib';
import { getCoordinatesByAddress } from '@/shared/lib';
import { MapModalSingle } from '@/shared/lib';

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

export const FirstCompanyInfo = ({ productSeller, address, telephone, onMapClick }: FirstCompanyInfoProps) => {
  const t = useTranslations('icebergMarket');

  const seller = productSeller;
  const city = address?.city || '';
  const street = [address?.street, address?.house].filter(Boolean).join(' ');
  const phone = telephone;

  const fullAddress = buildAddressForMap(address);

  const [openMap, setIsOpenMap] = useState<boolean>(false);
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const handleOpenMap = async () => {
    setIsOpenMap(true);
    if (coords || !fullAddress) return;
    try {
      setMapError(null);
      const yandexCoords = await getCoordinatesByAddress(fullAddress);
      setCoords(yandexCoords);
    } catch (error) {
      console.error('Ошибка геокодирования:', error);
      setMapError('Не удалось определить координаты по адресу');
    }
  };
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
        <span className={styles.linkForMap} onClick={handleOpenMap}>
          {t('productPage.showMap')}
        </span>
      </div>
      <ShowButtonPhone className={styles.fcompShowButton} phone={phone} />
      <div className={styles.divider}></div>

      {/* 
        Рендерим модалку ТОЛЬКО когда openMap === true.
      */}
      {openMap && <MapModalSingle isOpen={openMap} onClose={handleCloseMap} coordinates={coords} error={mapError} />}
    </div>
  );
};
