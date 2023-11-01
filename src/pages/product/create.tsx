import clsx from 'clsx';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { CgSpinner } from 'react-icons/cg';
import { toast } from 'sonner';

import useCreateProduct from '@/hooks/product/useCreateProduct';

import { Product } from '@/schema/product';
import { REGEX } from '@/utils/regex';

function CreateProductPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Product>();

  const { mutateAsync: createProductMutation, isLoading } = useCreateProduct();

  function onSubmit(data: Product) {
    const product = {
      ...data,
      price: Number(data.price),
    };
    toast.promise(createProductMutation(product), {
      loading: 'Creating new product...',
      success: (data) => {
        router.push('/');
        return `Successfully added new product | ${data.title}`;
      },
      error: (err) => {
        return `Failed to add new product | ${err.message}`;
      },
    });
  }

  return (
    <div className='mx-auto max-w-lg px-4'>
      <h2>Create new product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='mt-1 space-y-4 divide-y divide-gray-200'
      >
        <div className='sm:col-span-3'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <div className='mt-1'>
            <input
              type='text'
              id='title'
              autoComplete='title'
              {...register('title', { required: 'Title cannot be empty' })}
              className={clsx(
                'block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                errors.title ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-500'>
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
        <div className='sm:col-span-3'>
          <label
            htmlFor='price'
            className='block text-sm font-medium text-gray-700'
          >
            Price
          </label>
          <div className='mt-1'>
            <input
              type='number'
              id='price'
              autoComplete='price'
              {...register('price', {
                required: 'Price cannot be empty',
                pattern: {
                  value: REGEX.NUMBER,
                  message: 'Price must be a valid number',
                },
              })}
              className={clsx(
                'block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                errors.price ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.price && (
              <p className='mt-2 text-sm text-red-500'>
                {errors.price.message}
              </p>
            )}
          </div>
        </div>
        <div className='sm:col-span-3'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <div className='mt-1'>
            <textarea
              id='description'
              autoComplete='description'
              {...register('description', {
                required: 'Description cannot be empty',
              })}
              className={clsx(
                'block w-full rounded-md border shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm',
                errors.title ? 'border-red-500' : 'border-gray-300'
              )}
            />
            {errors.title && (
              <p className='mt-2 text-sm text-red-500'>
                {errors.title.message}
              </p>
            )}
          </div>
        </div>
        <div className='pt-5'>
          <div className='flex justify-end'>
            <button
              type='button'
              disabled={isLoading}
              className='rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50'
            >
              Cancel
            </button>
            <button
              type='submit'
              disabled={isLoading}
              className='ml-3 inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
            >
              {isLoading ? (
                <CgSpinner className='h-4 w-4 animate-spin' />
              ) : (
                <span>Save</span>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateProductPage;
