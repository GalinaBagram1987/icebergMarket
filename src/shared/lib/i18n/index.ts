import ru from './ru.json';
import privacy from './privacy.json';
import business from './business.json';
import rulesUse from './rulesUse.json';
import rulesSite from './rulesSite.json';

//  Создаем тип на основе структуры русского JSON-файла
export type Messages = typeof ru & {
  privacy: typeof privacy;
  business: typeof business;
  rulesUse: typeof rulesUse;
  rulesSite: typeof rulesSite;
};

// Интегрируем этот тип в глобальное окружение next-intl
declare global {
  interface IntlMessages extends Messages {}
}
