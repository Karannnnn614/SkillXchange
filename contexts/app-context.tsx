'use client';

import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { mockUsers, mockNotifications, mockConversations, mockUserProgress } from '@/lib/mock-data';
import type {
  Screen,
  UserProfile,
  Notification,
  Conversation,
  SkillAssessment,
  UserAssessmentResult,
  SkillRoadmap,
  UserRoadmapProgress,
} from '@/types';

interface AppContextType {
  // Screen management
  currentScreen: Screen;
  setCurrentScreen: (screen: Screen) => void;

  // User management
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  currentUser: UserProfile;
  setCurrentUser: (user: UserProfile) => void;
  selectedUser: UserProfile | null;
  setSelectedUser: (user: UserProfile | null) => void;

  // Users data
  users: UserProfile[];
  setUsers: (users: UserProfile[] | ((prev: UserProfile[]) => UserProfile[])) => void;

  // Search and filters
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  availabilityFilter: string;
  setAvailabilityFilter: (filter: string) => void;
  skillFilter: string;
  setSkillFilter: (filter: string) => void;
  roadmapFilter: string;
  setRoadmapFilter: (filter: string) => void;

  // Mobile menu
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;

  // Notifications
  notifications: Notification[];
  setNotifications: (
    notifications: Notification[] | ((prev: Notification[]) => Notification[])
  ) => void;
  showNotifications: boolean;
  setShowNotifications: (show: boolean) => void;
  unreadNotifications: number;

  // Messages
  conversations: Conversation[];
  setConversations: (conversations: Conversation[]) => void;
  selectedConversation: string | null;
  setSelectedConversation: (id: string | null) => void;
  messageInput: string;
  setMessageInput: (message: string) => void;

  // Assessments
  currentAssessment: SkillAssessment | null;
  setCurrentAssessment: (assessment: SkillAssessment | null) => void;
  assessmentAnswers: Record<string, number>;
  setAssessmentAnswers: (
    answers: Record<string, number> | ((prev: Record<string, number>) => Record<string, number>)
  ) => void;
  assessmentResults: UserAssessmentResult[];
  setAssessmentResults: (
    results: UserAssessmentResult[] | ((prev: UserAssessmentResult[]) => UserAssessmentResult[])
  ) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  assessmentTimeLeft: number;
  setAssessmentTimeLeft: (time: number) => void;
  showAssessmentResults: boolean;
  setShowAssessmentResults: (show: boolean) => void;

  // Roadmaps
  selectedRoadmap: SkillRoadmap | null;
  setSelectedRoadmap: (roadmap: SkillRoadmap | null) => void;
  userRoadmapProgress: UserRoadmapProgress[];
  setUserRoadmapProgress: (
    progress: UserRoadmapProgress[] | ((prev: UserRoadmapProgress[]) => UserRoadmapProgress[])
  ) => void;

  // Data
  filteredUsers: UserProfile[];
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  // Screen management
  const [currentScreen, setCurrentScreen] = useState<Screen>('landing');

  // User management
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProfile | null>(null);
  const [users, setUsers] = useState<UserProfile[]>(mockUsers);

  // Wrapper for setIsLoggedIn with logging
  const setIsLoggedInWithLogging = (value: boolean) => {
    console.log('Setting isLoggedIn:', value);
    setIsLoggedIn(value);
  };

  // Search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [skillFilter, setSkillFilter] = useState('all');
  const [roadmapFilter, setRoadmapFilter] = useState('all');

  // Mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Notifications
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [showNotifications, setShowNotifications] = useState(false);

  // Messages
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');

