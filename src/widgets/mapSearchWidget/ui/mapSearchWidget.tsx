'use client';

import { useState, useEffect, useMemo } from 'react';
import type { MapDrawerState, MapSearchWidgetProps } from '../module/types';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';
import type { PostDetailResponse } from '@/shared/api/apiMethods/catalog';
import styles from './mapSearchCollector.module.css';
import type { MapPointItem, UseYandexMapListProps } from '@/shared/lib';
import { getCoordinatesByAddress } from '@/shared/lib';
import { useYandexMapList } from '@/shared/lib';

/**
 * Виджет результата поиска по карте
 * встраивается в имеющиеся страницы
 * поиск
 * категория
 * подкатегория
 * прогружается при нажатии показать на карте
 * пути и начальный интерфейс имеет как у страницы-родителя
 */

export const MapSearchWidget = ({ initialSearchData, onCloseMap, className }: MapSearchWidgetProps) => {
  const [drawerState, setDrawerState] = useState<MapDrawerState>({ mode: 'map' });
  const [mapPoint, setMapPoints] = useState<MapPointItem[]>([]);

  // Стейт для Состояния В (детальный товар по клику на точку)
  const [selecredProduct, setSelectedProduct] = useState<PostDetailResponse | null>(null);
  const [isProductLoading, setIsProductLoading] = useState<boolean>(false);

  useEffect(() => {}, [initialSearchData.posts]);

  useEffect(() => {
    let isCancelled = false;

    const loadPoints = async () => {
      const postsWithAddress = (initialSearchData.posts ?? []).filter((post): post is typeof post & { address: string } => Boolean(post.address?.trim()));

      if (postsWithAddress.length === 0) {
        setMapPoints([]);
        return;
      }

      const results = await Promise.all(
        postsWithAddress.map(async (post): Promise<MapPointItem | null> => {
          try {
            const cleanAddress = post.address.replace(/\//g, ', ');
            const coordinates = await getCoordinatesByAddress(cleanAddress);
            return { id: post.id, coordinates };
          } catch {
            return null;
          }
        }),
      );

      if (!isCancelled) {
        setMapPoints(results.filter((item): item is MapPointItem => item !== null));
      }
    };

    loadPoints();

    return () => {
      isCancelled = true;
    };
  }, [initialSearchData.posts]);

  // деструктурируем пары [id, address], запоминаем
  const rawAddressPairs = useMemo(() => {
    const { posts = [] } = initialSearchData;
    return posts.filter((post): post is typeof post & { address: string } => Boolean(post.address?.trim())).map((post) => [post.id, post.address] as const);
  }, [initialSearchData]);

  const coordinateAdressPair = rawAddressPairs.map((pair) => {
    const [id, address] = pair;
    const coordinates = getCoordinatesByAddress(address);
    return [id, coordinates];
  });
};
