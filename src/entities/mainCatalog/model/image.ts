import auto1 from '../assets/images/1_auto.png';
import computers2 from '../assets/images/2_computers.png';
import construction3 from '../assets/images/3_construction.png';
import tools4 from '../assets/images/4_tools.png';
import household5 from '../assets/images/5_household.png';
import furniture6 from '../assets/images/6_furniture.png';
import waterGoods7 from '../assets/images/7_waterGoods.png';
import tourism8 from '../assets/images/8_tourism.png';
import dacha9 from '../assets/images/9_dacha.png';
import animals10 from '../assets/images/10_animals.png';
import clothes11 from '../assets/images/11_clothes.png';
import dishes12 from '../assets/images/12_dishes.png';
import fabrics13 from '../assets/images/13_fabrics.png';
import stationery14 from '../assets/images/14_stationery.png';
import foods15 from '../assets/images/15_foods.png';
import packaging16 from '../assets/images/16_packaging.png';
import beauty17 from '../assets/images/17_beauty.png';
import health18 from '../assets/images/18_health.png';
import souvenirs19 from '../assets/images/19_souvenirs.png';
import toys20 from '../assets/images/20_toys.png';

import type { MainCatalogImage } from './types';

export const catalogImages = [
  { id: 1, src: auto1, alt: 'Авто' },
  { id: 2, src: computers2, alt: 'Компьютеры' },
  { id: 3, src: construction3, alt: 'Строительство' },
  { id: 4, src: tools4, alt: 'Инструменты' },
  { id: 5, src: household5, alt: 'Товары для дома' },
  { id: 6, src: furniture6, alt: 'Мебель' },
  { id: 7, src: waterGoods7, alt: 'Товары для воды' },
  { id: 8, src: tourism8, alt: 'Туризм' },
  { id: 9, src: dacha9, alt: 'Дача' },
  { id: 10, src: animals10, alt: 'Товары для животных' },
  { id: 11, src: clothes11, alt: 'Одежда' },
  { id: 12, src: dishes12, alt: 'Посуда' },
  { id: 13, src: fabrics13, alt: 'Ткани' },
  { id: 14, src: stationery14, alt: 'Канцелярия' },
  { id: 15, src: foods15, alt: 'Продукты питания' },
  { id: 16, src: packaging16, alt: 'Упаковка' },
  { id: 17, src: beauty17, alt: 'Красота' },
  { id: 18, src: health18, alt: 'Здоровье' },
  { id: 19, src: souvenirs19, alt: 'Сувениры' },
  { id: 20, src: toys20, alt: 'Игрушки' },
] satisfies MainCatalogImage[];
