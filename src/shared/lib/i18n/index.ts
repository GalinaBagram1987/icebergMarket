import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import ruTranslations from "./ru.json"; // Прямой импорт JSON с текстами

i18n
  .use(initReactI18next) // Подключаем только интеграцию с React
  .init({
    resources: {
      ru: {
        translation: ruTranslations,
      },
    },
    lng: "ru", // Жестко фиксируем русский язык для поисковика
    fallbackLng: "ru",

    // проверка режима разработки в Next.js (включает логи в консоли)
    debug: process.env.NODE_ENV === "development",

    interpolation: {
      escapeValue: false, // React сам защищает от XSS атак
    },
  });

export default i18n;
