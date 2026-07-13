/** @type {import("prettier").Config} */
const config = {
  // Использовать одинарные кавычки вместо двойных (эстетичнее в JS/TS)
  singleQuote: true,
  // Добавлять точку с запятой в конце строк
  semi: true,
  // Размер отступа — 2 пробела
  tabWidth: 2,
  // Использовать пробелы вместо табуляции
  useTabs: false,
  // Запятая в конце последней строки в объектах и массивах (удобно для гит-диффов)
  trailingComma: "all",
  // Длина строки, после которой код будет переноситься (200 символов — стандарт для десктопа)
  printWidth: 200,
  // Подключаем автоматическую сортировку классов Tailwind
  plugins: ["prettier-plugin-tailwindcss"],
};

export default config;
