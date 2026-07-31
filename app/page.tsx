import MainPage from '@/_pages/main';

/**
 * Корневая страница приложения (маршрут /).
 *
 * Компонент страницы импортируется из FSD-слоя `_pages/main`.
 * Метаданные (title, description) определены для нее в корневом layout.
 *
 * Бизнес-логику следует изменять в `src/_pages/main/`.
 */

const HomePage = () => {
  return <MainPage />;
};

export default HomePage;
