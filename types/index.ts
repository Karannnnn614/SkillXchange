export type Screen =
  | 'landing'
  | 'home'
  | 'login'
  | 'profile'
  | 'user-profile'
  | 'swap-request'
  | 'requests'
  | 'messages'
  | 'notifications'
  | 'skills-assessment'
  | 'roadmaps';

// Database-aligned interfaces
export interface UserProfile {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  bio?: string;
  location?: string;
  avatarUrl?: string;
  phone?: string;
  isVerified: boolean;
  isActive: boolean;
  isPublic: boolean;
  lastSeen: Date | string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Computed fields for display
  skillsOfferedCount?: number;
  skillsWantedCount?: number;
  completedSwapsCount?: number;
  averageRating?: number;
  totalRatings?: number;
  matchScore?: number;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  description?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  createdAt: Date | string;
  // Stats
  usersOffering?: number;
  usersWanting?: number;
  totalSwaps?: number;
}

export interface UserSkillOffered {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
  proficiencyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  experienceYears: number;
  isVerified: boolean;
  description?: string;
  createdAt: Date | string;
}

export interface UserSkillWanted {
  id: string;
  userId: string;
  skillId: string;
  skill: Skill;
  desiredLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  priority: number;
  description?: string;
  createdAt: Date | string;
}

export interface SwapRequest {
  id: string;
  requesterId: string;
  providerId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
  message?: string;
  proposedSchedule?: {
    startDate?: string;
    endDate?: string;
    timeSlots?: Array<{
      day: string;
      time: string;
    }>;
  };
  createdAt: Date | string;
  updatedAt: Date | string;
  expiresAt?: Date | string;
  // Populated fields
  requester?: UserProfile;
  provider?: UserProfile;
  offeredSkill?: Skill;
  requestedSkill?: Skill;
}

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  content: string;
  messageType: 'text' | 'image' | 'file' | 'system';
  isRead: boolean;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Populated fields
  sender?: UserProfile;
  recipient?: UserProfile;
}

export interface Conversation {
  id: string;
  participant1Id: string;
  participant2Id: string;
  lastMessageId?: string;
  lastActivity: Date | string;
  createdAt: Date | string;
  // Populated fields
  participant1?: UserProfile;
  participant2?: UserProfile;
  lastMessage?: Message;
  unreadCount?: number;
  isOnline?: boolean;
}

export interface Rating {
  id: string;
  swapRequestId: string;
  raterId: string;
  ratedUserId: string;
  rating: number;
  feedback?: string;
  skillQualityRating?: number;
  communicationRating?: number;
  reliabilityRating?: number;
  createdAt: Date | string;
  // Populated fields
  rater?: UserProfile;
  ratedUser?: UserProfile;
  swapRequest?: SwapRequest;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'swap_request' | 'message' | 'rating' | 'system' | 'reminder';
  title: string;
  content?: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date | string;
  // Populated fields
  user?: UserProfile;
}

export interface SkillAssessment {
  id: string;
  skillId: string;
  title: string;
  description?: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  durationMinutes: number;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  isActive: boolean;
  createdAt: Date | string;
  // Populated fields
  skill?: Skill;
}

export interface AssessmentQuestion {
  id: string;
  question: string;
  type: 'multiple-choice' | 'code' | 'practical';
  options?: string[];
  correctAnswer?: string | number;
  points: number;
}

export interface UserAssessmentResult {
  id: string;
  userId: string;
  assessmentId: string;
  score: number;
  totalPossible: number;
  passed: boolean;
  answers: Record<string, any>;
  timeTakenMinutes?: number;
  createdAt: Date | string;
  // Populated fields
  user?: UserProfile;
  assessment?: SkillAssessment;
  skillName?: string;
  level?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  certificateId?: string;
}

export interface SkillRoadmap {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDurationHours?: number;
  prerequisites?: string[];
  skills: string[];
  milestones: RoadmapMilestone[];
  isPublic: boolean;
  createdBy?: string;
  createdAt: Date | string;
  updatedAt: Date | string;
  // Populated fields
  creator?: UserProfile;
  learners?: number;
  rating?: number;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description?: string;
  skills: string[];
  estimatedHours?: number;
  order?: number;
}

export interface UserRoadmapProgress {
  id: string;
  userId: string;
  roadmapId: string;
  currentMilestone: number;
  completedMilestones: string[];
  progressPercentage: number;
  startedAt: Date | string;
  lastUpdated: Date | string;
  // Populated fields
  user?: UserProfile;
  roadmap?: SkillRoadmap;
}

// API Response types
export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// Search and filter types
export interface SkillSearchParams {
  query?: string;
  category?: string;
  difficultyLevel?: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  page?: number;
  limit?: number;
}

export interface UserSearchParams {
  query?: string;
  location?: string;
  skillOffered?: string;
  skillWanted?: string;
  isOnline?: boolean;
  page?: number;
  limit?: number;
}

// Socket/Real-time types
export interface SocketMessage {
  id: string;
  type: 'swap_request' | 'message' | 'notification' | 'user_status';
  data: any;
  timestamp: string;
}

// Legacy types for backward compatibility
export interface LegacyUserProfile extends Omit<UserProfile, 'firstName' | 'lastName'> {
  name: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  availability: string;
  isOnline: boolean;
  completedSwaps: number;
  joinedDate: string;
  badges: string[];
}
