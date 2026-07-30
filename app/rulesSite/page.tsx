import { Metadata } from 'next';
import RulesSite from '@/_pages/rulesSite';

/**
 * Страница Правила сайта
 * переопределяем метатеги именно под эту страницу
 */

export const metadata: Metadata = {
  title: 'Политика конфиденциальности Айсберг Маркет',
  description: 'Политика конфиденциальности Айсберг Маркет.',
};

const RulesSite = async () => {
  return <RulesSite />;
};

export default RulesSite;
