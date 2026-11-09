'use client';

import { useEffect, RefObject } from 'react';

/**
 * Хук для отслеживания клика вне указанного элемента.
 *
 * @param ref — Ссылка на DOM-элемент (useRef), границы которого мы проверяем.
 * @param callback — Функция, которая вызовется, если клик произошел вне элемента.
 * @param isActive — Флаг активности, чтобы не вешать глобальный слушатель вхолостую.
 */

export const useClickOutside = (ref: RefObject<HTMLElement | null>, callback: () => void, isActive: boolean = true) => {
  useEffect(() => {
    if (!isActive) return;

    const handleClickOutside = (event: MouseEvent) => {
      // Если клик пришелся вне элемента, на который указывает ref
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, callback, isActive]);
};
