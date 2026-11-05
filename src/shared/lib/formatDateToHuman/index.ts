/**
 * Превращает ISO дату от бэкенда в красивый формат "27 октября"
 * @param isoString Пример: "2026-10-27T09:31:35.809029+00:00"
 * @returns Строка вида "27 октября" или пустая строка в случае ошибки
 */

export const formatToHumanDate = (isoString: string | null | undefined): string => {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);

    // Проверяем, что дата распарсилась корректно и объект валиден
    if (isNaN(date.getTime())) return '';

    // Используем встроенный интернационализатор для получения формата "27 октября"
    return new Intl.DateTimeFormat('ru-RU', {
      day: 'numeric',
      month: 'long',
    }).format(date);
  } catch (error) {
    console.error('Ошибка форматирования даты:', error);
    return '';
  }
};
