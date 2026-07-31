import { Metadata } from 'next';
import ContactsPage from '@/_pages/contacts';

/**
 * Страница /contacts (Next.js App Router).
 *
 * Компонент страницы (forBusiness) импортируется из FSD-слоя `_pages/contacts`.
 * Метаданные (title, description) переопределены здесь для данного маршрута.
 *
 * Вносить изменения в бизнес-логику следует в `src/_pages/contacts/`,
 */

export const metadata: Metadata = {
  title: 'Страница контактов Айсберг Маркет',
  description: 'Страница контактов Айсберг Маркет',
};

const Contacts = () => {
  return <ContactsPage />;
};

export default Contacts;
