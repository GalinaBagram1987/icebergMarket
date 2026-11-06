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
 * @param options объект с настройками.
 * @param expires  количество дней
 * @param path путь по кот открывается кука, обычно '/', если не передан принудительно
 * @param [key: string]: any разрешает передавать другие параметры
 * @param {} значение options по умолчанию
 */

export const setCookie = (name: string, value: string, options: { expires?: number; path?: string; [key: string]: any } = {}) => {
  let updatedCookie = encodeURIComponent(name) + '=' + encodeURIComponent(value);

  if (options.expires) {
    const d = new Date();
    d.setTime(d.getTime() + options.expires * 24 * 60 * 60 * 1000);
    updatedCookie += '; expires=' + d.toUTCString();
  }

  const path = options.path || '/';
  updatedCookie += '; path=' + path;

  document.cookie = updatedCookie;
};

/**
 * Удаляет cookie по её имени.
 *
 * @param name Имя удаляемой cookie.
 */

export const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  // Устанавливаем с отрицательным сроком -> cookie мгновенно удалится в браузере
  setCookie(name, '', { expires: -1, path: '/' });
};
