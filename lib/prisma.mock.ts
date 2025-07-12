/**
 * This file provides a mock implementation of Prisma client
 * to be used during build time when Prisma isn't initialized.
 *
 * In a production environment, you would replace this with actual Prisma client.
 */

// Mock PrismaClient with methods that return empty results
export const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  skill: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  userSkillOffered: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  userSkillWanted: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  swapRequest: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => ({}),
    update: async () => ({}),
    delete: async () => ({}),
  },
  // Add other models as needed
};
