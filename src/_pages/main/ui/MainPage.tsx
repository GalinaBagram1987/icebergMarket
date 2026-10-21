import { Suspense } from 'react';

import { CookieConsent } from '@/features/CoockieConsent';
import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import { MainCatalog } from '@/widgets/mainCatalog';
import styles from './mainPage.module.css';
/**
 * Компоннет главной страницы
 */

export const MainPage = async () => {
  return (
    <div className="containerMain">
      <div className={styles.marginForSearch}>
        <Suspense fallback="null">
          <GlobalSearchCatalog />
        </Suspense>
      </div>

      <MainCatalog />
      <CookieConsent />
    </div>
  );
};
