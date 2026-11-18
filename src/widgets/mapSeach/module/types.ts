/**
 * Состояния показа карты
 *
 * map - Состояние А: чистая карта
 * list - Состояние Б: карта + список справа
 * product  - Состояние В: карта + карточка товара справа
 */

export type MapDrawerState = { mode: 'map' } | { mode: 'list' } | { mode: 'product'; productId: string | number };

/**
 * Входящие пропсы компонента
 */

export type MapSearchCollectorProps = {};
