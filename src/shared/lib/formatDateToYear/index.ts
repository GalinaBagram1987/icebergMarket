/**
 * Извлекает год из ISO-строки даты от бэкенда
 * @param isoString Пример: "2024-01-15T10:30:00Z"
 * @returns Строка с годом, например "2024", или пустая строка при ошибке
 */
export const formatToYear = (isoString: string | null | undefined): string => {
  if (!isoString) return '';

  try {
    const date = new Date(isoString);

    if (isNaN(date.getTime())) return '';

    return String(date.getFullYear());
  } catch (error) {
    console.error('Ошибка извлечения года из даты:', error);
    return '';
  }
};
