# Установка зависимостей

make install

# Запуск разработки

make dev

# Проверка кода перед коммитом

make lint
make format

# Сборка и запуск продакшена

make build
make start

## Структура проекта

Проект использует [Feature-Sliced Design](https://feature-sliced.design/) с адаптацией под Next.js App Router.

- `app/` — системная папка Next.js. Содержит только файлы-прокси (`page.tsx`, `layout.tsx`), которые реэкспортируют компоненты из `src/_pages/` и `src/_app/`.
- `src/_app/` — FSD-слой `app`. Глобальные настройки: провайдеры (Redux, React Query), глобальные стили, корневой layout с метаданными.
- `src/_pages/` — FSD-слой `pages`. Каждая страница — отдельная папка с `ui/PageName.tsx` и `index.ts`, который экспортирует компонент и метаданные.
- `src/widgets/`, `src/features/`, `src/entities/`, `src/shared/` — остальные FSD-слои по назначению.

Подробнее о каждом слое читайте в [документации FSD](https://feature-sliced.design/).
