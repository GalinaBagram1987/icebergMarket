'use client';

import styles from './subcategoryList.module.css';
import { useTranslations } from 'next-intl';

export const SubcategoryListError = () => {
  const t = useTranslations('icebergMarket'); // Хук для клиента
  return (
    <div className={styles.parentError}>
      <div className={styles.blockError}>
        <p className={styles.textError}>{t('bonduaryError.text1')}</p>
        <p className={styles.textError}>{t('bonduaryError.text2')}</p>
      </div>
    </div>
  );
};
