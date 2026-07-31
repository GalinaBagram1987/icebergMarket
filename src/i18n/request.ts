import { getRequestConfig } from 'next-intl/server';

/**
 * инициализация next-intl/server
 * эта библиотека в проекте отвечает за централизованное хранение
 *  всех текстов фронта
 *  крупные текстовые блоки (страницы из футера) вынесены в отдельные файлы
 */

export default getRequestConfig(async () => {
  const locale = 'ru';

  // Загружаем все файлы параллельно
  const [mainMessages, privacyMessages, businessMessages, rulesUseMessages, rulesSiteMessages] = await Promise.all([
    import('@/shared/lib/i18n/ru.json'),
    import('@/shared/lib/i18n/privacy.json'),
    import('@/shared/lib/i18n/business.json'),
    import('@/shared/lib/i18n/rulesUse.json'),
    import('@/shared/lib/i18n/rulesSite.json'),
  ]);

  return {
    locale,
    messages: {
      ...mainMessages.default,
      // т.к. внутри ваших JSON-файлов уже есть обертки, просто разворачиваем их в общий корень через оператор ...
      privacy: privacyMessages.default,
      business: businessMessages.default,
      rulesUse: rulesUseMessages.default,
      rulesSite: rulesSiteMessages.default,
    },
  };
});
