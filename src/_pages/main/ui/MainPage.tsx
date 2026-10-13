import { Suspense } from 'react';

import { CookieConsent } from '@/features/CoockieConsent';
import { GlobalSearchCatalog } from '@/features/globalSearchCatalog';
import { MainCatalog } from '@/widgets/mainCatalog';
/**
 * Компоннет главной страницы
 */

export const MainPage = async () => {
  return (
    <main className="container">
      <Suspense fallback="null">
        <GlobalSearchCatalog />
      </Suspense>

      <MainCatalog />
      <CookieConsent />
    </main>
  );
};
