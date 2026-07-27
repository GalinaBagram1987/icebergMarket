import { Metadata } from 'next';
import { PrivacyPolicy } from '@/pages/privacy';

// Переопределяем метатеги конкретно для Политики конфиденциальности
export const metadata: Metadata = {
  title: 'Политика конфиденциальности Айсберг Маркет',
  description: 'Политика конфиденциальности Айсберг Маркет.',
};

const PrivacyPage = async () => {
  return <PrivacyPolicy />;
};

export default PrivacyPage;
