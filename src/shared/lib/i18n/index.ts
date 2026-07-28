import ru from './ru.json';
import privacyText from './privacyText.json';
import businessText from './businessText.json';
import rulesUseText from './rulesUseText.json';
import rulesSiteText from './rulesSiteText.json';

//  Создаем тип на основе структуры русского JSON-файла
export type Messages = typeof ru & {
  privacy: typeof privacyText;
  business: typeof businessText;
  rulesUse: typeof rulesUseText;
  rulesSite: typeof rulesSiteText;
};

// Интегрируем этот тип в глобальное окружение next-intl
declare global {
  interface IntlMessages extends Messages {}
}
