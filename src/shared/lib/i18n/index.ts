import ru from './ru.json';
import privacy from './privacy.json';
import business from './business.json';
import rulesUse from './rulesUse.json';
import rulesSite from './rulesSite.json';
import contacts from './contacts.json';

/**
 * Полная структура сообщений локализации приложения.
 * Формируется на основе основного русского файла и сообщений,
 * вынесенных в отдельные пространства имён.
 */

export type Messages = typeof ru & {
  privacy: typeof privacy;
  business: typeof business;
  rulesUse: typeof rulesUse;
  rulesSite: typeof rulesSite;
  contacts: typeof contacts;
};

/**
 * Глобальный тип сообщений `next-intl`.
 *
 * Обеспечивает типизацию пространств имён и ключей локализации.
 */

declare global {
  interface IntlMessages extends Messages {}
}
