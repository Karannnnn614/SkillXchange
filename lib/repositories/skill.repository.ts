import { prisma } from '../prisma';
import { CreateSkill, UserSkillOffered, UserSkillWanted } from '../../schemas/validation';

export type Skill = {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  difficultyLevel?: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT' | null;
  createdAt: Date | string;
};

export type SkillLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT';

export interface SkillWithStats extends Skill {
  usersOffering: number;
  usersWanting: number;
  totalSwaps: number;
}

export interface UserSkillOfferedRecord {
  id: string;
  userId: string;
  skillId: string;
  proficiencyLevel: SkillLevel;
  experienceYears: number;
  isVerified: boolean;
  description?: string | null;
  createdAt: Date | string;
  skill: Skill;
}

export interface UserSkillWantedRecord {
  id: string;
  userId: string;
  skillId: string;
  desiredLevel: SkillLevel;
  priority: number;
  description?: string | null;
  createdAt: Date | string;
  skill: Skill;
}

export class SkillRepository {
  static async create(skillData: CreateSkill): Promise<Skill> {
    const skill = await prisma.skill.create({
      data: {
        name: skillData.name,
        category: skillData.category,
        description: skillData.description || null,
        difficultyLevel: skillData.difficultyLevel
          ? (skillData.difficultyLevel.toUpperCase() as any)
          : null,
      },
    });

    return skill as Skill;
  }

  static async findById(id: string): Promise<Skill | null> {
    const skill = await prisma.skill.findUnique({
      where: { id },
    });

    return skill as Skill | null;
  }

  static async findByName(name: string): Promise<Skill | null> {
    const skill = await prisma.skill.findFirst({
      where: {
        name: {
          equals: name,
          mode: 'insensitive',
        },
      },
    });

    return skill as Skill | null;
  }

