'use client';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useCookieConsent } from '../model/useCoockieConsent';
import styles from './CookieConsent.module.css';

/**
 * визуальное отобрадение баннера куки
 * получение согласия от пользователя
 */

export const CookieConsent = () => {
  const t = useTranslations('icebergMarket');
  const { isVisible, acceptCookieConsent } = useCookieConsent();

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.cookieConsent}>
      <p className={styles.cookieText}>
        {t('mainPage.cookieText')}
        <span className={styles.privasyLink}>
          <Link href="/privacy" target="_blank">
            {t('mainPage.cookieLink')}
          </Link>
        </span>
      </p>
      <button className={styles.buttonConsent} onClick={acceptCookieConsent}>
        {t('mainPage.ok')}
      </button>
    </div>
  );
};
