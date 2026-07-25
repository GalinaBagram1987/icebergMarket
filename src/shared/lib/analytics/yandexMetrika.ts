declare global {
  interface Window {
    ym?: (method: string, counterId: number, params?: object) => void;
  }
}

const loadYandexMetrika = (): void => {
  // 1. Проверяем, что мы в браузере (не на сервере)
  if (typeof window === 'undefined') {
    return;
  }

  // 2. Проверяем, что метрика ЕЩЕ НЕ загружена
  if (window.ym) {
    return;
  }

  console.log('Яндекс.Метрика успешно загружена!');
  // Тут будет ваш стандартный код инициализации счетчика Яндекса
};

export default loadYandexMetrika;
