import { z } from 'zod';

// User schemas
export const createUserSchema = z.object({
  email: z.string().email('Invalid email format'),
  username: z
    .string()
    .min(3, 'Username must be at least 3 characters')
    .max(50, 'Username must be less than 50 characters'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  firstName: z.string().min(1, 'First name is required').max(100),
  lastName: z.string().min(1, 'Last name is required').max(100),
  bio: z.string().max(1000).optional(),
  location: z.string().max(255).optional(),
  phone: z.string().max(20).optional(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});

export const updateUserSchema = z.object({
  firstName: z.string().min(1).max(100).optional(),
  lastName: z.string().min(1).max(100).optional(),
  bio: z.string().max(1000).optional(),
  location: z.string().max(255).optional(),
  phone: z.string().max(20).optional(),
  isPublic: z.boolean().optional(),
});

// Skill schemas
export const createSkillSchema = z.object({
  name: z.string().min(1, 'Skill name is required').max(100),
  category: z.string().min(1, 'Category is required').max(100),
  description: z.string().max(500).optional(),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
});

export const userSkillOfferedSchema = z.object({
  skillId: z.string().uuid('Invalid skill ID'),
  proficiencyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  experienceYears: z.number().min(0).max(50).optional(),
  description: z.string().max(500).optional(),
});

export const userSkillWantedSchema = z.object({
  skillId: z.string().uuid('Invalid skill ID'),
  desiredLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  priority: z.number().min(1).max(5).optional(),
  description: z.string().max(500).optional(),
});

// Swap request schemas
export const createSwapRequestSchema = z.object({
  providerId: z.string().uuid('Invalid provider ID'),
  offeredSkillId: z.string().uuid('Invalid offered skill ID'),
  requestedSkillId: z.string().uuid('Invalid requested skill ID'),
  message: z.string().max(1000).optional(),
  proposedSchedule: z
    .object({
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      timeSlots: z
        .array(
          z.object({
            day: z.string(),
            time: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});

export const updateSwapRequestSchema = z.object({
  status: z.enum(['pending', 'accepted', 'declined', 'completed', 'cancelled']).optional(),
  message: z.string().max(1000).optional(),
  proposedSchedule: z
    .object({
      startDate: z.string().datetime().optional(),
      endDate: z.string().datetime().optional(),
      timeSlots: z
        .array(
          z.object({
            day: z.string(),
            time: z.string(),
          })
        )
        .optional(),
    })
    .optional(),
});

// Message schemas
export const createMessageSchema = z.object({
  recipientId: z.string().uuid('Invalid recipient ID'),
  content: z.string().min(1, 'Message content is required').max(1000),
  messageType: z.enum(['text', 'image', 'file', 'system']).default('text'),
});

// Rating schemas
export const createRatingSchema = z.object({
  swapRequestId: z.string().uuid('Invalid swap request ID'),
  ratedUserId: z.string().uuid('Invalid rated user ID'),
  rating: z.number().min(1).max(5),
  feedback: z.string().max(1000).optional(),
  skillQualityRating: z.number().min(1).max(5).optional(),
  communicationRating: z.number().min(1).max(5).optional(),
  reliabilityRating: z.number().min(1).max(5).optional(),
});

// Notification schemas
export const createNotificationSchema = z.object({
  userId: z.string().uuid('Invalid user ID'),
  type: z.enum(['swap_request', 'message', 'rating', 'system', 'reminder']),
  title: z.string().min(1).max(255),
  content: z.string().max(1000).optional(),
  data: z.record(z.any()).optional(),
});

// Assessment schemas
export const createAssessmentSchema = z.object({
  skillId: z.string().uuid('Invalid skill ID'),
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  questions: z.array(
    z.object({
      id: z.string(),
      question: z.string(),
      type: z.enum(['multiple-choice', 'code', 'practical']),
      options: z.array(z.string()).optional(),
      correctAnswer: z.union([z.string(), z.number()]).optional(),
      points: z.number().min(1),
    })
  ),
  passingScore: z.number().min(0).max(100),
  durationMinutes: z.number().min(1),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
});

export const submitAssessmentSchema = z.object({
  assessmentId: z.string().uuid('Invalid assessment ID'),
  answers: z.record(z.any()),
  timeTakenMinutes: z.number().min(0),
});

// Roadmap schemas
export const createRoadmapSchema = z.object({
  title: z.string().min(1).max(255),
  description: z.string().max(1000).optional(),
  category: z.string().min(1).max(100),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']),
  estimatedDurationHours: z.number().min(1).optional(),
  prerequisites: z.array(z.string()).optional(),
  skills: z.array(z.string()),
  milestones: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      skills: z.array(z.string()),
      estimatedHours: z.number().optional(),
    })
  ),
  isPublic: z.boolean().default(true),
});

// Query parameter schemas
export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export const skillSearchSchema = z.object({
  query: z.string().optional(),
  category: z.string().optional(),
  difficultyLevel: z.enum(['beginner', 'intermediate', 'advanced', 'expert']).optional(),
  ...paginationSchema.shape,
});

export const userSearchSchema = z.object({
  query: z.string().optional(),
  location: z.string().optional(),
  skillOffered: z.string().optional(),
  skillWanted: z.string().optional(),
  isOnline: z.coerce.boolean().optional(),
  ...paginationSchema.shape,
});

// Type exports
export type CreateUser = z.infer<typeof createUserSchema>;
export type LoginUser = z.infer<typeof loginSchema>;
export type UpdateUser = z.infer<typeof updateUserSchema>;
export type CreateSkill = z.infer<typeof createSkillSchema>;
export type UserSkillOffered = z.infer<typeof userSkillOfferedSchema>;
export type UserSkillWanted = z.infer<typeof userSkillWantedSchema>;
export type CreateSwapRequest = z.infer<typeof createSwapRequestSchema>;
export type UpdateSwapRequest = z.infer<typeof updateSwapRequestSchema>;
export type CreateMessage = z.infer<typeof createMessageSchema>;
export type CreateRating = z.infer<typeof createRatingSchema>;
export type CreateNotification = z.infer<typeof createNotificationSchema>;
export type CreateAssessment = z.infer<typeof createAssessmentSchema>;
export type SubmitAssessment = z.infer<typeof submitAssessmentSchema>;
export type CreateRoadmap = z.infer<typeof createRoadmapSchema>;
export type PaginationQuery = z.infer<typeof paginationSchema>;
export type SkillSearchQuery = z.infer<typeof skillSearchSchema>;
export type UserSearchQuery = z.infer<typeof userSearchSchema>;
