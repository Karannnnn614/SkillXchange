import { prisma } from '../prisma';
import { CreateUser, UpdateUser } from '../../schemas/validation';
import { AuthUtils } from '../auth';
import { User as PrismaUser, SwapRequestStatus, Prisma } from '@prisma/client';

export type User = PrismaUser;

export interface UserWithStats extends User {
  skillsOfferedCount: number;
  skillsWantedCount: number;
  completedSwapsCount: number;
  averageRating: number;
  totalRatings: number;
}

export class UserRepository {
  static async create(userData: CreateUser): Promise<User> {
    const hashedPassword = await AuthUtils.hashPassword(userData.password);

    const user = await prisma.user.create({
      data: {
        email: userData.email,
        username: userData.username,
        passwordHash: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        bio: userData.bio || null,
        location: userData.location || null,
        phone: userData.phone || null,
      },
    });

    return user;
  }

  static async findByEmail(email: string): Promise<(User & { passwordHash: string }) | null> {
    const user = await prisma.user.findFirst({
      where: {
        email,
        isActive: true,
      },
    });

    return user;
  }

  static async findByUsername(username: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        username,
        isActive: true,
      },
    });

    return user;
  }

  static async findById(id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
    });

    return user;
  }

  static async findByIdWithStats(id: string): Promise<UserWithStats | null> {
    const user = await prisma.user.findFirst({
      where: {
        id,
        isActive: true,
      },
      include: {
        skillsOffered: true,
        skillsWanted: true,
        swapRequestsMade: {
          where: { status: SwapRequestStatus.COMPLETED },
        },
        swapRequestsReceived: {
          where: { status: SwapRequestStatus.COMPLETED },
        },
        ratingsReceived: true,
      },
    });

    if (!user) return null;

    const skillsOfferedCount = user.skillsOffered.length;
    const skillsWantedCount = user.skillsWanted.length;
    const completedSwapsCount = user.swapRequestsMade.length + user.swapRequestsReceived.length;
    const averageRating =
      user.ratingsReceived.length > 0
        ? user.ratingsReceived.reduce((sum: number, rating: any) => sum + rating.rating, 0) /
          user.ratingsReceived.length
        : 0;
    const totalRatings = user.ratingsReceived.length;

    const {
      skillsOffered,
      skillsWanted,
      swapRequestsMade,
      swapRequestsReceived,
      ratingsReceived,
      ...userWithoutRelations
    } = user;

    return {
      ...userWithoutRelations,
      skillsOfferedCount,
      skillsWantedCount,
      completedSwapsCount,
      averageRating,
      totalRatings,
    };
  }

  static async update(id: string, userData: UpdateUser): Promise<User | null> {
    const updateData: Prisma.UserUpdateInput = {};

    if (userData.firstName !== undefined) updateData.firstName = userData.firstName;
    if (userData.lastName !== undefined) updateData.lastName = userData.lastName;
    if (userData.bio !== undefined) updateData.bio = userData.bio;
    if (userData.location !== undefined) updateData.location = userData.location;
    if (userData.phone !== undefined) updateData.phone = userData.phone;
    if (userData.isPublic !== undefined) updateData.isPublic = userData.isPublic;

    if (Object.keys(updateData).length === 0) {
      return this.findById(id);
    }

    const user = await prisma.user.update({
      where: {
        id,
        isActive: true,
      },
      data: updateData,
    });

    return user;
  }

  static async updateLastSeen(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { lastSeen: new Date() },
    });
  }

  static async search(
    query?: string,
    location?: string,
    skillOffered?: string,
    skillWanted?: string,
    isOnline?: boolean,
    page: number = 1,
    limit: number = 10
  ): Promise<{ users: UserWithStats[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: Prisma.UserWhereInput = {
      isActive: true,
      isPublic: true,
    };

    if (query) {
      where.OR = [
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
        { username: { contains: query, mode: 'insensitive' } },
        { bio: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    if (skillOffered) {
      where.skillsOffered = {
        some: {
          skill: {
            name: { contains: skillOffered, mode: 'insensitive' },
          },
        },
      };
    }

    if (skillWanted) {
      where.skillsWanted = {
        some: {
          skill: {
            name: { contains: skillWanted, mode: 'insensitive' },
          },
        },
      };
    }

    if (isOnline) {
      const fifteenMinutesAgo = new Date(Date.now() - 15 * 60 * 1000);
      where.lastSeen = { gt: fifteenMinutesAgo };
    }

    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        include: {
          skillsOffered: true,
          skillsWanted: true,
          swapRequestsMade: {
            where: { status: SwapRequestStatus.COMPLETED },
          },
          swapRequestsReceived: {
            where: { status: SwapRequestStatus.COMPLETED },
          },
          ratingsReceived: true,
        },
        orderBy: [{ lastSeen: 'desc' }, { createdAt: 'desc' }],
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    const usersWithStats: UserWithStats[] = users.map((user: any) => {
      const skillsOfferedCount = user.skillsOffered.length;
      const skillsWantedCount = user.skillsWanted.length;
      const completedSwapsCount = user.swapRequestsMade.length + user.swapRequestsReceived.length;
      const averageRating =
        user.ratingsReceived.length > 0
          ? user.ratingsReceived.reduce((sum: number, rating: any) => sum + rating.rating, 0) /
            user.ratingsReceived.length
          : 0;
      const totalRatings = user.ratingsReceived.length;

      const {
        skillsOffered,
        skillsWanted,
        swapRequestsMade,
        swapRequestsReceived,
        ratingsReceived,
        ...userWithoutRelations
      } = user;

      return {
        ...userWithoutRelations,
        skillsOfferedCount,
        skillsWantedCount,
        completedSwapsCount,
        averageRating,
        totalRatings,
      };
    });

    return {
      users: usersWithStats,
      total,
    };
  }

  static async exists(
    email: string,
    username: string
  ): Promise<{ emailExists: boolean; usernameExists: boolean }> {
    const [emailUser, usernameUser] = await Promise.all([
      prisma.user.findFirst({
        where: { email, isActive: true },
        select: { id: true },
      }),
      prisma.user.findFirst({
        where: { username, isActive: true },
        select: { id: true },
      }),
    ]);

    return {
      emailExists: !!emailUser,
      usernameExists: !!usernameUser,
    };
  }

  static async deactivate(id: string): Promise<boolean> {
    try {
      await prisma.user.update({
        where: {
          id,
          isActive: true,
        },
        data: { isActive: false },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}
