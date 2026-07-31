import RootLayout from '@/_app/layout';
import { viewport, generateMetadata } from '@/_app/layout';

/**
 * Корневой layout next.js
 * Реэкспортирует всё из `src/_app/layout.tsx` (компонент, метаданные, viewport).
 * Здесь только реэкспорт. логики нет. Логика расположена в FSD-слое `_app`.
 */

export default RootLayout;
export { viewport, generateMetadata };

// есть вариант короче export { default, viewport, generateMetadata } from '@/_app/layout';
// оставила длинный для наглядности
