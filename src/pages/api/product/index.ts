import { Prisma } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';
import { z } from 'zod';

import { withTime } from '@/lib/helper.server';
import { prismaClient } from '@/lib/prisma.server';

import { productSchema } from '@/schema/product';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    try {
      const products = await prismaClient.product.findMany();

      return res.status(200).json(withTime({ data: products }));
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json({ message: e.message });
      }

      return res.status(500).json({ message: 'Server Error' });
    }
  } else if (req.method === 'POST') {
    try {
      const data = productSchema
        .omit({
          createdAt: true,
          updatedAt: true,
        })
        // for testing purposes
        .partial({
          id: true,
        })
        .parse(req.body);

      const createdProduct = await prismaClient.product.create({
        data,
      });

      return res.status(201).json(
        withTime({
          data: createdProduct,
          message: 'Product created successfully',
        })
      );
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(
          withTime({
            message: e.message,
          })
        );
      }

      if (e instanceof z.ZodError) {
        return res.status(400).json(
          withTime({
            message: e.issues[0]?.message,
            issues: e.issues,
          })
        );
      }

      return res.status(500).json({ message: 'Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
