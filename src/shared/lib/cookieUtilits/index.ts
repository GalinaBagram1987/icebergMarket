// Проверка на наличие конкретной куки (универсальная функция)
export const getCookie = (name: string): string | undefined => {
  if (typeof document === 'undefined') return undefined;

  const matches = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)'));
  return matches ? decodeURIComponent(matches[1]) : undefined;
};

// Запись куки
export const setCookie = (name: string, value: string, days = 365) => {
  if (typeof document === 'undefined') return;

  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; max-age=${maxAge}; path=/; SameSite=Lax`;
};

// Удаление куки
export const deleteCookie = (name: string) => {
  if (typeof document === 'undefined') return;
  // Устанавливаем с отрицательным сроком -> cookie мгновенно удалится в браузере
  setCookie(name, '', -1);
};
