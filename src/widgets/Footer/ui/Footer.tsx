import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import styles from './Footer.module.css';
import { cn } from '@/shared/lib/classNames';

export const Footer = async () => {
  const t = await getTranslations('icebergMarket');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <Link href="#" className={cn(styles.firstItem, styles.textBase)}>
          {t('footer.forBusiness')}
        </Link>

        <div className={cn(styles.groupItem, styles.textBase)}>
          <Link href="#">{t('footer.privacyPolitic')}</Link>
          <Link href="#">{t('footer.siteRules')}</Link>
          <Link href="#">{t('footer.contacts')}</Link>
        </div>
        <p className={styles.textCopyrate}>{t('footer.copywriting')}</p>
      </div>
    </footer>
  );
};
