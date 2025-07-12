"use client"
import { LandingPage } from "@/components/pages/landing-page"
import { HomePage } from "@/components/pages/home-page"
import { LoginPage } from "@/components/pages/login-page"
import { ProfilePage } from "@/components/pages/profile-page"
import { SwapRequestPage } from "@/components/pages/swap-request-page"
import { RequestsPage } from "@/components/pages/requests-page"
import { MessagesPage } from "@/components/pages/messages-page"
import { SkillsAssessmentPage } from "@/components/pages/skills-assessment-page"
import { RoadmapsPage } from "@/components/pages/roadmaps-page"
import { Header } from "@/components/layout/header"
import { AppProvider } from "@/contexts/app-context"
import { useAppContext } from "@/contexts/app-context"

type Screen =
  | "landing"
  | "home"
  | "login"
  | "profile"
  | "user-profile"
  | "swap-request"
  | "requests"
  | "messages"
  | "notifications"
  | "skills-assessment"
  | "roadmaps"

interface UserProfile {
  id: string
  name: string
  location: string
  avatar: string
  skillsOffered: string[]
  skillsWanted: string[]
  rating: number
  availability: string
  isPublic: boolean
  isOnline: boolean
  lastSeen: string
  bio: string
  completedSwaps: number
  joinedDate: string
  badges: string[]
  matchScore?: number
}

interface Message {
  id: string
  senderId: string
  receiverId: string
  content: string
  timestamp: string
  isRead: boolean
}

interface Notification {
  id: string
  type: "request" | "message" | "match" | "system"
  title: string
  description: string
  timestamp: string
  isRead: boolean
  userId?: string
}

interface Conversation {
  id: string
  userId: string
  userName: string
  userAvatar: string
  lastMessage: string
  lastMessageTime: string
  unreadCount: number
  isOnline: boolean
}

interface SkillAssessment {
  id: string
  skillName: string
  questions: AssessmentQuestion[]
  passingScore: number
  duration: number // in minutes
  difficulty: "beginner" | "intermediate" | "advanced"
}

interface AssessmentQuestion {
  id: string
  question: string
  type: "multiple-choice" | "code" | "practical"
  options?: string[]
  correctAnswer?: string | number
  points: number
}

interface UserAssessmentResult {
  skillName: string
  score: number
  level: "beginner" | "intermediate" | "advanced" | "expert"
  completedAt: string
  certificateId?: string
}

interface SkillRoadmap {
  id: string
  title: string
  description: string
  category: string
  difficulty: "beginner" | "intermediate" | "advanced"
  estimatedTime: string
  prerequisites: string[]
  skills: string[]
  milestones: RoadmapMilestone[]
  learners: number
  rating: number
  tags: string[]
  icon: string
}

interface RoadmapMilestone {
  id: string
  title: string
  description: string
  skills: string[]
  resources: RoadmapResource[]
  assessments: string[]
  estimatedHours: number
  isCompleted: boolean
  completedAt?: string
}

interface RoadmapResource {
  id: string
  title: string
  type: "article" | "video" | "course" | "practice" | "mentor"
  url?: string
  duration?: string
  difficulty: "beginner" | "intermediate" | "advanced"
  isCompleted: boolean
}

interface UserRoadmapProgress {
  roadmapId: string
  startedAt: string
  currentMilestone: number
  completedMilestones: string[]
  totalProgress: number
  estimatedCompletion: string
}

