import { Metadata } from 'next';
import { AuthPage } from '@/_pages/auth';

/**
 * Страница авторизации (маршрут /authorization).
 *
 * на нее нет ссылки с основного сайта
 * высылается отдельно менеджером
 *
 * Компонент страницы импортируется из FSD-слоя `_pages/auth`.
 *
 * Бизнес-логику следует изменять в `src/??????????`.
 */

export const metadata: Metadata = {
  title: 'Страница авторизации Айсберг Маркет',
  description: 'Страница авторизации Айсберг Маркет.',
};

const Authorization = () => {
  return <AuthPage />;
};

export default Authorization;
