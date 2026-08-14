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

import type { MainCatalogUiConfig } from './types';

const ACCENT_BG = 'var(--btn-accent-bg)';
const ACCENT_BG_HOVER = 'var(--btn-accent-bg-hover)';
const NEUTRAL_BG = 'var(--btn-neutral-bg)';
const NEUTRAL_BG_HOVER = 'var(--btn-neutral-bg-hover)';

export const mainCatalogUiConfig = {
  'auto-moto': {
    area: 'auto',
    order: 1,
    src: auto1,
    alt: 'Авто',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'computers-tech': {
    area: 'computers',
    order: 2,
    src: computers2,
    alt: 'Компьютеры',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  construction: {
    area: 'construction',
    order: 3,
    src: construction3,
    alt: 'Строительство',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'instruments-and-equipment': {
    area: 'tools',
    order: 4,
    src: tools4,
    alt: 'Инструменты',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  appliances: {
    area: 'appliances',
    order: 5,
    src: household5,
    alt: 'Бытовая техника',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  furniture: {
    area: 'furniture',
    order: 6,
    src: furniture6,
    alt: 'Мебель',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'water-tech': {
    area: 'water-tech',
    order: 7,
    src: waterGoods7,
    alt: 'Товары для воды',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'sport-tourism-hunting': {
    area: 'sport-tourism',
    order: 8,
    src: tourism8,
    alt: 'Туризм',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'garden-country': {
    area: 'garden-country',
    order: 9,
    src: dacha9,
    alt: 'Дача',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'pet-supplies': {
    area: 'animals',
    order: 10,
    src: animals10,
    alt: 'Товары для животных',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'clothes-shoes-accessories': {
    area: 'clothes',
    order: 11,
    src: clothes11,
    alt: 'Одежда',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  kitchenware: {
    area: 'kitchenware',
    order: 12,
    src: dishes12,
    alt: 'Посуда',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  'fabrics-haberdashery': {
    area: 'fabrics',
    order: 13,
    src: fabrics13,
    alt: 'Ткани',
    bgColor: ACCENT_BG,
    hoverColor: ACCENT_BG_HOVER,
  },
  stationery: {
    area: 'stationery',
    order: 14,
    src: stationery14,
    alt: 'Канцелярия',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'food-beverages': {
    area: 'food-beverages',
    order: 15,
    src: foods15,
    alt: 'Продукты питания',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'containers-packaging': {
    area: 'packaging',
    order: 16,
    src: packaging16,
    alt: 'Упаковка',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  beauty: {
    area: 'beauty',
    order: 17,
    src: beauty17,
    alt: 'Красота',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  health: {
    area: 'health',
    order: 18,
    src: health18,
    alt: 'Здоровье',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'gifts-souvenirs-flowers': {
    area: 'gifts',
    order: 19,
    src: souvenirs19,
    alt: 'Сувениры',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
  'kids-maternity': {
    area: 'kids',
    order: 20,
    src: toys20,
    alt: 'Игрушки',
    bgColor: NEUTRAL_BG,
    hoverColor: NEUTRAL_BG_HOVER,
  },
} as MainCatalogUiConfig;
