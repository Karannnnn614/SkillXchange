/**
 * Prisma client initialization with graceful fallback
 * This version allows the app to build even when prisma generate hasn't been run
 */

// Import from mock file if @prisma/client is not available
let PrismaClient;
let prisma: any;

try {
  // Try to import PrismaClient
  const { PrismaClient: ImportedPrismaClient } = require('@prisma/client');
  PrismaClient = ImportedPrismaClient;

  // Initialize singleton
  const globalForPrisma = globalThis as unknown as {
    prisma: typeof PrismaClient | undefined;
  };

  prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
      log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
    });

  if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

  console.log('Prisma client initialized successfully');
} catch (error) {
  // If Prisma isn't available, use mock implementation
  console.warn('Prisma client initialization failed, using mock implementation');
  console.warn('To fix this, run `npx prisma generate`');

  // Use mock implementation from prisma.mock.ts
  prisma = require('./prisma.mock').prisma;
}

// Export the prisma client
export { prisma };
