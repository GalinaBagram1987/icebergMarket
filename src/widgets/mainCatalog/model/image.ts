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

import type { MainCatalogImage } from '../../../entities/mainCatalog/model/types';

export const catalogImages = [
  { slug: 'auto-moto', src: auto1, alt: 'Авто' },
  { slug: 'computers-tech', src: computers2, alt: 'Компьютеры' },
  { slug: 'construction', src: construction3, alt: 'Строительство' },
  { slug: 'instruments-and-equipment', src: tools4, alt: 'Инструменты' },
  { slug: 'appliances', src: household5, alt: 'Бытовая техника' },
  { slug: 'furniture', src: furniture6, alt: 'Мебель' },
  { slug: 'water-tech', src: waterGoods7, alt: 'Товары для воды' },
  { slug: 'sport-tourism-hunting', src: tourism8, alt: 'Туризм' },
  { slug: 'garden-country', src: dacha9, alt: 'Дача' },
  { slug: 'pet-supplies', src: animals10, alt: 'Товары для животных' },
  { slug: 'clothes-shoes-accessories', src: clothes11, alt: 'Одежда' },
  { slug: 'kitchenware', src: dishes12, alt: 'Посуда' },
  { slug: 'fabrics-haberdashery', src: fabrics13, alt: 'Ткани' },
  { slug: 'stationery', src: stationery14, alt: 'Канцелярия' },
  { slug: 'food-beverages', src: foods15, alt: 'Продукты питания' },
  { slug: 'containers-packaging', src: packaging16, alt: 'Упаковка' },
  { slug: 'beauty', src: beauty17, alt: 'Красота' },
  { slug: 'health', src: health18, alt: 'Здоровье' },
  { slug: 'gifts-souvenirs-flowers', src: souvenirs19, alt: 'Сувениры' },
  { slug: 'kids-maternity', src: toys20, alt: 'Игрушки' },
] satisfies MainCatalogImage[];
