// Главная страница поисковика — ЖИВЕТ ТУТ
import { Metadata } from 'next';
// import Link from 'next/link';

// Переопределяем метатеги конкретно для Главной страницы
export const metadata: Metadata = {
  title: 'Айсберг Маркет — Доска объявлений Сочи',
  description: 'Покупка и продажа товаров, автомобилей, недвижимости в Сочи. ',
};

const HomePage = () => {
  return (
    /** Сюда мы импортируем все компоненты главной страницы*/
    <h1>Привет! здесь будет Aйсберг Маркет</h1>
  );
};

export default HomePage;
