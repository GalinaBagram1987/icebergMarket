'use client';

import styles from './errorRender.module.css';
import { useTranslations } from 'next-intl';

/**
 * Типы пропос для страницы ошибки.
 * Они автоматом идут в некст
 * вынесены отельно для наглядности
 */

export type NextErrorProps = {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
};

/**
 * Компонент ошибки. Общий для всех страниц-ошибок сайта
 */

export const ErrorRender = ({ error, reset }: NextErrorProps) => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <div className={styles.parent}>
      <div className={styles.block}>
        <p className={styles.text}>{t('errorPage.text')}</p>
        <p className={styles.text}>{error.digest}</p>
        <button className={styles.button} onClick={reset}>
          {t('errorPage.button')}
        </button>
      </div>
    </div>
  );
};
