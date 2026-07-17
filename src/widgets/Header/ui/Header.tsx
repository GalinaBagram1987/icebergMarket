import styles from './Header.module.css';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import logo from '@/assets/logo.png';
import Image from 'next/image';
import { FaRegStar } from 'react-icons/fa';

export const Header = () => {
  const { t } = useTranslation();
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.leftGroup}>
          <Link href="/">
            <span className={t('header.companyName')}></span>
          </Link>
          <Image src={logo} alt="logo" className={styles.logoImg} />
        </div>
        <p className={styles.text}>{t('header.city')}</p>
        <div className="right-group">
          <FaRegStar className={styles.starIcon} />
          <p className={styles.text}>{t('header.favorites')}</p>
        </div>
      </div>
    </header>
  );
};
