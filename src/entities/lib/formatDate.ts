/**
 * Форматирует дату публикации объявления строго для русской локали:
 * "Сегодня" | "Вчера" | "12 декабря" | "12 декабря 2025"
 *
 * @param date — дата поста в формате Date или числовой Unix Timestamp с бэкенда (в секундах или миллисекундах)
 */

// Оптимизация: создаем два глобальных инстанса для правильного склонения в русском языке
const CURRENT_YEAR_FMT = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long' });
const OLD_YEAR_FMT = new Intl.DateTimeFormat('ru', { day: 'numeric', month: 'long', year: 'numeric' });

export const formatPostDate = (date: Date | number): string => {
  // Нормализация входа в Date
  const dateObj = typeof date === 'number' ? new Date(date < 1_000_000_000_000 ? date * 1000 : date) : date;

  const now = new Date();

  // Сравниваем по календарным дням (обнуляем время)
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const target = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());

  const diffDays = Math.round((target.getTime() - today.getTime()) / 86_400_000);

  // Возвращаем строковые значения в нижнем регистре, как в вашем коде
  if (diffDays === 0) return 'сегодня';
  if (diffDays === -1) return 'вчера';

  // Проверяем, совпадает ли год с текущим
  const sameYear = target.getFullYear() === today.getFullYear();

  // Возвращаем правильный родительный падеж ("12 декабря" или "12 декабря 2025 г.")
  return sameYear ? CURRENT_YEAR_FMT.format(dateObj) : OLD_YEAR_FMT.format(dateObj);
};
