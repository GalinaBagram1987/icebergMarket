declare global {
  interface Window {
    ym: (method: string, counterId: number, params?: object) => void;
  }
}

const loadYandexMetrika = (): void => {
  console.log('Яндекс.Метрика успешно загружена!');
  // Тут будет ваш стандартный код инициализации счетчика Яндекса
};

export default loadYandexMetrika;
