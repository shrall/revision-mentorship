import { useMutation, UseMutationOptions } from '@tanstack/react-query';

import { Product } from '@/schema/product';
import api from '@/services/api';

interface UseCreateProductProps {
  options?: UseMutationOptions<Product, unknown, Product, unknown>;
}

function useCreateProduct({ options }: UseCreateProductProps = {}) {
  return useMutation({
    mutationFn: async (product) => {
      const res = await api.post(`/api/product`, product);
      return res.data.data;
    },
    ...options,
  });
}

export default useCreateProduct;
