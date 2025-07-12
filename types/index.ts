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
  | 'roadmaps'
  | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'moderator';
  location: string;
  avatar: string;
  skillsOffered: string[];
  skillsWanted: string[];
  rating: number;
  availability: string;
  isPublic: boolean;
  isOnline: boolean;
  lastSeen: string;
  bio: string;
  completedSwaps: number;
  joinedDate: string;
  badges: string[];
  matchScore?: number;
  isVerified: boolean;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
}

export interface Notification {
  id: string;
  type: 'request' | 'message' | 'match' | 'system';
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
  userId?: string;
}

export interface Conversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export interface SkillAssessment {
  id: string;
  skillName: string;
  questions: AssessmentQuestion[];
  passingScore: number;
  duration: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
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
  skillName: string;
  score: number;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  completedAt: string;
  certificateId?: string;
}

export interface SkillRoadmap {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  prerequisites: string[];
  skills: string[];
  milestones: RoadmapMilestone[];
  learners: number;
  rating: number;
  tags: string[];
  icon: string;
}

export interface RoadmapMilestone {
  id: string;
  title: string;
  description: string;
  skills: string[];
  resources: RoadmapResource[];
  assessments: string[];
  estimatedHours: number;
  isCompleted: boolean;
  completedAt?: string;
}

export interface RoadmapResource {
  id: string;
  title: string;
  type: 'article' | 'video' | 'course' | 'practice' | 'mentor';
  url?: string;
  duration?: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isCompleted: boolean;
}

export interface UserRoadmapProgress {
  roadmapId: string;
  startedAt: string;
  currentMilestone: number;
  completedMilestones: string[];
  totalProgress: number;
  estimatedCompletion: string;
}
