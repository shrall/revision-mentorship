import { useQuery } from '@tanstack/react-query';

import { Product } from '@/schema/product';
import api from '@/services/api';

function useGetAllProducts() {
  const result = useQuery<{ data: Product[] }>(['products'], {
    queryFn: async () => api.get('/api/product').then((res) => res.data),
  });

  return result;
}

export default useGetAllProducts;
