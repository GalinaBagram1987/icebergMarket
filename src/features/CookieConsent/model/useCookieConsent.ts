import { useEffect, useState } from 'react';
import { trackerManager } from './trackerManager';

/**
 * useCookieConsent отвечает за состояние баннера cookie-согласия:
 * показывает баннер, если согласия нет,
 * скрывает баннер после принятия согласия.
 */

export const useCookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const isConsentAccepted = trackerManager.initByConsent();
    setIsVisible(!isConsentAccepted);
  }, []);

  const acceptCookieConsent = () => {
    trackerManager.acceptConsent();
    setIsVisible(false);
  };

  return {
    isVisible,
    acceptCookieConsent,
  };
};
