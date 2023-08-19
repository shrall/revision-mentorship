import { Plus, Trash } from 'lucide-react';
import * as React from 'react';

import Button from '@/components/buttons/Button';
import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

// !IMPORTANT: Don't look at this page as an example of how to do your task.
// !           Find your own resources online

export default function ApiTesterPage() {
  return (
    <Layout>
      <Seo templateTitle='API Tester' />

      <main>
        <section className=''>
          <div className='layout min-h-screen py-20'>
            <h1>API Tester</h1>

            <GetProductsTester />
            <GetSingleProductTester />
            <CreateProductTester />
            <DeleteProductTester />
            <PatchProductTester />
          </div>
        </section>
      </main>
    </Layout>
  );
}

function GetProductsTester() {
  const [products, setProducts] = React.useState();

  React.useEffect(() => {
    fetch('/api/product')
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      });
  }, []);

  return (
    <div className='mt-8 space-y-4'>
      <h2 className='p text-lg font-medium'>GET /products</h2>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(products, null, 2)}
      </pre>
    </div>
  );
}

function GetSingleProductTester() {
  const [product, setProduct] = React.useState();

  React.useEffect(() => {
    fetch('/api/product/1')
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
      });
  }, []);

  return (
    <div className='mt-8 space-y-4'>
      <h2 className='p text-lg font-medium'>GET /product/1</h2>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(product, null, 2)}
      </pre>
    </div>
  );
}

function CreateProductTester() {
  const [response, setResponse] = React.useState({});
  const body = {
    id: 4,
    title: 'Baseball Cap',
    description: 'This is a baseball cap (generated from api tester)',
    price: 10,
  };

  function createProduct() {
    fetch('/api/product', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(setResponse);
  }

  return (
    <div className='mt-8 space-y-4'>
      <h2 className='p text-lg font-medium'>POST /product</h2>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify({ body }, null, 2)}
      </pre>
      <Button onClick={createProduct} variant='light' leftIcon={Plus}>
        Add New
      </Button>

      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}

function DeleteProductTester() {
  const [response, setResponse] = React.useState({});

  function deleteProduct() {
    fetch('/api/product/4', {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then(setResponse);
  }

  return (
    <div className='mt-8 space-y-4'>
      <h2 className='p text-lg font-medium'>DELETE /product/4</h2>
      <p className='text-sm'>Make sure to add the product first</p>
      <Button onClick={deleteProduct} variant='light' leftIcon={Trash}>
        Delete
      </Button>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}

function PatchProductTester() {
  const [response, setResponse] = React.useState({});

  const body = {
    description: `This is a white t-shirt (random: ${Math.floor(
      Math.random() * 100
    )})`,
  };

  function patchProduct() {
    fetch('/api/product/1', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'PATCH',
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then(setResponse);
  }

  return (
    <div className='mt-8 space-y-4'>
      <h2 className='p text-lg font-medium'>PATCH /product/1</h2>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(
          {
            description: `This is a white t-shirt (random: Math.random())`,
          },
          null,
          2
        )}
      </pre>
      <Button onClick={patchProduct} variant='light' leftIcon={Trash}>
        Patch
      </Button>
      <pre className='overflow-x-auto text-xs'>
        {JSON.stringify(response, null, 2)}
      </pre>
    </div>
  );
}
