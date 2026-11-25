'use client';

import { useEffect, useRef, useState } from 'react';
import type * as MapLibre from 'maplibre-gl';
import { UseOpenFreeMapSingleParams } from './types';

const SOCHI_CENTER: [number, number] = [39.720278, 43.585278]; // long , lat
const MARKER_COLOR = '#1E88E5';
const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

export const useOpenFreeMapSingle = ({ coordinates, zoom = 15 }: UseOpenFreeMapSingleParams) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibre.Map | null>(null);
  const markerRef = useRef<MapLibre.Marker | null>(null);
  const maplibreRef = useRef<typeof MapLibre | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const upsertMarker = (maplibregl: typeof MapLibre, map: MapLibre.Map, coords: [number, number]) => {
    if (markerRef.current) {
      markerRef.current.setLngLat(coords);
    } else {
      markerRef.current = new maplibregl.Marker({ color: MARKER_COLOR }).setLngLat(coords).addTo(map);
    }
  };

  // 1. Инициализация карты: перезапускается при появлении coordinates (когда модалка уже открыта)
  useEffect(() => {
    if (!mapRef.current || !coordinates || mapInstanceRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      try {
        const maplibregl = await import('maplibre-gl');
        // const maplibregl = await import('maplibre-gl');
        maplibregl.setWorkerUrl('/maplibre/maplibre-gl-worker.mjs');
        if (cancelled || !mapRef.current || mapInstanceRef.current) return;

        maplibreRef.current = maplibregl;

        const map = new maplibregl.Map({
          container: mapRef.current,
          style: STYLE_URL,
          center: coordinates ?? SOCHI_CENTER,
          zoom,
        });

        map.addControl(new maplibregl.NavigationControl(), 'top-right');
        mapInstanceRef.current = map;

        const observer = new ResizeObserver(() => {
          try {
            map.resize();
          } catch (error) {
            console.error('Ошибка при resize карты:', error);
          }
        });
        observer.observe(mapRef.current);
        observerRef.current = observer;

        setIsMapReady(true);
      } catch (error) {
        console.error('Ошибка при инициализации OpenFreeMap:', error);
      }
    };

    initMap();

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coordinates?.[0], coordinates?.[1]]);

  // 2. Обновление центра и метки
  useEffect(() => {
    const maplibregl = maplibreRef.current;
    const map = mapInstanceRef.current;
    if (!isMapReady || !maplibregl || !map || !coordinates) return;

    try {
      map.flyTo({ center: coordinates, zoom, duration: 800 });
      upsertMarker(maplibregl, map, coordinates);
    } catch (error) {
      console.error('Ошибка при обновлении координат карты:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMapReady, coordinates?.[0], coordinates?.[1], zoom]);

  // 3. Очистка строго при размонтировании компонента (как в useYandexMap)
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      try {
        markerRef.current?.remove();
      } finally {
        markerRef.current = null;
      }
      try {
        mapInstanceRef.current?.remove();
      } finally {
        mapInstanceRef.current = null;
        maplibreRef.current = null;
      }
    };
  }, []);

  return { mapRef };
};
