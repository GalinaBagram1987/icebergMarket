import styles from '@/shared/ui/styles/textPage.module.css';
import { getTranslations } from 'next-intl/server';

/** Компонент страницы "Правила сайта" */

export const RulesSitePage = async () => {
  const t = await getTranslations('rulesSite');

  return (
    <main className="container">
      <div className={styles.pageWrapper}>
        <div className={styles.designBlock}>&nbsp;</div>
        <div className={styles.textContainer}>
          <h1 className={styles.textPageH1}>{t('titleOne')}</h1>
          <h2 className={styles.textPageH2}>{t('titleTwo')}</h2>
          <hr className={styles.line} />
          <p className={styles.textPageP}>{t('textOne')}</p>
          <p className={styles.textPageP}>{t('textTwo')}</p>
          <p className={styles.textPageP}>{t('textThree')}</p>
          <p className={styles.textPageP}>{t('textFour')}</p>
        </div>
      </div>
    </main>
  );
};
