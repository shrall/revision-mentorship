import Image from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

import { Product } from '@/schema/product';

type ProductCardProps = {
  product: Product;
} & React.ComponentPropsWithoutRef<'div'>;

export default function ProductCard({
  product,
  className,
  ...rest
}: ProductCardProps) {
  return (
    <div className={cn('group relative', className)} {...rest}>
      <div className='h-56 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:h-72 xl:h-80'>
        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            layout='fill'
            objectFit='cover'
          />
        )}
      </div>
      <h3 className='mt-4 text-sm text-gray-700'>
        <a href='#'>
          <span className='absolute inset-0' />
          {product.title}
        </a>
      </h3>
      <p className='mt-1 text-sm text-gray-500'>{product.description}</p>
      <p className='mt-1 text-sm font-medium text-gray-900'>{product.price}</p>
    </div>
  );
}