const mockUsers: UserProfile[] = [
  {
    id: "1",
    name: "Marc Demo",
    location: "San Francisco, CA",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["JavaScript", "Python", "PhotoShop"],
    skillsWanted: ["Graphic Design", "UI/UX Design"],
    rating: 4.8,
    availability: "weekends",
    isPublic: true,
    isOnline: true,
    lastSeen: "now",
    bio: "Full-stack developer with 5+ years experience. Love teaching and learning new technologies!",
    completedSwaps: 23,
    joinedDate: "2023-01-15",
    badges: ["Top Contributor", "Verified"],
    matchScore: 95,
  },
  {
    id: "2",
    name: "Sarah Chen",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Graphic Design", "UI/UX Design", "Figma"],
    skillsWanted: ["React", "TypeScript"],
    rating: 4.9,
    availability: "evenings",
    isPublic: true,
    isOnline: false,
    lastSeen: "2 hours ago",
    bio: "Creative designer passionate about user experience and visual storytelling.",
    completedSwaps: 31,
    joinedDate: "2022-11-20",
    badges: ["Design Expert", "Mentor"],
    matchScore: 92,
  },
  {
    id: "3",
    name: "Alex Rodriguez",
    location: "Austin, TX",
    avatar: "/placeholder.svg?height=60&width=60",
    skillsOffered: ["Data Science", "Machine Learning", "Python"],
    skillsWanted: ["Web Development", "JavaScript"],
    rating: 4.7,
    availability: "flexible",
    isPublic: true,
    isOnline: true,
    lastSeen: "now",
    bio: "Data scientist exploring the intersection of AI and web technologies.",
    completedSwaps: 18,
    joinedDate: "2023-03-10",
    badges: ["Rising Star"],
    matchScore: 88,
  },
]

const mockAssessments: SkillAssessment[] = [
  {
    id: "js-assessment",
    skillName: "JavaScript",
    questions: [
      {
        id: "1",
        question: "What is the output of: console.log(typeof null)?",
        type: "multiple-choice",
        options: ["null", "undefined", "object", "boolean"],
        correctAnswer: 2,
        points: 10,
      },
      {
        id: "2",
        question: "Which method is used to add an element to the end of an array?",
        type: "multiple-choice",
        options: ["push()", "pop()", "shift()", "unshift()"],
        correctAnswer: 0,
        points: 10,
      },
      {
        id: "3",
        question: "What does 'this' keyword refer to in JavaScript?",
        type: "multiple-choice",
        options: ["The current function", "The global object", "The calling object", "It depends on context"],
        correctAnswer: 3,
        points: 15,
      },
    ],
    passingScore: 70,
    duration: 30,
    difficulty: "intermediate",
  },
  {
    id: "python-assessment",
    skillName: "Python",
    questions: [
      {
        id: "1",
        question: "Which of the following is NOT a Python data type?",
        type: "multiple-choice",
        options: ["list", "tuple", "array", "dictionary"],
        correctAnswer: 2,
        points: 10,
      },
      {
        id: "2",
        question: "What is the output of: print(3 ** 2)?",
        type: "multiple-choice",
        options: ["6", "9", "32", "Error"],
        correctAnswer: 1,
        points: 10,
      },
    ],
    passingScore: 70,
    duration: 25,
    difficulty: "beginner",
  },
]

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "request",
    title: "New Swap Request",
    description: "Sarah Chen wants to exchange Graphic Design for your JavaScript skills",
    timestamp: "2 minutes ago",
    isRead: false,
    userId: "2",
  },
  {
    id: "2",
    type: "match",
    title: "Perfect Match Found!",
    description: "Alex Rodriguez has skills you want and wants skills you have",
    timestamp: "1 hour ago",
    isRead: false,
    userId: "3",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    description: "Marc Demo sent you a message",
    timestamp: "3 hours ago",
    isRead: true,
    userId: "1",
  },
]

const mockConversations: Conversation[] = [
  {
    id: "1",
    userId: "1",
    userName: "Marc Demo",
    userAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great! Let's schedule our first session for this weekend.",
    lastMessageTime: "2 min ago",
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: "2",
    userId: "2",
    userName: "Sarah Chen",
    userAvatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "I'd love to help you with UI design principles!",
    lastMessageTime: "1 hour ago",
    unreadCount: 0,
    isOnline: false,
  },
]

