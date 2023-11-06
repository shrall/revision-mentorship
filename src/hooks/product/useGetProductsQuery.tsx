import { useQuery } from '@tanstack/react-query';

import { Product } from '@/schema/product';
import api from '@/services/api';

function useGetProductsQuery() {
  const result = useQuery(['products'], {
    queryFn: () =>
      api.get<{ data: Product[] }>('/api/product').then((res) => res.data),
  });

  return result;
}

export default useGetProductsQuery;
