import styles from '@/shared/ui/styles/textPage.module.css';
import { getTranslations } from 'next-intl/server';

export const PrivacyView = async () => {
  const t = await getTranslations('privacy');

  return (
    <main className="container">
      <div className={styles.pageWrapper}>
        <div className={styles.designBlock}>&nbsp;</div>
        <div className={styles.textContainer}>
          <h1 className={styles.textPageH1}>{t('privacy.privacyTitleOne')}</h1>
          <h2 className={styles.textPageH2}>{t('privacy.privacyTitleTwo')}</h2>
          <hr className={styles.line} />
          <p className={styles.textPageP}>{t('privacy.privacyTextOne')}</p>
          <p className={styles.textPageP}>{t('privacy.privacyTextTwo')}</p>
          <p className={styles.textPageP}>{t('privacy.privacyTextThree')}</p>
          <p className={styles.textPageP}>{t('privacy.privacyTextFour')}</p>
        </div>
      </div>
    </main>
  );
};
