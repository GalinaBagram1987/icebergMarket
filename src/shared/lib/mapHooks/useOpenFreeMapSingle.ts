'use client';

import { useEffect, useRef } from 'react';
import type * as MapLibre from 'maplibre-gl';
import { UseOpenFreeMapSingleParams } from './types';

const SOCHI_CENTER: [number, number] = [39.7257, 43.5855]; // long , lat
const MARKER_COLOR = '#1E88E5';
const CARTO_KEY = 'cb1_5gxk_1_06a11b6e65f6fd8933d0b22d';

export const useOpenFreeMapSingle = ({ coordinates, zoom = 15 }: UseOpenFreeMapSingleParams) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const mapInstanceRef = useRef<MapLibre.Map | null>(null);
  const markerRef = useRef<MapLibre.Marker | null>(null);
  const observerRef = useRef<ResizeObserver | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    let cancelled = false;

    const initMap = async () => {
      try {
        const maplibregl = await import('maplibre-gl');

        if (cancelled || !mapRef.current || mapInstanceRef.current) return;

        const targetCenter = coordinates ?? SOCHI_CENTER;
        //https://basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}.png?

        const tileHost = ['basemaps', 'cartocdn', 'com'].join('.');
        const tilePath = ['rastertiles', 'voyager', '{z}', '{x}', '{y}.png'].join('/');

        const map = new maplibregl.Map({
          center: SOCHI_CENTER,
          zoom: 12,
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

        map.addControl(new maplibregl.NavigationControl(), 'bottom-right');

        markerRef.current = new maplibregl.Marker({ color: MARKER_COLOR }).setLngLat(targetCenter).addTo(map);

        map.on('load', () => {
          map.resize();
        });

        mapInstanceRef.current = map;

        const observer = new ResizeObserver(() => {
          if (mapInstanceRef.current) {
            try {
              mapInstanceRef.current.resize();
            } catch (error) {
              console.error('Ошибка при resize карты:', error);
            }
          }
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
  }, [coordinates?.[0], coordinates?.[1]]);

  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
      observerRef.current = null;
      markerRef.current?.remove();
      markerRef.current = null;
      mapInstanceRef.current?.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  return { mapRef };
};
