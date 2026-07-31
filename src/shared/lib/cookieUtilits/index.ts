/** Утилиты необходимые для работы с куки */

/**
 * Возвращает значение cookie по её имени.
 *
 * @param name Имя cookie.
 * @returns Значение cookie или `undefined`, если cookie не найдена
 * либо код выполняется на сервере.
 */

export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;

  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

/**
 * Записывает cookie в браузере.
 *
 * @param name Имя cookie.
 * @param value Значение cookie.
 * @param days Срок хранения cookie в днях.
 */

export const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;

  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
};

/**
 * Удаляет cookie по её имени.
 *
 * @param name Имя удаляемой cookie.
 */

export const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  // Устанавливаем с отрицательным сроком -> cookie мгновенно удалится в браузере
  setCookie(name, '', -1);
};
