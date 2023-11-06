import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

import { Product } from '@/schema/product';
import api from '@/services/api';

type UseGetProductsProps = {
  options?: UseQueryOptions<Product[], unknown, Product[], QueryKey>;
};

function useGetProductsQuery({ options }: UseGetProductsProps = {}) {
  const result = useQuery<Product[], unknown, Product[], QueryKey>(
    ['products'],
    {
      queryFn: async () => {
        const res = await api.get<{ data: Product[] }>(`/api/product`);
        return res.data.data;
      },
      ...options,
    }
  );

  return result;
}

export default useGetProductsQuery;
