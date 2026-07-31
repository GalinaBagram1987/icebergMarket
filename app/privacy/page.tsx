import { Metadata } from 'next';
import PrivacyPage from '@/_pages/privacy';

/**
 * Страница /privacy (Next.js App Router).
 *
 * Компонент страницы импортируется из FSD-слоя `src/_pages/privacy`.
 * Метаданные (title, description) переопределены здесь для данного маршрута.
 *
 * Вносить изменения в бизнес-логику следует в `src/_pages/privacy/`.
 */

export const metadata: Metadata = {
  title: 'Политика конфиденциальности Айсберг Маркет',
  description: 'Политика конфиденциальности Айсберг Маркет.',
};

const Privacy = () => {
  return <PrivacyPage />;
};

export default Privacy;
