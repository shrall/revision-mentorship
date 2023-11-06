import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Product } from '@/schema/product';
import api from '@/services/api';

type UseCreateProductProps = {
  options?: UseMutationOptions<Product, unknown, Product, unknown>;
};

function useCreateProductMutation({ options }: UseCreateProductProps = {}) {
  const result = useMutation({
    mutationFn: async (product) => {
      const res = await api.post<{
        data: Product;
      }>(`/api/product`, product);
      return res.data.data;
    },
    ...options,
  });

  return result;
}

export default useCreateProductMutation;
