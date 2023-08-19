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
  const schema = productSchema.pick({ id: true }).safeParse(req.query);
  if (!schema.success) {
    return res.status(400).json({
      message: schema.error.issues[0]?.message,
      issues: schema.error.issues,
    });
  }
  const { id } = schema.data;

  if (req.method === 'GET') {
    try {
      const products = await prismaClient.product.findFirstOrThrow({
        where: {
          id,
        },
      });
      return res.status(200).json(withTime({ data: products }));
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(withTime({ message: e.message }));
      }

      return res.status(500).json(withTime({ message: 'Server Error' }));
    }
  } else if (req.method === 'DELETE') {
    try {
      await prismaClient.product.delete({
        where: {
          id,
        },
      });
      return res.status(202).json({
        data: null,
        message: 'Product deleted successfully',
        fetchTime: new Date().toISOString(),
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(withTime({ message: e.message }));
      }

      return res.status(500).json(withTime({ message: 'Server Error' }));
    }
  } else if (req.method === 'PATCH') {
    try {
      const data = productSchema
        .omit({
          id: true,
          createdAt: true,
          updatedAt: true,
        })
        .partial()
        .parse(req.body);

      const updatedProduct = await prismaClient.product.update({
        where: {
          id,
        },
        data: data,
      });
      return res.status(200).json({
        data: updatedProduct,
        message: 'Product updated successfully',
        fetchTime: new Date().toISOString(),
      });
    } catch (e) {
      console.error(e);
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        return res.status(400).json(withTime({ message: e.message }));
      }

      if (e instanceof z.ZodError) {
        return res.status(400).json(
          withTime({
            message: e.issues[0]?.message,
            issues: e.issues,
          })
        );
      }

      return res.status(500).json(withTime({ message: 'Server Error' }));
    }
  } else {
    res.status(405).json(withTime({ message: 'Method Not Allowed' }));
  }
}
