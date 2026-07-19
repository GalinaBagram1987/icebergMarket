import ru from './ru.json';

//  Создаем тип на основе структуры русского JSON-файла
export type Messages = typeof ru;

// Интегрируем этот тип в глобальное окружение next-intl
declare global {
  interface IntlMessages extends Messages {}
}
