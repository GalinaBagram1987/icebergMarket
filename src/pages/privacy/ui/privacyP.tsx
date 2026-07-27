import styles from '@/shared/ui/styles/textPage.module.css';
import { getTranslations } from 'next-intl/server';

export const PrivacyPolicy = async () => {
  const t = await getTranslations('icebergMarket');

  return (
    <main className="container">
      <div className={styles.designBlock}></div>
      <div className={styles.textContainer}>
        <h1 className={styles.textPageH1}>{t('privacy.titleOne')}</h1>
        <h2 className={styles.textPageH2}>{t('privacy.titleTwo')}</h2>
        <hr className={styles.line} />
        <p className={styles.textPageP}>{t('privacy.textOne')}</p>
        <p className={styles.textPageP}>{t('privacy.textTwo')}</p>
        <p className={styles.textPageP}>{t('privacy.textThree')}</p>
        <p className={styles.textPageP}>{t('privacy.textFour')}</p>
      </div>
    </main>
  );
};
