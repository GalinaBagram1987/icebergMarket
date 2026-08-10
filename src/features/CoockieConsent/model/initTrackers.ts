import { loadYandexMetrika } from '@/shared/lib';

/**
 * isTrackersInitialized - проверяет инициализированы трекеры или нет
 * если трекеров нет, запускаем.
 * если есть выход
 * Пока есть только яндекс. потом, возможно, добавится еще
 */

let isTrackersInitialized = false;

export const initTrackers = (): void => {
  if (isTrackersInitialized === true) {
    return;
  }

  isTrackersInitialized = true;
  loadYandexMetrika();
};
