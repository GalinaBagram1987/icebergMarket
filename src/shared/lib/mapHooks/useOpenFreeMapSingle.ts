'use client';

import { useEffect, useRef, useState } from 'react';
import type * as MapLibre from 'maplibre-gl';
import { UseOpenFreeMapSingleParams } from './types';

const SOCHI_CENTER: [number, number] = [39.720278, 43.585278];
const MARKER_COLOR = '#1E88E5';
const STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

export const useOpenFreeMapSingle = ({ coordinates, zoom = 12 }: UseOpenFreeMapSingleParams) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibre.Map | null>(null);
  const markerRef = useRef<MapLibre.Marker | null>(null);
  const maplibreRef = useRef<typeof MapLibre | null>(null);
  const [isMapReady, setIsMapReady] = useState(false);

  const upsertMarker = (maplibregl: typeof MapLibre, map: MapLibre.Map, coords: [number, number]) => {
    if (markerRef.current) {
      markerRef.current.setLngLat(coords);
    } else {
      markerRef.current = new maplibregl.Marker({ color: MARKER_COLOR }).setLngLat(coords).addTo(map);
    }
  };

  // Инициализация + cleanup в одном эффекте
  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;
    let observer: ResizeObserver | null = null;

    const initMap = async () => {
      try {
        const maplibregl = await import('maplibre-gl');
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

        observer = new ResizeObserver(() => {
          try {
            map.resize();
          } catch (error) {
            console.error('Ошибка при resize карты:', error);
          }
        });
        observer.observe(mapRef.current);

        setIsMapReady(true);
      } catch (error) {
        console.error('Ошибка при инициализации OpenFreeMap:', error);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      observer?.disconnect();
      try {
        markerRef.current?.remove();
      } catch (error) {
        console.error('Ошибка при удалении маркера:', error);
      } finally {
        markerRef.current = null;
      }
      try {
        mapInstanceRef.current?.remove();
      } catch (error) {
        console.error('Ошибка при удалении инстанса карты:', error);
      } finally {
        mapInstanceRef.current = null;
        maplibreRef.current = null;
        setIsMapReady(false);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Обновление — срабатывает и когда карта готова, и когда меняются координаты
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

  return { mapRef };
};