  // Assessments
  const [currentAssessment, setCurrentAssessment] = useState<SkillAssessment | null>(null);
  const [assessmentAnswers, setAssessmentAnswers] = useState<Record<string, number>>({});
  const [assessmentResults, setAssessmentResults] = useState<UserAssessmentResult[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [assessmentTimeLeft, setAssessmentTimeLeft] = useState(0);
  const [showAssessmentResults, setShowAssessmentResults] = useState(false);

  // Roadmaps
  const [selectedRoadmap, setSelectedRoadmap] = useState<SkillRoadmap | null>(null);
  const [userRoadmapProgress, setUserRoadmapProgress] =
    useState<UserRoadmapProgress[]>(mockUserProgress);

  // Mock state management
  const initialCurrentUser: UserProfile = {
    id: 'current',
    name: 'Your Name',
    email: 'you@example.com',
    role: 'user',
    location: 'Your Location',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Graphic Design', 'Video Editing'],
    skillsWanted: ['Python', 'JavaScript'],
    rating: 4.5,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Creative professional looking to expand into tech',
    completedSwaps: 12,
    joinedDate: '2023-06-01',
    badges: ['New Member'],
    isVerified: false,
    level: 'beginner',
  };

  const [currentUser, setCurrentUser] = useState<UserProfile>(initialCurrentUser);

  // Wrapper for setCurrentUser with logging
  const setCurrentUserWithLogging = (user: UserProfile) => {
    console.log('Setting current user:', user);
    setCurrentUser(user);
  };

  // Advanced matching algorithm
  const calculateMatchScore = (user: UserProfile): number => {
    let score = 0;

    // Ensure arrays exist with defaults
    const userSkillsOffered = user.skillsOffered || [];
    const userSkillsWanted = user.skillsWanted || [];
    const currentUserSkillsOffered = currentUser.skillsOffered || [];
    const currentUserSkillsWanted = currentUser.skillsWanted || [];

    const skillMatch =
      userSkillsOffered.filter((skill) => currentUserSkillsWanted.includes(skill)).length +
      currentUserSkillsOffered.filter((skill) => userSkillsWanted.includes(skill)).length;

    const totalSkills = userSkillsOffered.length + userSkillsWanted.length;
    if (totalSkills > 0) {
      score += (skillMatch / totalSkills) * 40;
    }

    if (
      user.availability === currentUser.availability ||
      user.availability === 'flexible' ||
      currentUser.availability === 'flexible'
    ) {
      score += 20;
    }

    score += ((user.rating || 0) / 5) * 20;
    score += Math.min(((user.completedSwaps || 0) / 50) * 20, 20);

    return Math.round(score);
  };

  const filteredUsers = mockUsers
    .map((user) => ({ ...user, matchScore: calculateMatchScore(user) }))
    .filter((user) => {
      const matchesSearch =
        (user.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.skillsOffered || []).some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        (user.skillsWanted || []).some((skill) =>
          skill.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesAvailability =
        availabilityFilter === 'all' || user.availability === availabilityFilter;
      const matchesSkill =
        skillFilter === 'all' ||
        (user.skillsOffered || []).some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        ) ||
        (user.skillsWanted || []).some((skill) =>
          skill.toLowerCase().includes(skillFilter.toLowerCase())
        );
      return matchesSearch && matchesAvailability && matchesSkill;
    })
    .sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

  const unreadNotifications = notifications.filter((n) => !n.isRead).length;

  // Auto-hide notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = () => setShowNotifications(false);
    if (showNotifications) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showNotifications]);

  // Simulate real-time notifications
  useEffect(() => {
    if (isLoggedIn) {
      const interval = setInterval(() => {
        if (Math.random() > 0.95) {
          const newNotification: Notification = {
            id: Date.now().toString(),
            type: 'match',
            title: 'New Match Found!',
            description: 'Someone with complementary skills just joined',
            timestamp: 'just now',
            isRead: false,
          };
          setNotifications((prev) => [newNotification, ...prev]);
        }
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [isLoggedIn]);

  const value: AppContextType = {
    // Screen management
    currentScreen,
    setCurrentScreen,

    // User management
    isLoggedIn,
    setIsLoggedIn: setIsLoggedInWithLogging,
    currentUser,
    setCurrentUser: setCurrentUserWithLogging,
    selectedUser,
    setSelectedUser,
    users,
    setUsers,

    // Search and filters
    searchQuery,
    setSearchQuery,
    availabilityFilter,
    setAvailabilityFilter,
    skillFilter,
    setSkillFilter,
    roadmapFilter,
    setRoadmapFilter,

    // Mobile menu
    mobileMenuOpen,
    setMobileMenuOpen,

    // Notifications
    notifications,
    setNotifications,
    showNotifications,
    setShowNotifications,
    unreadNotifications,

    // Messages
    conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation,
    messageInput,
    setMessageInput,

    // Assessments
    currentAssessment,
    setCurrentAssessment,
    assessmentAnswers,
    setAssessmentAnswers,
    assessmentResults,
    setAssessmentResults,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    assessmentTimeLeft,
    setAssessmentTimeLeft,
    showAssessmentResults,
    setShowAssessmentResults,

    // Roadmaps
    selectedRoadmap,
    setSelectedRoadmap,
    userRoadmapProgress,
    setUserRoadmapProgress,

    // Data
    filteredUsers,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
