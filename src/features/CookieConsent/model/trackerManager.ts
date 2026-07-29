import { hasConsent, saveConsent } from './consent';
import { initTrackers } from './initTracKers';

/**Менеджер состояния
 * проверяет есть ли согласие сразу isConsentAccepted
 * согласие получено acceptConsent
 * есть ли согласие true, false
 */

export const trackerManager = {
  initByConsent(): boolean {
    const isConsentAccepted = hasConsent(); // есть true, нет false

    if (isConsentAccepted) {
      // есть - зпускаем трекеры
      initTrackers();
    }
    return isConsentAccepted; // нет, возвращаем что нет
  },

  acceptConsent(): void {
    saveConsent();
    initTrackers();
  },

  hasConsent(): boolean {
    return hasConsent();
  },
};
