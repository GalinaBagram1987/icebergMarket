import { clsx, type ClassValue } from 'clsx';

/**
 * Объединяет переданные CSS-классы в одну строку.
 * Поддерживает условные классы, массивы и объекты благодаря `clsx`.
 * @param inputs CSS-классы и условные значения.
 * @returns Строка объединённых CSS-классов.
 */

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