  static async search(
    query?: string,
    category?: string,
    difficultyLevel?: string,
    page: number = 1,
    limit: number = 10
  ): Promise<{ skills: SkillWithStats[]; total: number }> {
    const skip = (page - 1) * limit;
    const where: any = {};

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { description: { contains: query, mode: 'insensitive' } },
      ];
    }

    if (category) {
      where.category = { contains: category, mode: 'insensitive' };
    }

    if (difficultyLevel) {
      where.difficultyLevel = difficultyLevel as any;
    }

    const [skills, total] = await Promise.all([
      prisma.skill.findMany({
        where,
        include: {
          usersOffering: true,
          usersWanting: true,
          swapRequestsOffered: true,
          swapRequestsRequested: true,
        },
        orderBy: { name: 'asc' },
        skip,
        take: limit,
      }),
      prisma.skill.count({ where }),
    ]);

    const skillsWithStats: SkillWithStats[] = skills.map((skill: any) => {
      const usersOffering = skill.usersOffering.length;
      const usersWanting = skill.usersWanting.length;
      const totalSwaps = skill.swapRequestsOffered.length + skill.swapRequestsRequested.length;

      const {
        usersOffering: _,
        usersWanting: __,
        swapRequestsOffered,
        swapRequestsRequested,
        ...skillWithoutRelations
      } = skill;

      return {
        ...skillWithoutRelations,
        usersOffering,
        usersWanting,
        totalSwaps,
      };
    });

    return {
      skills: skillsWithStats,
      total,
    };
  }

  static async getCategories(): Promise<string[]> {
    const categories = await prisma.skill.findMany({
      select: { category: true },
      distinct: ['category'],
      orderBy: { category: 'asc' },
    });

    return categories.map((c: any) => c.category);
  }

  static async getPopular(limit: number = 10): Promise<SkillWithStats[]> {
    const skills = await prisma.skill.findMany({
      include: {
        usersOffering: true,
        usersWanting: true,
        swapRequestsOffered: true,
        swapRequestsRequested: true,
      },
      take: limit,
    });

    const skillsWithStats: SkillWithStats[] = skills.map((skill: any) => {
      const usersOffering = skill.usersOffering.length;
      const usersWanting = skill.usersWanting.length;
      const totalSwaps = skill.swapRequestsOffered.length + skill.swapRequestsRequested.length;

      const {
        usersOffering: _,
        usersWanting: __,
        swapRequestsOffered,
        swapRequestsRequested,
        ...skillWithoutRelations
      } = skill;

      return {
        ...skillWithoutRelations,
        usersOffering,
        usersWanting,
        totalSwaps,
      };
    });

    // Sort by total activity (users offering + wanting + swaps)
    return skillsWithStats.sort(
      (a, b) =>
        b.usersOffering +
        b.usersWanting +
        b.totalSwaps -
        (a.usersOffering + a.usersWanting + a.totalSwaps)
    );
  }

  // User Skills Offered methods
  static async addUserSkillOffered(
    data: UserSkillOffered & { userId: string }
  ): Promise<UserSkillOfferedRecord> {
    const userSkill = await prisma.userSkillOffered.create({
      data: {
        userId: data.userId,
        skillId: data.skillId,
        proficiencyLevel: data.proficiencyLevel as any,
        experienceYears: data.experienceYears || 0,
        description: data.description || null,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as any;
  }

  static async updateUserSkillOffered(
    data: UserSkillOffered & { userId: string }
  ): Promise<UserSkillOfferedRecord | null> {
    const userSkill = await prisma.userSkillOffered.update({
      where: {
        userId_skillId: {
          userId: data.userId,
          skillId: data.skillId,
        },
      },
      data: {
        proficiencyLevel: data.proficiencyLevel as any,
        experienceYears: data.experienceYears || 0,
        description: data.description || null,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as any;
  }

  static async getUserSkillsOffered(userId: string): Promise<UserSkillOfferedRecord[]> {
    const userSkills = await prisma.userSkillOffered.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { createdAt: 'desc' },
    });

    return userSkills as any[];
  }

  static async getUserSkillsWanted(userId: string): Promise<UserSkillWantedRecord[]> {
    const userSkills = await prisma.userSkillWanted.findMany({
      where: { userId },
      include: { skill: true },
      orderBy: { priority: 'asc' },
    });

    return userSkills as any[];
  }

  static async getUserSkillOffered(
    userId: string,
    skillId: string
  ): Promise<UserSkillOfferedRecord | null> {
    const userSkill = await prisma.userSkillOffered.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
      include: { skill: true },
    });

    return userSkill as any;
  }

  static async getUserSkillWanted(
    userId: string,
    skillId: string
  ): Promise<UserSkillWantedRecord | null> {
    const userSkill = await prisma.userSkillWanted.findUnique({
      where: {
        userId_skillId: {
          userId,
          skillId,
        },
      },
      include: { skill: true },
    });

    return userSkill as any;
  }

  // User Skills Wanted methods
  static async addUserSkillWanted(
    data: UserSkillWanted & { userId: string }
  ): Promise<UserSkillWantedRecord> {
    const userSkill = await prisma.userSkillWanted.create({
      data: {
        userId: data.userId,
        skillId: data.skillId,
        desiredLevel: data.desiredLevel as any,
        priority: data.priority || 1,
        description: data.description || null,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as any;
  }

  static async updateUserSkillWanted(
    data: UserSkillWanted & { userId: string }
  ): Promise<UserSkillWantedRecord | null> {
    const userSkill = await prisma.userSkillWanted.update({
      where: {
        userId_skillId: {
          userId: data.userId,
          skillId: data.skillId,
        },
      },
      data: {
        desiredLevel: data.desiredLevel as any,
        priority: data.priority || 1,
        description: data.description || null,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as any;
  }

  static async removeUserSkillOffered(userId: string, skillId: string): Promise<boolean> {
    try {
      await prisma.userSkillOffered.delete({
        where: {
          userId_skillId: {
            userId,
            skillId,
          },
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async removeUserSkillWanted(userId: string, skillId: string): Promise<boolean> {
    try {
      await prisma.userSkillWanted.delete({
        where: {
          userId_skillId: {
            userId,
            skillId,
          },
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  static async getRecommendedSkills(userId: string, limit: number = 10): Promise<Skill[]> {
    // Get skills that the user wants but doesn't offer
    const userOfferedSkills = await prisma.userSkillOffered.findMany({
      where: { userId },
      select: { skillId: true },
    });

    const offeredSkillIds = userOfferedSkills.map((us: any) => us.skillId);

    const userWantedSkills = await prisma.userSkillWanted.findMany({
      where: { userId },
      select: { skill: { select: { category: true } } },
    });

    const wantedCategories = [...new Set(userWantedSkills.map((us: any) => us.skill.category))];

    const recommendedSkills = await prisma.skill.findMany({
      where: {
        AND: [
          { id: { notIn: offeredSkillIds } },
          wantedCategories.length > 0 ? { category: { in: wantedCategories } } : {},
        ],
      },
      orderBy: { name: 'asc' },
      take: limit,
    });

    return recommendedSkills;
  }
}

export class UserSkillRepository {
  static async addOfferedSkill(
    userId: string,
    data: UserSkillOffered
  ): Promise<UserSkillOfferedRecord> {
    const userSkill = await prisma.userSkillOffered.create({
      data: {
        userId: userId,
        skillId: data.skillId,
        proficiencyLevel: data.proficiencyLevel.toUpperCase() as any,
        experienceYears: data.experienceYears || 0,
        description: data.description || null,
        isVerified: false,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as UserSkillOfferedRecord;
  }

  static async addWantedSkill(
    userId: string,
    data: UserSkillWanted
  ): Promise<UserSkillWantedRecord> {
    const userSkill = await prisma.userSkillWanted.create({
      data: {
        userId: userId,
        skillId: data.skillId,
        desiredLevel: data.desiredLevel.toUpperCase() as any,
        priority: data.priority || 1,
        description: data.description || null,
      },
      include: {
        skill: true,
      },
    });

    return userSkill as UserSkillWantedRecord;
  }

  static async getUserOfferedSkills(userId: string): Promise<UserSkillOfferedRecord[]> {
    const skills = await prisma.userSkillOffered.findMany({
      where: { userId },
      include: {
        skill: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    return skills as UserSkillOfferedRecord[];
  }

  static async getUserWantedSkills(userId: string): Promise<UserSkillWantedRecord[]> {
    const skills = await prisma.userSkillWanted.findMany({
      where: { userId },
      include: {
        skill: true,
      },
      orderBy: { priority: 'asc' },
    });

    return skills as UserSkillWantedRecord[];
  }

  static async removeOfferedSkill(userId: string, skillId: string): Promise<boolean> {
    const result = await prisma.userSkillOffered.deleteMany({
      where: {
        userId,
        skillId,
      },
    });

    return result.count > 0;
  }

  static async removeWantedSkill(userId: string, skillId: string): Promise<boolean> {
    const result = await prisma.userSkillWanted.deleteMany({
      where: {
        userId,
        skillId,
      },
    });

    return result.count > 0;
  }

  static async updateOfferedSkill(
    userId: string,
    skillId: string,
    data: Partial<UserSkillOffered>
  ): Promise<UserSkillOfferedRecord | null> {
    try {
      const userSkill = await prisma.userSkillOffered.update({
        where: {
          userId_skillId: {
            userId,
            skillId,
          },
        },
        data: {
          proficiencyLevel: data.proficiencyLevel
            ? (data.proficiencyLevel.toUpperCase() as any)
            : undefined,
          experienceYears: data.experienceYears,
          description: data.description,
        },
        include: {
          skill: true,
        },
      });

      return userSkill as UserSkillOfferedRecord;
    } catch (error) {
      return null;
    }
  }

  static async updateWantedSkill(
    userId: string,
    skillId: string,
    data: Partial<UserSkillWanted>
  ): Promise<UserSkillWantedRecord | null> {
    try {
      const userSkill = await prisma.userSkillWanted.update({
        where: {
          userId_skillId: {
            userId,
            skillId,
          },
        },
        data: {
          desiredLevel: data.desiredLevel ? (data.desiredLevel.toUpperCase() as any) : undefined,
          priority: data.priority,
          description: data.description,
        },
        include: {
          skill: true,
        },
      });

      return userSkill as UserSkillWantedRecord;
    } catch (error) {
      return null;
    }
  }
}
