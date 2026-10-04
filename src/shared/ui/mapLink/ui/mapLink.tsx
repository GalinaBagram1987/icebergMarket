'use client';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import styles from './mapLink.module.css';

export type MapLinkProps = {
  path: string;
};

export const MapLink = ({ path }: MapLinkProps) => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <Link href={`/mapSearch/${path}`} className={styles.link} role="button">
      {/* SVG Иконка карта со складкой */}
      <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
        <line x1="9" y1="3" x2="9" y2="18" />
        <line x1="15" y1="6" x2="15" y2="21" />
      </svg>

      <span className={styles.text}>{t('showMap')}</span>
    </Link>
  );
};
