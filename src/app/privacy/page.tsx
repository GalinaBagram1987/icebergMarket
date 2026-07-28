import { Metadata } from 'next';
import PrivacyView from '@/views/privacy';

// Переопределяем метатеги конкретно для Политики конфиденциальности
export const metadata: Metadata = {
  title: 'Политика конфиденциальности Айсберг Маркет',
  description: 'Политика конфиденциальности Айсберг Маркет.',
};

const Privacy = async () => {
  return <PrivacyView />;
};

export default Privacy;
