import { Metadata } from 'next';
import PrivacyView from '@/_pages/privacy';

/**
 * Страница Политика конфиденциальности
 * переопределяем метатеги именно под эту страницу
 */

export const metadata: Metadata = {
  title: 'Политика конфиденциальности Айсберг Маркет',
  description: 'Политика конфиденциальности Айсберг Маркет.',
};

const Privacy = async () => {
  return <PrivacyView />;
};

export default Privacy;
