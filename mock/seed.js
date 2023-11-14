import { PrismaClient } from '@prisma/client';
import { users } from './user.js';
import { products } from './product.js';

const prisma = new PrismaClient();

const seed = async (field, data) => {
  await prisma.$connect();
  await prisma[field].createMany({ data });
  await prisma.$disconnect();
};

seed('user', users);
seed('product', products);
