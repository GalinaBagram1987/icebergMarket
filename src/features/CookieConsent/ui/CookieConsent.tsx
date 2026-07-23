'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import styles from './CookieConsent.module.css';
import Link from 'next/link';
import { loadYandexMetrika } from '@/shared/lib';
import { getCookie, setCookie } from '@/shared/lib';

export const CookieConsent = () => {
  const t = useTranslations('icebergMarket');
  // состояние.  баннер скрыт (false). true - отображаем
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    // Вызываем утилиту. Она возвращает строку "true" или undefined.
    const consentValue = getCookie('cookie_accepted');
    // Переводим это в булево значение (true/false).
    const hasConsent = consentValue === 'true';

    if (!hasConsent) {
      // согласия нет. Включаем отображение баннера на экране.
      setIsVisible(true);
    } else {
      // согласие есть. Баннер не показываем, запускаем аналитику Яндекса.
      loadYandexMetrika();
    }
  }, []);

  const handleAccept = () => {
    // Записываем куку на 365 дней через универсальный инструмент
    setCookie('cookie_accepted', 'true');
    // В этот же момент принудительно активируем Яндекс.Метрику
    loadYandexMetrika();
    // Скрываем баннер с экрана
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={styles.cookieConsent}>
      <p className={styles.cookieText}>
        {t('mainPage.cookieText')}
        <span className={styles.privasyLink}>
          <Link href="#">{t('mainPage.cookieLink')}</Link>
        </span>
      </p>
      <button className={styles.buttonConsent} onClick={handleAccept}>
        {t('mainPage.ok')}
      </button>
    </div>
  );
};
