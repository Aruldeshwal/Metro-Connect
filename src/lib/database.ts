import { PrismaClient } from '@prisma/client';

// This is a global declaration to prevent multiple instances of PrismaClient in development.
// It extends the global object with a property 'prisma' of type PrismaClient or undefined.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient;
}

// Check if a global PrismaClient instance already exists, otherwise create a new one.
// This implements the singleton pattern for PrismaClient.
export const prisma = global.prisma || new PrismaClient();

// In development, store the PrismaClient instance on the global object.
// This prevents hot-reloading from creating new instances with each reload.
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}

// The 'prisma' client instance is now ready to be imported and used throughout your application.