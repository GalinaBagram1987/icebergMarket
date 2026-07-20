import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import styles from './Footer.module.css';
import { cn } from '@/shared/lib/classNames';

export const Footer = async () => {
  const t = await getTranslations('icebergMarket');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerRow}>
          <Link href="#" className={cn(styles.firstItem, styles.textBase)}>
            {t('footer.forBusiness')}
          </Link>

          <div className={styles.groupItem}>
            <Link href="#" className={styles.textBase}>
              {t('footer.privacyPolitic')}
            </Link>
            <Link href="#" className={styles.textBase}>
              {t('footer.siteRules')}
            </Link>
            <Link href="#" className={styles.textBase}>
              {t('footer.contacts')}
            </Link>
          </div>
          <p className={styles.textCopyrate}>{t('footer.copywriting')}</p>
        </div>
      </div>
    </footer>
  );
};
