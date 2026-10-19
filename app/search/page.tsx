import { connection } from 'next/server';
import { Suspense } from 'react';

import type { Metadata } from 'next';
import { SearchPageCollector } from '@/_pages/searchPageCollector';
import { catalogRequest } from '@/shared/api/apiMethods/catalog';

/**
 * Тип для страницы поиска
 */

type SearchPageProps = {};
