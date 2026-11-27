'use client';

import { useEffect, useRef } from 'react';
import type * as MapLibre from 'maplibre-gl';
import type { UseOpenFreeMapListParams } from './types';
import type { MapPointOpenFreeMap } from './types';

/**
 * Дефолтные координаты и настройки
 */

const SOCHI_CENTER: [number, number] = [39.7257, 43.5855]; // long , lat
const MARKER_COLOR = '#1E88E5';
const ACTIVE_MARKER_COLOR = '#E53935';
const CARTO_KEY = 'cb1_5gxk_1_06a11b6e65f6fd8933d0b22d';

/**
 * Вспомогательная функция: превращает массив точек в GeoJSON для MapLibre
 */

const buildPointsGeoJSON = (points: MapPointOpenFreeMap[], activePointId: string | number | null) => ({
  type: 'FeatureCollection',
  features: points.map((point) => ({
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: point.coordinates,
    },
    properties: {
      id: point.id,
      isActive: point.id === activePointId,
    },
  })),
});

/**
 * Хук инициализации карт для поиска по карте
 * выдает список точек на карте
 * есть клик по точке. посдветка активной точки
 */

export const useOpenFreeMapList = ({ points, activePointId = null, defaultCenter = SOCHI_CENTER, isSplitView, onPointClick, onMapClick, zoom = 12 }: UseOpenFreeMapListParams) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibre.Map | null>(null);
  const isLoadedRef = useRef(false);
  const observerRef = useRef<ResizeObserver | null>(null);

  const callbacksRef = useRef({ onPointClick, onMapClick });
  callbacksRef.current = { onPointClick, onMapClick };

  //  Создание карты и слоёв (один раз при монтировании)
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      try {
        const maplibregl = await import('maplibre-gl');

        if (cancelled || !mapRef.current || mapInstanceRef.current) return;

        const initialCenter = points.length > 0 ? points[0].coordinates : defaultCenter;

        const tileHost = ['basemaps', 'cartocdn', 'com'].join('.');
        const tilePath = ['rastertiles', 'voyager', '{z}', '{x}', '{y}.png'].join('/');

        const map = new maplibregl.Map({
          center: initialCenter,
          zoom,
          minZoom: 3,
          maxZoom: 19,
          container: mapRef.current,
          style: {
            version: 8,
            sources: {
              osm: {
                type: 'raster',
                tiles: [`https://${tileHost}/${tilePath}?key=${CARTO_KEY}`],
                tileSize: 256,
                maxzoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/attributions">CARTO</a>',
              },
            },
            layers: [{ id: 'osm', type: 'raster', source: 'osm' }],
          },
        });

        // == добавили навигационную панель

        map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        // == Добавляем группу точек после загрузки карты
        map.on('load', () => {
          if (cancelled) return;

          map.addSource('points-source', {
            type: 'geojson',
            data: buildPointsGeoJSON(points, activePointId),
          });

          map.addLayer({
            id: 'points-layer',
            type: 'circle',
            source: 'points-source',
            paint: {
              // Активная точка больше (11px), обычная — 8px
              'circle-radius': ['case', ['get', 'isActive'], 11, 8],
              // Активная точка красная, обычная — синяя
              'circle-color': ['case', ['get', 'isActive'], ACTIVE_MARKER_COLOR, MARKER_COLOR],
              'circle-stroke-width': 2.5,
              'circle-stroke-color': '#ffffff',
            },
          });

          // == Клик по конкретной точке
          map.on('click', 'points-layer', (e) => {
            const feature = e.features?.[0];
            const id = feature?.properties?.id;
            if (id !== undefined && callbacksRef.current.onPointClick) {
              callbacksRef.current.onPointClick(id);
            }
          });

          // == Клик по пустому месту карты (сброс выделения)
          map.on('click', (e) => {
            const clickedFeatures = map.queryRenderedFeatures(e.point, {
              layers: ['points-layer'],
            });
            if (clickedFeatures.length === 0 && callbacksRef.current.onMapClick) {
              callbacksRef.current.onMapClick();
            }
          });

          // == Курсор при наведении на точку
          map.on('mouseenter', 'points-layer', () => {
            map.getCanvas().style.cursor = 'pointer';
          });
          map.on('mouseleave', 'points-layer', () => {
            map.getCanvas().style.cursor = '';
          });

          isLoadedRef.current = true;
          map.resize();

          if (points.length > 1) {
            const bounds = new maplibregl.LngLatBounds();
            points.forEach((p) => bounds.extend(p.coordinates));
            map.fitBounds(bounds, { padding: 50, maxZoom: 15 });
          }
        });
        // == карта в реф
        mapInstanceRef.current = map;
        // == слушатель размера. изменяем размер, карта перестраивается
        const observer = new ResizeObserver(() => {
          mapInstanceRef.current?.resize();
        });
        observer.observe(mapRef.current);
        observerRef.current = observer;
      } catch (error) {
        console.error('Ошибка при инициализации карты:', error);
      }
    };

    initMap();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обновляем точки и подсветку активной при изменении points или activePointId
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map || !isLoadedRef.current) return;

    const source = map.getSource('points-source') as MapLibre.GeoJSONSource | undefined;
    if (source) {
      source.setData(buildPointsGeoJSON(points, activePointId));
    }

    // Если выбрана активная точка — плавно центрируемся на ней
    if (activePointId !== null) {
      const active = points.find((p) => p.id === activePointId);
      if (active) {
        map.flyTo({ center: active.coordinates, zoom: Math.max(map.getZoom(), 14) });
      }
    }
  }, [points, activePointId]);

  // Пересчитываем размер карты при переключении режима split-view
  useEffect(() => {
    mapInstanceRef.current?.resize();
  }, [isSplitView]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
      isLoadedRef.current = false;
    };
  }, []);

  return { mapRef };
};
