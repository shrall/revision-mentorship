import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
async function main() {
  await prisma.product.create({
    data: {
      title: 'White T-Shirt',
      description: 'This is a white t-shirt',
      price: 29.99,
    },
  });
  await prisma.product.create({
    data: {
      title: 'Black T-Shirt',
      description: 'This is a black t-shirt',
      price: 29.99,
    },
  });
  await prisma.product.create({
    data: {
      title: 'Cargo Short',
      description: 'This is a cargo short',
      price: 59.99,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

export {};
