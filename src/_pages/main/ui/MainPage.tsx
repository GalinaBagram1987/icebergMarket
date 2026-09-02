import { SearchMain } from '@/widgets/search/SearchMainPage';
import { CookieConsent } from '@/features/CoockieConsent';
import { MainCatalog } from '@/widgets/catalog/mainCatalog';

/**
 * Компоннет главной страницы
 */

export const MainPage = async () => {
  return (
    <main className="container">
      <SearchMain />
      <MainCatalog />
      <CookieConsent />
    </main>
  );
};
