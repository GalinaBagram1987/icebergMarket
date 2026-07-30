import { Metadata } from 'next';
import RulesUsePage from '@/_pages/rulesUse';

/**
 * Страница Правила использования
 * переопределяем метатеги именно под эту страницу
 */

export const metadata: Metadata = {
  title: 'Правила использования платфомы Айсберг Маркет',
  description: 'Правила использования платформы Айсберг Маркет.',
};

const RulesSite = async () => {
  return <RulesUsePage />;
};

export default RulesSite;
