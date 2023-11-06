import { Loader2, Plus } from 'lucide-react';
import Link from 'next/link';
import * as React from 'react';

import useGetProductsQuery from '@/hooks/product/useGetProductsQuery';

import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/product/ProductCard';
import Seo from '@/components/Seo';

export default function HomePage() {
  const { data: products, isLoading } = useGetProductsQuery();

  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='bg-white'>
            <div className='mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8'>
              <div className='md:flex md:items-center md:justify-between'>
                <h2 className='text-2xl font-bold tracking-tight text-gray-900'>
                  Trending products
                </h2>
                <Link
                  href='/product/create'
                  className='hidden items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 md:flex'
                >
                  Add new product
                  <Plus size={16} className='ml-1' />
                </Link>
              </div>

              {isLoading && (
                <div className='flex h-[70vh] w-full items-center justify-center'>
                  <div className='flex animate-pulse items-center transition-all'>
                    Loading <Loader2 size={24} className='ml-1 animate-spin' />
                  </div>
                </div>
              )}

              <div className='mt-6 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8'>
                {products?.data.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
