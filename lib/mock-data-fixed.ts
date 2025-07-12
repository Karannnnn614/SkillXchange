// Legacy interfaces for mock data compatibility
export interface LegacyUserProfile {
  id: string;
  name: string;
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
  matchScore: number;
}

export interface LegacyNotification {
  id: string;
  type: string;
  title: string;
  description: string;
  timestamp: string;
  isRead: boolean;
}

export interface LegacyRoadmapResource {
  id: string;
  title: string;
  type: string;
  url?: string;
  isCompleted: boolean;
}

export interface LegacyRoadmapMilestone {
  id: string;
  title: string;
  description?: string;
  skills: string[];
  estimatedHours?: number;
  order?: number;
  resources?: LegacyRoadmapResource[];
  isCompleted?: boolean;
}

export interface LegacySkillRoadmap {
  id: string;
  title: string;
  description?: string;
  category: string;
  difficultyLevel: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  estimatedDurationHours?: number;
  prerequisites?: string[];
  skills: string[];
  milestones: LegacyRoadmapMilestone[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  icon: string;
  tags: string[];
  learners: number;
  rating: number;
}

export interface LegacyUserRoadmapProgress {
  id: string;
  userId: string;
  roadmapId: string;
  currentMilestone: number;
  completedMilestones: string[];
  progressPercentage: number;
  startedAt: string;
  lastUpdated: string;
  totalProgress: number;
  estimatedCompletion: string;
}

export interface LegacySkillAssessment {
  id: string;
  skillName: string;
  questions: any[];
  passingScore: number;
  duration: number;
  difficulty: string;
}

export interface LegacyConversation {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  isOnline: boolean;
}

export const mockUsers: LegacyUserProfile[] = [
  {
    id: 'demo-user',
    name: 'Khone Dove',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['JavaScript', 'Python', 'React', 'Node.js'],
    skillsWanted: ['Graphic Design', 'UI/UX Design', 'Machine Learning'],
    rating: 4.8,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Full-stack developer with 5+ years experience. Love teaching and learning new technologies! Demo user for SkillXchange platform.',
    completedSwaps: 23,
    joinedDate: '2023-01-15',
    badges: ['Top Contributor', 'Verified', 'Demo User'],
    matchScore: 95,
  },
  {
    id: '1',
    name: 'Marc Demo',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['JavaScript', 'Python', 'PhotoShop'],
    skillsWanted: ['Graphic Design', 'UI/UX Design'],
    rating: 4.8,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Full-stack developer with 5+ years experience. Love teaching and learning new technologies!',
    completedSwaps: 23,
    joinedDate: '2023-01-15',
    badges: ['Top Contributor', 'Verified'],
    matchScore: 95,
  },
  {
    id: '2',
    name: 'Sarah Chen',
    location: 'New York, NY',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Graphic Design', 'UI/UX Design', 'Figma'],
    skillsWanted: ['React', 'TypeScript'],
    rating: 4.9,
    availability: 'evenings',
    isPublic: true,
    isOnline: false,
    lastSeen: '2 hours ago',
    bio: 'Creative designer passionate about user experience and visual storytelling.',
    completedSwaps: 31,
    joinedDate: '2022-11-20',
    badges: ['Design Expert', 'Mentor'],
    matchScore: 92,
  },
  {
    id: '3',
    name: 'Alex Rodriguez',
    location: 'Austin, TX',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Data Science', 'Machine Learning', 'Python'],
    skillsWanted: ['Web Development', 'JavaScript'],
    rating: 4.7,
    availability: 'flexible',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Data scientist exploring the intersection of AI and web technologies.',
    completedSwaps: 18,
    joinedDate: '2023-03-10',
    badges: ['Rising Star'],
    matchScore: 88,
  },
];

export const mockAssessments: LegacySkillAssessment[] = [
  {
    id: 'js-assessment',
    skillName: 'JavaScript',
    questions: [
      {
        id: '1',
        question: 'What is the output of: console.log(typeof null)?',
        type: 'multiple-choice',
        options: ['null', 'undefined', 'object', 'boolean'],
        correctAnswer: 2,
        points: 10,
      },
      {
        id: '2',
        question: 'Which method is used to add an element to the end of an array?',
        type: 'multiple-choice',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        points: 10,
      },
      {
        id: '3',
        question: "What does 'this' keyword refer to in JavaScript?",
        type: 'multiple-choice',
        options: [
          'The current function',
          'The global object',
          'The calling object',
          'It depends on context',
        ],
        correctAnswer: 3,
        points: 15,
      },
    ],
    passingScore: 70,
    duration: 30,
    difficulty: 'intermediate',
  },
  {
    id: 'python-assessment',
    skillName: 'Python',
    questions: [
      {
        id: '1',
        question: 'Which of the following is NOT a Python data type?',
        type: 'multiple-choice',
        options: ['list', 'tuple', 'array', 'dictionary'],
        correctAnswer: 2,
        points: 10,
      },
      {
        id: '2',
        question: 'What is the output of: print(3 ** 2)?',
        type: 'multiple-choice',
        options: ['6', '9', '32', 'Error'],
        correctAnswer: 1,
        points: 10,
      },
    ],
    passingScore: 70,
    duration: 25,
    difficulty: 'beginner',
  },
];

export const mockNotifications: LegacyNotification[] = [
  {
    id: '1',
    type: 'request',
    title: 'New Swap Request',
    description: 'Sarah Chen wants to exchange Graphic Design for your JavaScript skills',
    timestamp: '2 minutes ago',
    isRead: false,
  },
  {
    id: '2',
    type: 'match',
    title: 'Perfect Match Found!',
    description: 'Alex Rodriguez has skills you want and wants skills you have',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: '3',
    type: 'message',
    title: 'New Message',
    description: 'Marc Demo sent you a message',
    timestamp: '3 hours ago',
    isRead: true,
  },
];

export const mockConversations: LegacyConversation[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Marc Demo',
    userAvatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Thanks for the JavaScript tips!',
    lastMessageTime: '2 hours ago',
    unreadCount: 0,
    isOnline: true,
  },
  {
    id: '2',
    userId: '2',
    userName: 'Sarah Chen',
    userAvatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Looking forward to our design session',
    lastMessageTime: '5 hours ago',
    unreadCount: 2,
    isOnline: false,
  },
  {
    id: '3',
    userId: '3',
    userName: 'Alex Rodriguez',
    userAvatar: '/placeholder.svg?height=40&width=40',
    lastMessage: 'Can we schedule a Python workshop?',
    lastMessageTime: '1 day ago',
    unreadCount: 1,
    isOnline: true,
  },
];

