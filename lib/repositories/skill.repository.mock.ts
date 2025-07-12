import { CreateSkill } from '../../schemas/validation';
import { mockSkills, getSkillCategories } from '../mock-data-enhanced';

export type Skill = {
  id: string;
  name: string;
  category: string;
  description?: string | null;
  difficultyLevel?: string | null;
  createdAt: Date | string;
  usersOffering?: number;
  usersWanting?: number;
  totalSwaps?: number;
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

/**
 * This is a mock implementation of the SkillRepository
 * that uses our mock data instead of Prisma.
 */
export class SkillRepository {
  static async create(skillData: CreateSkill): Promise<Skill> {
    // Mock implementation - would normally save to database
    const newSkill: Skill = {
      id: `skill-${Date.now()}`,
      name: skillData.name,
      category: skillData.category,
      description: skillData.description || null,
      difficultyLevel: (skillData.difficultyLevel as any) || null,
      createdAt: new Date().toISOString(),
    };

    // In a real app, we'd push to the array
    console.log('Mock creating skill:', newSkill);

    return newSkill;
  }

  static async getById(id: string): Promise<Skill | null> {
    const skill = mockSkills.find((skill) => skill.id === id);
    return skill || null;
  }

  static async getAll(): Promise<Skill[]> {
    return mockSkills;
  }

  static async getCategories(): Promise<string[]> {
    return getSkillCategories();
  }

  static async getPopularSkills(limit: number = 10): Promise<SkillWithStats[]> {
    // Sort by total swaps to get "popular" skills
    const sortedSkills = [...mockSkills].sort((a, b) => b.totalSwaps - a.totalSwaps);
    return sortedSkills.slice(0, limit);
  }

  static async search(query: string): Promise<Skill[]> {
    const lowercaseQuery = query.toLowerCase();
    return mockSkills.filter(
      (skill) =>
        skill.name.toLowerCase().includes(lowercaseQuery) ||
        skill.category.toLowerCase().includes(lowercaseQuery) ||
        (skill.description && skill.description.toLowerCase().includes(lowercaseQuery))
    );
  }

  static async update(id: string, skillData: Partial<CreateSkill>): Promise<Skill | null> {
    const skillIndex = mockSkills.findIndex((skill) => skill.id === id);
    if (skillIndex === -1) return null;

    // In a real app, we'd update the array
    console.log(`Mock updating skill ${id}:`, skillData);

    // Return what would be the updated skill
    return {
      ...mockSkills[skillIndex],
      ...skillData,
      id,
    };
  }

  static async delete(id: string): Promise<boolean> {
    // In a real app, we'd remove from the array
    console.log(`Mock deleting skill ${id}`);
    return true;
  }
}
