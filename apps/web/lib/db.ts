import { PrismaClient } from '@prisma/client';

/**
 * Create a single Prisma client across the entire application.  In the
 * development environment Next.js may hot‑reload modules; using a
 * global variable prevents exhausting database connections.
 */
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma: PrismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}
