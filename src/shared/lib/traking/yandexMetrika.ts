/**
 * Интерфейс для функции подключения Метрики.
 *
 * window.ym — функция Яндекс.Метрики.
 *
 * Служебные свойства, которые использует Яндекс:
 * ym.a — очередь вызовов до загрузки настоящего скрипта Метрики.
 * ym.l — числовая метка времени Date.now().
 * args - список различных подключаемых аргументов
 */

declare global {
  interface Window {
    ym?: {
      (...args: unknown[]): void;
      a?: unknown[][];
      l?: number;
    };
  }
}

let isYandexMetrikaLoading = false;
// TODO: сюда добавить корректный номер счетчика при инициалиации метрики
const COUNTER_ID = 1234567890;
const METRIKA_SRC = `https://mc.yandex.ru/metrika/tag.js?id=${COUNTER_ID}`;

const loadYandexMetrika = (): void => {
  //  Проверяем, что мы в браузере (не на сервере)
  if (typeof window === 'undefined') {
    return;
  }
  if (isYandexMetrikaLoading) {
    return;
  }
  // Проверяем, что метрика ЕЩЕ НЕ загружена
  const existingScript = document.querySelector('script[src^="https://mc.yandex.ru/metrika/tag.js"]');
  if (existingScript) {
    // есть ли на странице селектор с метрикой
    return;
  }
  if (window.ym) {
    // есть ли прогруженный скрипт
    return;
  }
  // Фиксируем, что загрузка Метрики началась
  isYandexMetrikaLoading = true;

  console.log('Загушен счетчик-заглушка с номером 1234567890');

  // <!-- Yandex.Metrika counter -->
  window.ym =
    window.ym ||
    function (...args: unknown[]): void {
      window.ym!.a = window.ym!.a || [];
      window.ym!.a.push(args);
    };

  window.ym.l = Date.now();

  const script = document.createElement('script');

  script.async = true;
  script.src = METRIKA_SRC;

  script.onerror = () => {
    isYandexMetrikaLoading = false;
    console.error('Ошибка загрузки Яндекс.Метрики');
  };

  document.head.appendChild(script);

  window.ym(COUNTER_ID, 'init', {
    ssr: true,
    webvisor: true,
    clickmap: true,
    ecommerce: 'dataLayer',
    referrer: document.referrer,
    url: location.href,
    accurateTrackBounce: true,
    trackLinks: true,
  });
};

export default loadYandexMetrika;
