import { Metadata } from 'next';
import ForBusinessPage from '@/_pages/forBusiness';

/**
 * Страница /for-business (Next.js App Router).
 *
 * Компонент страницы (forBusiness) импортируется из FSD-слоя `_pages/forBusiness`.
 * Метаданные (title, description) переопределены здесь для данного маршрута.
 *
 * Вносить изменения в бизнес-логику следует в `src/_pages/forBusiness/`,
 */

export const metadata: Metadata = {
  title: 'Информация для бизнеса',
  description: 'Информация для бизнеса от Айсберг Маркет.',
};

const ForBusiness = () => {
  return <ForBusinessPage />;
};

export default ForBusiness;
