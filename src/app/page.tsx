// Главная страница поисковика — ЖИВЕТ ТУТ
import { Metadata } from 'next';
import { SearchMain } from '@/widgets/SearchMainPage';
// import Link from 'next/link';

// Переопределяем метатеги конкретно для Главной страницы
export const metadata: Metadata = {
  title: 'Айсберг Маркет — Доска объявлений Сочи',
  description: 'Покупка и продажа товаров, автомобилей, недвижимости в Сочи. ',
};

const HomePage = () => {
  return (
    <main className="container">
      <SearchMain />
      <h1 style={{ marginTop: '20px', marginBottom: '20px' }}>Привет! здесь будет Aйсберг Маркет</h1>
    </main>
  );
};

export default HomePage;
