import { SearchMain } from '@/widgets/SearchMainPage';
import { CookieConsent } from '@/features/CookieConsent';

/**
 * Компоннет главной страницы
 */

export const MainPage = async () => {
  return (
    <main className="container">
      <SearchMain />
      <CookieConsent />
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>Привет! здесь будет Aйсберг Маркет</h1>
    </main>
  );
};
