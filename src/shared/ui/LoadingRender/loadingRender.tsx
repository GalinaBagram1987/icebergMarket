'use client';
import { useTranslations } from 'next-intl';
import styles from './loadingRender.module.css';
import { Spinner } from './spinner';

export const LoadingRender = () => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <div className={styles.parent}>
      <div className={styles.block}>
        <div>
          <Spinner />
          <p className={styles.text}>{t('loagingPage.textOne')}</p>
          <p className={styles.text}>{t('loagingPage.textTwo')}</p>
        </div>
      </div>
    </div>
  );
};
