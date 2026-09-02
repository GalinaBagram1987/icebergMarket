import { SearchMain } from '@/widgets/search/SearchMainPage';

/**
 * Страница раздела типовая
 */

export const BaseSectionPage = async () => {
  return (
    <main className="container">
      <SearchMain />
    </main>
  );
};
