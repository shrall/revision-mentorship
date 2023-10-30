import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

import { Product } from '@/schema/product';
import api from '@/services/api';

function useCreateProduct() {
  const router = useRouter();
  const { mutateAsync: createProductMutation, isLoading } = useMutation({
    mutationFn: (product: Product) => {
      return api.post(`/api/product`, product);
    },
  });

  const onSubmit = (data: Product) => {
    const product = {
      ...data,
      price: Number(data.price),
    };
    toast.promise(createProductMutation(product), {
      loading: 'Creating new product...',
      success: (data) => {
        router.push('/');
        return `Successfully added new product | ${data.data.title}`;
      },
      error: (err) => {
        return `Failed to add new product | ${err.message}`;
      },
    });
  };
  return { onSubmit, isLoading };
}

export default useCreateProduct;
