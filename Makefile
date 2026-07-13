
# список всех команд
.PHONY: dev build preview start install test test-ui lint lint-fix format sitemap

# --- РАЗРАБОТКА И СБОРКА ---

# Запуск проекта в режиме разработки (локальный сервер)
dev:
	npm run dev

# Сборка проекта для продакшна (компиляция кода Next.js)
build:
	npm run build

# Запуск проекта в продакшн-режиме (после выполнения команды build)
start:
	npm run start

# Быстрая установка всех зависимостей проекта (папка node_modules)
install:
	npm install


# --- СЕО И ОПТИМИЗАЦИЯ ---

# Генерация карты сайта (Sitemap) для индексации в Яндекс/Google
sitemap:
	npx next-sitemap --config next-sitemap.config.js




# --- ПРОВЕРКА КОДА И ФОРМАТИРОВАНИЕ ---

# Найти ошибки в коде (вызывает скрипт из package.json с правильным конфигом)
lint:
	npm run lint

# Автоматически исправить все мелкие ошибки и опечатки
lint-fix:
	npm run lint -- --fix

# Красиво выровнять все отступы, скобки и кавычки во всех файлах проекта
format:
	npx prettier --write .