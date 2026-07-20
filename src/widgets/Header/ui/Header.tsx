import styles from './Header.module.css';
import Link from 'next/link';
import logo from '@/assets/images/logo.png';
import Image from 'next/image';
import { FaRegStar } from 'react-icons/fa';
import { cn } from '@/shared/lib/classNames';
import { getTranslations } from 'next-intl/server';

export const Header = async () => {
  const t = await getTranslations('icebergMarket');
  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.headerRow}>
          <div className={styles.leftGroup}>
            <Link href="/">
              <span className={styles.textLogo}>{t('header.companyName')}</span>
            </Link>
            <Image src={logo} alt="logo" className={styles.logoImg} />
            <p className={cn(styles.text, styles.sitySize)}>{t('header.city')}</p>
          </div>
          <div className={styles.rightGroup}>
            <FaRegStar className={styles.starIcon} />
            <p className={cn(styles.text, styles.prevSize)}>{t('header.favorites')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};
