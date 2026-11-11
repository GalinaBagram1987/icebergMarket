//  прямой реэкспорт. всё в одну строку
export { cn } from './classNames';
export { default as loadYandexMetrika } from './traking/yandexMetrika';

export { getCookie, setCookie, deleteCookie } from './cookieUtilits';
export { normalizeAttributes } from './normalizeAttributes';

export { normalizedPostItem } from './normalizePostItem';
export { normalizePostDetail } from './normalizePostDetail';

export type { ClientPostDetail } from './normalizePostDetail';

export { formatToHumanDate } from './formatDateToHuman';

export { useClickOutside } from './useClickOutside';

export { getCoordinatesByAddress } from './coordinateConvector/coordinateByAdress';
export { buildAddressForMap } from './coordinateConvector/buildAdressForMap';
