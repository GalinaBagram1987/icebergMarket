import { Metadata } from 'next';
import RulesUsePage from '@/_pages/rulesUse';

/**
 * Страница /rules-use (Next.js App Router).
 *
 * Компонент страницы (RulesUsePage) импортируется из FSD-слоя `_pages/rulesUse`.
 * Метаданные (title, description) переопределены здесь для данного маршрута.
 *
 * Вносить изменения в бизнес-логику следует в `src/_pages/rulesUse/`,
 */

export const metadata: Metadata = {
  title: 'Правила использования платфомы Айсберг Маркет',
  description: 'Правила использования платформы Айсберг Маркет.',
};

const RulesSite = () => {
  return <RulesUsePage />;
};

export default RulesSite;
