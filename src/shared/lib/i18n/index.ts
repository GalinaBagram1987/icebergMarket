import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ruTransl from './ru';

i18n.use(initReactI18next).init({
  resources: {
    ru: ruTransl, // ИСПРАВЛЕНО: передаем объект напрямую, без ручного дублирования "translation:"
  },
  lng: 'ru',
  fallbackLng: 'ru',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
