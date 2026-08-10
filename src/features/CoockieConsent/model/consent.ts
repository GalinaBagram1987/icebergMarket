import { getCookie, setCookie } from '@/shared/lib';

/**
 * hasConsent — проверяет, дал ли пользователь согласие на использование cookies.
 * saveConsent — сохраняет согласие пользователя в cookie.
 */

const COOKIE_CONSENT_KEY = 'cookie_consent';
const COOKIE_CONSENT_VALUE = 'accepted';

export const hasConsent = (): boolean => {
  return getCookie(COOKIE_CONSENT_KEY) === COOKIE_CONSENT_VALUE;
};

export const saveConsent = (): void => {
  setCookie(COOKIE_CONSENT_KEY, COOKIE_CONSENT_VALUE);
};