const mockRoadmaps: SkillRoadmap[] = [
  {
    id: "fullstack-web-dev",
    title: "Full-Stack Web Development",
    description: "Master both frontend and backend development to become a complete web developer",
    category: "Programming",
    difficulty: "intermediate",
    estimatedTime: "6-8 months",
    prerequisites: ["Basic HTML", "Basic CSS"],
    skills: ["JavaScript", "React", "Node.js", "Database Design", "API Development"],
    milestones: [
      {
        id: "frontend-basics",
        title: "Frontend Fundamentals",
        description: "Master HTML, CSS, and JavaScript basics",
        skills: ["HTML5", "CSS3", "JavaScript ES6+"],
        resources: [
          {
            id: "html-course",
            title: "HTML5 Complete Guide",
            type: "course",
            duration: "8 hours",
            difficulty: "beginner",
            isCompleted: false,
          },
          {
            id: "css-flexbox",
            title: "CSS Flexbox & Grid",
            type: "practice",
            duration: "4 hours",
            difficulty: "beginner",
            isCompleted: false,
          },
        ],
        assessments: ["html-assessment", "css-assessment"],
        estimatedHours: 40,
        isCompleted: false,
      },
      {
        id: "react-development",
        title: "React Development",
        description: "Build dynamic user interfaces with React",
        skills: ["React", "JSX", "State Management", "Hooks"],
        resources: [
          {
            id: "react-basics",
            title: "React Fundamentals",
            type: "course",
            duration: "12 hours",
            difficulty: "intermediate",
            isCompleted: false,
          },
        ],
        assessments: ["react-assessment"],
        estimatedHours: 60,
        isCompleted: false,
      },
    ],
    learners: 1247,
    rating: 4.8,
    tags: ["Web Development", "JavaScript", "React", "Node.js"],
    icon: "💻",
  },
  {
    id: "ui-ux-design",
    title: "UI/UX Design Mastery",
    description: "Learn to create beautiful and user-friendly digital experiences",
    category: "Design",
    difficulty: "beginner",
    estimatedTime: "4-6 months",
    prerequisites: [],
    skills: ["Figma", "User Research", "Prototyping", "Visual Design"],
    milestones: [
      {
        id: "design-principles",
        title: "Design Fundamentals",
        description: "Learn core design principles and color theory",
        skills: ["Color Theory", "Typography", "Layout Design"],
        resources: [
          {
            id: "design-basics",
            title: "Design Principles Course",
            type: "course",
            duration: "6 hours",
            difficulty: "beginner",
            isCompleted: false,
          },
        ],
        assessments: ["design-assessment"],
        estimatedHours: 30,
        isCompleted: false,
      },
    ],
    learners: 892,
    rating: 4.9,
    tags: ["Design", "UI", "UX", "Figma"],
    icon: "🎨",
  },
  {
    id: "data-science-python",
    title: "Data Science with Python",
    description: "Analyze data and build machine learning models using Python",
    category: "Data Science",
    difficulty: "intermediate",
    estimatedTime: "8-10 months",
    prerequisites: ["Basic Python", "Statistics"],
    skills: ["Python", "Pandas", "NumPy", "Machine Learning", "Data Visualization"],
    milestones: [
      {
        id: "python-data-analysis",
        title: "Python for Data Analysis",
        description: "Master pandas, numpy, and data manipulation",
        skills: ["Pandas", "NumPy", "Data Cleaning"],
        resources: [
          {
            id: "pandas-course",
            title: "Pandas Complete Guide",
            type: "course",
            duration: "10 hours",
            difficulty: "intermediate",
            isCompleted: false,
          },
        ],
        assessments: ["python-data-assessment"],
        estimatedHours: 50,
        isCompleted: false,
      },
    ],
    learners: 634,
    rating: 4.7,
    tags: ["Python", "Data Science", "Machine Learning"],
    icon: "📊",
  },
]

const mockUserProgress: UserRoadmapProgress[] = [
  {
    roadmapId: "fullstack-web-dev",
    startedAt: "2024-01-15",
    currentMilestone: 0,
    completedMilestones: [],
    totalProgress: 15,
    estimatedCompletion: "2024-07-15",
  },
]

function AppContent() {
  const { currentScreen, isLoggedIn } = useAppContext()

  return (
    <div className="min-h-screen bg-gray-50">
      {currentScreen !== "landing" && <Header />}

      {currentScreen === "landing" && <LandingPage />}
      {currentScreen === "home" && <HomePage />}
      {currentScreen === "login" && <LoginPage />}
      {currentScreen === "profile" && <ProfilePage />}
      {currentScreen === "user-profile" && <ProfilePage />}
      {currentScreen === "swap-request" && <SwapRequestPage />}
      {currentScreen === "requests" && <RequestsPage />}
      {currentScreen === "messages" && <MessagesPage />}
      {currentScreen === "skills-assessment" && <SkillsAssessmentPage />}
      {currentScreen === "roadmaps" && <RoadmapsPage />}
    </div>
  )
}

export default function SkillXchangePlatform() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  )
}