export const mockRoadmaps: LegacySkillRoadmap[] = [
  {
    id: 'fullstack-web-dev',
    title: 'Full-Stack Web Development',
    description: 'Master both frontend and backend development to become a complete web developer',
    category: 'Programming',
    difficultyLevel: 'intermediate',
    estimatedDurationHours: 160,
    prerequisites: ['Basic HTML', 'Basic CSS'],
    skills: ['JavaScript', 'React', 'Node.js', 'Database Design', 'API Development'],
    icon: '💻',
    rating: 4.8,
    learners: 2534,
    tags: ['Web Development', 'React', 'Node.js', 'Full-Stack'],
    isPublic: true,
    createdAt: '2023-01-01',
    updatedAt: '2023-12-01',
    milestones: [
      {
        id: 'frontend-basics',
        title: 'Frontend Fundamentals',
        description: 'Master HTML, CSS, and JavaScript basics',
        skills: ['HTML5', 'CSS3', 'JavaScript ES6+'],
        estimatedHours: 40,
        order: 1,
        resources: [
          {
            id: 'html-course',
            title: 'HTML5 Complete Guide',
            type: 'course',
            url: '#',
            isCompleted: false,
          },
          {
            id: 'css-flexbox',
            title: 'CSS Flexbox & Grid',
            type: 'practice',
            url: '#',
            isCompleted: false,
          },
        ],
        isCompleted: false,
      },
      {
        id: 'react-development',
        title: 'React Development',
        description: 'Build dynamic user interfaces with React',
        skills: ['React', 'JSX', 'State Management', 'Hooks'],
        estimatedHours: 60,
        order: 2,
        resources: [
          {
            id: 'react-course',
            title: 'React Complete Course',
            type: 'course',
            url: '#',
            isCompleted: false,
          },
        ],
        isCompleted: false,
      },
      {
        id: 'backend-development',
        title: 'Backend Development',
        description: 'Build server-side applications with Node.js',
        skills: ['Node.js', 'Express', 'Database Design', 'API Development'],
        estimatedHours: 60,
        order: 3,
        resources: [
          {
            id: 'nodejs-course',
            title: 'Node.js & Express Course',
            type: 'course',
            url: '#',
            isCompleted: false,
          },
        ],
        isCompleted: false,
      },
    ],
  },
];

export const mockUserProgress: LegacyUserRoadmapProgress[] = [
  {
    id: 'progress-1',
    userId: 'demo-user',
    roadmapId: 'fullstack-web-dev',
    currentMilestone: 1,
    completedMilestones: ['frontend-basics'],
    progressPercentage: 35,
    startedAt: '2023-11-01',
    lastUpdated: '2023-12-15',
    totalProgress: 35,
    estimatedCompletion: '2024-03-01',
  },
];

// Demo user session
export const demoUser = mockUsers[0]; // Khone Dove
