import { CookieConsent } from '@/features/CoockieConsent';
import { MainCatalog } from '@/widgets/mainCatalog';

/**
 * Компоннет главной страницы
 */

export const MainPage = async () => {
  return (
    <main className="container">
      {/* Здесь будет поиск*/}
      <MainCatalog />
      <CookieConsent />
    </main>
  );
};
