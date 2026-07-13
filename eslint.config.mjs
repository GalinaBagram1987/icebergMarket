import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Специальный адаптер, чтобы подружить современный ESLint 9+
// со встроенными правилами Next.js
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Глобально игнорируем системные папки сборки поисковика
  {
    ignores: [".next/**", "dist/**", "node_modules/**"],
  },

  // Подключаем официальные строгие правила Next.js для TypeScript
  ...compat.config({
    extends: [
      "next/core-web-vitals", // Строгие правила для SEO и производительности
      "next/typescript", // Самые свежие правила для типизации
    ],
    rules: {
      // Сюда вы сможете добавлять свои уникальные правила, например:
      "@typescript-eslint/no-explicit-any": "warn", // Ругаться, если вы забыли тип и написали any
    },
  }),
  eslintConfigPrettier, //перекрываем конфликты с prettier
];

export default eslintConfig;
