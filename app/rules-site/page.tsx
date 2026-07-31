import { Metadata } from 'next';
import RulesSitePage from '@/_pages/rulesSite';

/**
 * Страница /rules-site (Next.js App Router).
 *
 * Компонент страницы импортируется из FSD-слоя `src/_pages/rules-site`.
 * Метаданные (title, description) переопределены здесь для данного маршрута.
 *
 * Вносить изменения в бизнес-логику следует в `src/_pages/rulesSite/`.
 */

export const metadata: Metadata = {
  title: 'Правила сайта Айсберг Маркет',
  description: 'Правила сайта Айсберг Маркет.',
};

const RulesSite = () => {
  return <RulesSitePage />;
};

export default RulesSite;
