import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import styles from './Footer.module.css';
import { cn } from '@/shared/lib';

/**
 * Подвал сайта с навигационными ссылками и информацией
 * об авторских правах.
 */

export const Footer = async () => {
  const t = await getTranslations('icebergMarket');

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerRow}>
          <Link href="/for-business" className={cn(styles.firstItem, styles.textBase)}>
            {t('footer.forBusiness')}
          </Link>

          <div className={styles.groupItem}>
            <Link href="/privacy" className={styles.textBase}>
              {t('footer.privacyPolitic')}
            </Link>
            <div className="rulesUseBlock">
              <Link href="/rules-site" className={styles.textBase}>
                {t('footer.siteRules')}
              </Link>
              <Link href="/rules-use" className={styles.textBase}>
                {t('footer.siteUse')}
              </Link>
            </div>
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
