import { BookMarked } from 'lucide-react';
import * as React from 'react';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';

export default function HomePage() {
  return (
    <Layout>
      {/* <Seo templateTitle='Home' /> */}
      <Seo />

      <main>
        <section className='bg-white'>
          <div className='layout relative flex min-h-screen flex-col items-center justify-center py-12 text-center'>
            <BookMarked size={48} />
            <h1 className='mt-4'>Revision-Style Mentorship</h1>
          </div>
        </section>
      </main>
    </Layout>
  );
}
