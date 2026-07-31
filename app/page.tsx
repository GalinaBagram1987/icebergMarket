import { Metadata } from 'next';
import MainPage from '@/_pages/main';

/**
 * Корневая страница приложения (маршрут /).
 *
 * Компонент страницы импортируется из FSD-слоя `_pages/main`.
 * Метаданные (title, description) определены здесь для главной страницы.
 *
 * Бизнес-логику следует изменять в `src/_pages/main/`.
 */

export const metadata: Metadata = {
  title: 'Айсберг Маркет — Доска объявлений Сочи',
  description: 'Покупка и продажа товаров, автомобилей, недвижимости в Сочи. ',
};

const HomePage = async () => {
  return <MainPage />;
};

export default HomePage;
