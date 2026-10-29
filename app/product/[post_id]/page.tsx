import { connection } from 'next/server';
import { Suspense } from 'react';
import { getTranslations } from 'next-intl/server';

import type { Metadata } from 'next';
import { ProductPageCollector } from '@/_pages/productPage';
import { serverFetchAndCachedProduct } from '@/entities/catalog';

/* Тип для страницы продукта
 * примимает ID. грузит метатеги и данные
 * searchParams - втроенная в некс фича - ловит изменения из поиска и добавляет в url
 */

type ProductPageAppProps = {
  params: Promise<{
    post_id: string;
  }>;
};

type MetadataProductProps = Pick<ProductPageAppProps, 'params'>;

/**
 * Динамические метаданные страницы товара.
 */

export const generateMetadata = async ({ params }: MetadataProductProps): Promise<Metadata> => {
  console.log('[PAGE] before await params');

  const { post_id } = await params;
  const { title } = await serverFetchAndCachedProduct(post_id);

  if (!title) {
    return {
      title: 'Товар не найден',
      description: 'Запрашиваемый товар не найден.',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    // title: `${title} — Айсберг Маркет`,
    // description: ` «${title}».`,
  };
};

/**
 * Для некс переносим асинхронную логику отдельно, чтобы потом обвернуть все в suspense
 */

const ProductPageContent = async ({ params }: ProductPageAppProps) => {
  // живое соединение, чтобы Next.js сразу переключил роут в динамический режим
  await connection();
  const resolvedParams = await params;
  const { post_id } = resolvedParams;
  const t = await getTranslations('icebergMarket');

  const productData = await serverFetchAndCachedProduct(post_id);

  return <ProductPageCollector t={t} productData={productData} />;
};

/**
 * Динамическая страница каталога товара по ID
 */

const ProductPageApp = async ({ params }: ProductPageAppProps) => {
  return (
    <Suspense fallback={null}>
      <ProductPageContent params={params} />
    </Suspense>
  );
};

export default ProductPageApp;
