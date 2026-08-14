import 'react';

/**
 * Добавляем в TS типы CSS-переменных
 * Разрешаем любые CSS-переменные (начинаются с --)
 */

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number | undefined;
  }
}
