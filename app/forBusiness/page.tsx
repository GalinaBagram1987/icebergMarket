import { Metadata } from 'next';
import ForBusines from '@/_pages/forBusiness';

/**
 * Страница для бизнеса
 * переопределяем метатеги именно под эту страницу
 */

export const metadata: Metadata = {
  title: 'Информация для бизнесаа',
  description: 'Информация для бизнеса от Айсберг Маркет.',
};

const Privacy = async () => {
  return <ForBusines />;
};
