import { Metadata } from 'next';
import RulesSitePage from '@/_pages/rulesSite';

/**
 * Страница Правила сайта
 * переопределяем метатеги именно под эту страницу
 */

export const metadata: Metadata = {
  title: 'Правила сайта Айсберг Маркет',
  description: 'Правила сайта Айсберг Маркет.',
};

const RulesSite = async () => {
  return <RulesSitePage />;
};

export default RulesSite;
