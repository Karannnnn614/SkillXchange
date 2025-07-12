import type {
  UserProfile,
  Notification,
  Conversation,
  SkillAssessment,
  SkillRoadmap,
  UserRoadmapProgress,
} from '@/types';

// Enhanced mock users with different roles and comprehensive data
export const mockUsers: UserProfile[] = [
  // Admin Users
  {
    id: 'admin-1',
    name: 'Admin Sarah',
    email: 'admin@skillxchange.com',
    role: 'admin',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Platform Management', 'User Support', 'Content Moderation'],
    skillsWanted: [],
    rating: 5.0,
    availability: '24/7',
    isPublic: false,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Platform administrator ensuring smooth operations and user safety.',
    completedSwaps: 0,
    joinedDate: '2022-01-01',
    badges: ['Admin', 'Platform Creator'],
    isVerified: true,
    level: 'expert',
  },
  {
    id: 'admin-2',
    name: 'Tech Admin Mike',
    email: 'tech.admin@skillxchange.com',
    role: 'admin',
    location: 'Seattle, WA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['System Architecture', 'DevOps', 'Security'],
    skillsWanted: [],
    rating: 5.0,
    availability: 'business hours',
    isPublic: false,
    isOnline: true,
    lastSeen: '5 minutes ago',
    bio: 'Technical administrator maintaining platform infrastructure and security.',
    completedSwaps: 0,
    joinedDate: '2022-01-01',
    badges: ['Admin', 'Security Expert'],
    isVerified: true,
    level: 'expert',
  },

  // Moderator Users
  {
    id: 'mod-1',
    name: 'Moderator Jenny',
    email: 'jenny.mod@skillxchange.com',
    role: 'moderator',
    location: 'Austin, TX',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Community Management', 'Conflict Resolution', 'Teaching'],
    skillsWanted: ['Advanced Psychology', 'Leadership'],
    rating: 4.9,
    availability: 'weekdays',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Community moderator helping maintain a positive learning environment.',
    completedSwaps: 15,
    joinedDate: '2022-06-15',
    badges: ['Moderator', 'Community Helper', 'Verified'],
    isVerified: true,
    level: 'advanced',
  },

  // Expert Level Users
  {
    id: 'expert-1',
    name: 'Dr. Emily Watson',
    email: 'emily.watson@email.com',
    role: 'user',
    location: 'Boston, MA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Machine Learning', 'Data Science', 'Python', 'R', 'Statistics'],
    skillsWanted: ['Web Development', 'React'],
    rating: 4.9,
    availability: 'evenings',
    isPublic: true,
    isOnline: false,
    lastSeen: '1 hour ago',
    bio: 'PhD in Computer Science with 10+ years in AI/ML. Love teaching complex concepts simply.',
    completedSwaps: 47,
    joinedDate: '2022-03-10',
    badges: ['Expert', 'PhD', 'Top Contributor', 'Verified'],
    matchScore: 98,
    isVerified: true,
    level: 'expert',
  },
  {
    id: 'expert-2',
    name: 'Marcus Chen',
    email: 'marcus.chen@email.com',
    role: 'user',
    location: 'San Francisco, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['System Design', 'Kubernetes', 'AWS', 'DevOps', 'Microservices'],
    skillsWanted: ['UI/UX Design', 'Product Management'],
    rating: 4.8,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Senior Software Architect at tech startup. Passionate about scalable systems and mentoring.',
    completedSwaps: 52,
    joinedDate: '2022-02-20',
    badges: ['Expert', 'System Architect', 'Mentor', 'Verified'],
    matchScore: 95,
    isVerified: true,
    level: 'expert',
  },

  // Advanced Level Users
  {
    id: 'advanced-1',
    name: 'Sarah Rodriguez',
    email: 'sarah.rodriguez@email.com',
    role: 'user',
    location: 'New York, NY',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Graphic Design', 'UI/UX Design', 'Figma', 'Adobe Creative Suite'],
    skillsWanted: ['React', 'TypeScript', 'Frontend Development'],
    rating: 4.7,
    availability: 'evenings',
    isPublic: true,
    isOnline: false,
    lastSeen: '2 hours ago',
    bio: 'Creative designer with 6 years experience. Love creating beautiful, user-friendly interfaces.',
    completedSwaps: 31,
    joinedDate: '2022-11-20',
    badges: ['Design Expert', 'Mentor', 'Verified'],
    matchScore: 92,
    isVerified: true,
    level: 'advanced',
  },
  {
    id: 'advanced-2',
    name: 'Alex Thompson',
    email: 'alex.thompson@email.com',
    role: 'user',
    location: 'Toronto, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy', 'Social Media'],
    skillsWanted: ['Data Analytics', 'Python', 'Google Analytics'],
    rating: 4.6,
    availability: 'flexible',
    isPublic: true,
    isOnline: true,
    lastSeen: '30 minutes ago',
    bio: 'Digital marketing specialist helping businesses grow online. Always learning new tools!',
    completedSwaps: 28,
    joinedDate: '2023-01-08',
    badges: ['Marketing Pro', 'Content Creator', 'Verified'],
    matchScore: 88,
    isVerified: true,
    level: 'advanced',
  },

  // Intermediate Level Users
  {
    id: 'intermediate-1',
    name: 'Jamie Park',
    email: 'jamie.park@email.com',
    role: 'user',
    location: 'Los Angeles, CA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['JavaScript', 'Node.js', 'HTML/CSS'],
    skillsWanted: ['React', 'Database Design', 'AWS'],
    rating: 4.4,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'Full-stack developer with 2 years experience. Eager to learn and share knowledge!',
    completedSwaps: 18,
    joinedDate: '2023-03-15',
    badges: ['Rising Star', 'JavaScript Developer'],
    matchScore: 85,
    isVerified: false,
    level: 'intermediate',
  },
  {
    id: 'intermediate-2',
    name: 'Lisa Kim',
    email: 'lisa.kim@email.com',
    role: 'user',
    location: 'Chicago, IL',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Photography', 'Photo Editing', 'Lightroom', 'Portrait Photography'],
    skillsWanted: ['Video Editing', 'Motion Graphics', 'After Effects'],
    rating: 4.5,
    availability: 'evenings',
    isPublic: true,
    isOnline: false,
    lastSeen: '4 hours ago',
    bio: 'Professional photographer looking to expand into video content creation.',
    completedSwaps: 22,
    joinedDate: '2023-02-10',
    badges: ['Creative', 'Photo Expert'],
    matchScore: 80,
    isVerified: false,
    level: 'intermediate',
  },

  // Beginner Level Users
  {
    id: 'beginner-1',
    name: 'Tom Wilson',
    email: 'tom.wilson@email.com',
    role: 'user',
    location: 'Denver, CO',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Basic Excel', 'Data Entry', 'Microsoft Office'],
    skillsWanted: ['Python', 'Data Analysis', 'SQL'],
    rating: 4.2,
    availability: 'weekdays',
    isPublic: true,
    isOnline: true,
    lastSeen: '15 minutes ago',
    bio: 'Career changer looking to transition into tech. Excited to learn programming!',
    completedSwaps: 5,
    joinedDate: '2024-01-20',
    badges: ['New Member'],
    matchScore: 70,
    isVerified: false,
    level: 'beginner',
  },
  {
    id: 'beginner-2',
    name: 'Maria Gonzalez',
    email: 'maria.gonzalez@email.com',
    role: 'user',
    location: 'Miami, FL',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Spanish Language', 'Translation', 'Cultural Consulting'],
    skillsWanted: ['Web Design', 'WordPress', 'Basic Programming'],
    rating: 4.3,
    availability: 'flexible',
    isPublic: true,
    isOnline: false,
    lastSeen: '1 day ago',
    bio: 'Native Spanish speaker interested in learning web development to create bilingual websites.',
    completedSwaps: 8,
    joinedDate: '2024-02-05',
    badges: ['New Member', 'Language Expert'],
    matchScore: 75,
    isVerified: false,
    level: 'beginner',
  },
  {
    id: 'beginner-3',
    name: 'David Chang',
    email: 'david.chang@email.com',
    role: 'user',
    location: 'Portland, OR',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Cooking', 'Recipe Development', 'Food Photography'],
    skillsWanted: ['Social Media Marketing', 'Content Creation', 'Business Basics'],
    rating: 4.1,
    availability: 'weekends',
    isPublic: true,
    isOnline: true,
    lastSeen: '2 hours ago',
    bio: 'Professional chef wanting to start a food blog and learn digital marketing.',
    completedSwaps: 3,
    joinedDate: '2024-03-01',
    badges: ['New Member', 'Culinary Artist'],
    matchScore: 65,
    isVerified: false,
    level: 'beginner',
  },

  // Specialized Users
  {
    id: 'specialist-1',
    name: 'Dr. Robert Kim',
    email: 'robert.kim@email.com',
    role: 'user',
    location: 'Philadelphia, PA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Medical Knowledge', 'Healthcare Consulting', 'Research Methods'],
    skillsWanted: ['Health Tech', 'Mobile App Development', 'Data Visualization'],
    rating: 4.8,
    availability: 'weekday evenings',
    isPublic: true,
    isOnline: false,
    lastSeen: '6 hours ago',
    bio: 'Practicing physician interested in health technology and digital health solutions.',
    completedSwaps: 12,
    joinedDate: '2023-09-15',
    badges: ['Medical Professional', 'Verified', 'Subject Expert'],
    matchScore: 82,
    isVerified: true,
    level: 'expert',
  },
  {
    id: 'specialist-2',
    name: 'Prof. Angela Davis',
    email: 'angela.davis@email.com',
    role: 'user',
    location: 'Cambridge, MA',
    avatar: '/placeholder.svg?height=60&width=60',
    skillsOffered: ['Academic Writing', 'Research Methodology', 'Literature Review'],
    skillsWanted: ['Online Course Creation', 'Video Production', 'Educational Technology'],
    rating: 4.9,
    availability: 'afternoons',
    isPublic: true,
    isOnline: true,
    lastSeen: 'now',
    bio: 'University professor looking to create online courses and reach broader audiences.',
    completedSwaps: 19,
    joinedDate: '2023-08-20',
    badges: ['Professor', 'Academic', 'Verified', 'Educator'],
    matchScore: 90,
    isVerified: true,
    level: 'expert',
  },
];

// Test user credentials for demo login
export const testUserCredentials = [
  {
    email: 'admin@skillxchange.com',
    password: 'admin123',
  },
  {
    email: 'tech.admin@skillxchange.com',
    password: 'admin123',
  },
  {
    email: 'emily.watson@email.com',
    password: 'user123',
  },
  {
    email: 'marcus.chen@email.com',
    password: 'user123',
  },
  {
    email: 'robert.kim@email.com',
    password: 'user123',
  },
  {
    email: 'angela.davis@email.com',
    password: 'user123',
  },
  {
    email: 'sarah.rodriguez@email.com',
    password: 'user123',
  },
  {
    email: 'alex.thompson@email.com',
    password: 'user123',
  },
  {
    email: 'jamie.park@email.com',
    password: 'user123',
  },
  {
    email: 'lisa.kim@email.com',
    password: 'user123',
  },
  {
    email: 'tom.wilson@email.com',
    password: 'user123',
  },
  {
    email: 'maria.gonzalez@email.com',
    password: 'user123',
  },
  {
    email: 'david.chang@email.com',
    password: 'user123',
  },
  {
    email: 'jenny.mod@skillxchange.com',
    password: 'mod123',
  },
];

// Function to get user by email (for testing)
export const getUserByEmail = (email: string): UserProfile | undefined => {
  // Return the user with matching email
  return mockUsers.find((user) => user.email === email);
};

// Function to get users by role
export const getUsersByRole = (role: 'admin' | 'user' | 'moderator'): UserProfile[] => {
  return mockUsers.filter((user) => user.role === role);
};

// Function to get users by level
export const getUsersByLevel = (
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
): UserProfile[] => {
  return mockUsers.filter((user) => user.level === level);
};

// Mock notifications with admin-specific ones
export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'system',
    title: 'Welcome to SkillXchange!',
    description: 'Complete your profile to start connecting with other learners',
    timestamp: '1 hour ago',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'request',
    title: 'New Skill Exchange Request',
    description: 'Sarah Rodriguez wants to exchange Graphic Design for your JavaScript skills',
    timestamp: '2 hours ago',
    isRead: false,
    userId: 'advanced-1',
  },
  {
    id: 'notif-3',
    type: 'match',
    title: 'Perfect Match Found!',
    description: 'Dr. Emily Watson has skills you want and wants skills you have',
    timestamp: '4 hours ago',
    isRead: true,
    userId: 'expert-1',
  },
  {
    id: 'notif-4',
    type: 'message',
    title: 'New Message',
    description: 'Marcus Chen sent you a message about system architecture',
    timestamp: '6 hours ago',
    isRead: true,
    userId: 'expert-2',
  },
  {
    id: 'admin-notif-1',
    type: 'system',
    title: 'Platform Update Required',
    description: 'Security patch needs to be applied to the system',
    timestamp: '30 minutes ago',
    isRead: false,
  },
  {
    id: 'notif-1',
    userId: 'current-user',
    type: 'request',
    title: 'New Swap Request',
    description: 'Michael Chen has sent you a new skill swap request.',
    timestamp: '2025-07-12T13:10:00',
    isRead: false,
  },
  {
    id: 'notif-2',
    userId: 'current-user',
    type: 'message',
    title: 'Unread Messages',
    description: 'You have 3 unread messages from your conversations.',
    timestamp: '2025-07-12T10:30:00',
    isRead: true,
  },
  {
    id: 'notif-3',
    userId: 'current-user',
    type: 'system',
    title: 'Assessment Ready',
    description: 'Your JavaScript skill assessment is now available.',
    timestamp: '2025-07-11T09:15:00',
    isRead: false,
  },
  {
    id: 'notif-4',
    userId: 'current-user',
    type: 'system',
    title: 'New Rating',
    description: 'Sarah Davis gave you a 5-star rating for your teaching session.',
    timestamp: '2025-07-10T15:45:00',
    isRead: true,
  },
  {
    id: 'notif-5',
    userId: 'current-user',
    type: 'request',
    title: 'Swap Request Updated',
    description: 'Your skill swap with Jamie Wilson has been confirmed.',
    timestamp: '2025-07-09T11:20:00',
    isRead: true,
  },
];

// Mock conversations data
export const mockConversations = [
  {
    id: 'conv-1',
    participants: ['current-user', 'expert-1'],
    lastMessageTimestamp: '2025-07-12T09:17:00',
    lastMessage:
      'I also just uploaded some resource materials that might be helpful for you to review before our session. Let me know if you have any questions!',
    unreadCount: 2,
    title: 'Machine Learning Exchange',
  },
  {
    id: 'conv-2',
    participants: ['current-user', 'advanced-1'],
    lastMessageTimestamp: '2025-07-11T16:45:00',
    lastMessage:
      "Let's schedule our design session for this weekend. How about Saturday at 2pm? We can start with the basics of design thinking and then get into Figma.",
    unreadCount: 0,
    title: 'Design & React Exchange',
  },
  {
    id: 'conv-3',
    participants: ['current-user', 'intermediate-1'],
    lastMessageTimestamp: '2025-07-10T18:30:00',
    lastMessage:
      "Thanks for the JavaScript tips! The way you explained promises and async/await really clicked for me. I'm looking forward to our next session!",
    unreadCount: 1,
    title: 'JavaScript & React Exchange',
  },
];

// Mock Swap Requests data
export const mockSwapRequests = [
  {
    id: 'swap-1',
    requesterId: 'intermediate-1',
    requesterName: 'Jamie Park',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'expert-1',
    skillOffered: 'JavaScript',
    skillWanted: 'Machine Learning',
    status: 'pending',
    requestDate: '2025-07-10',
    message:
      "I'd love to learn about machine learning foundations in exchange for JavaScript tutoring. I can help with frontend development or Node.js!",
    availability: ['Weekends', 'Friday evenings'],
    proposedFormat: 'Online',
    proposedDuration: '1 hour per session',
  },
  {
    id: 'swap-2',
    requesterId: 'advanced-1',
    requesterName: 'Sarah Rodriguez',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'expert-2',
    skillOffered: 'UI/UX Design',
    skillWanted: 'System Design',
    status: 'accepted',
    requestDate: '2025-07-08',
    acceptDate: '2025-07-09',
    message:
      "I'm interested in learning system design fundamentals. I can offer UI/UX design principles and Figma tutorials in return.",
    availability: ['Wednesday evenings', 'Weekends'],
    proposedFormat: 'Online',
    proposedDuration: '1.5 hours per session',
    nextSession: '2025-07-14 18:00',
  },
  {
    id: 'swap-3',
    requesterId: 'beginner-2',
    requesterName: 'Maria Gonzalez',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'intermediate-1',
    skillOffered: 'Spanish Language',
    skillWanted: 'HTML/CSS',
    status: 'completed',
    requestDate: '2025-06-20',
    acceptDate: '2025-06-21',
    completedDate: '2025-07-05',
    sessionsCount: 3,
    totalHours: 4.5,
    recipientRating: 5,
    requesterRating: 4.5,
    recipientReview:
      'Maria is an excellent Spanish teacher! Very patient and tailored the lessons to my needs.',
    requesterReview:
      'Jamie was great at explaining HTML/CSS concepts in a way that made sense to me. Very helpful!',
    message:
      "I'd like to learn basic web development in exchange for Spanish lessons. I'm a native speaker and have experience teaching beginners.",
    availability: ['Monday evenings', 'Weekends'],
    proposedFormat: 'Online',
    proposedDuration: '1 hour per session',
  },
  {
    id: 'swap-4',
    requesterId: 'advanced-2',
    requesterName: 'Alex Thompson',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'expert-1',
    skillOffered: 'Digital Marketing',
    skillWanted: 'Data Science',
    status: 'rejected',
    requestDate: '2025-07-01',
    rejectDate: '2025-07-02',
    rejectionReason: 'Schedule conflict',
    message:
      "I'm looking to learn data science to enhance my marketing analytics. I can offer digital marketing strategies in return.",
    availability: ['Evenings', 'Weekends'],
    proposedFormat: 'Online',
    proposedDuration: '2 hours per session',
  },
  {
    id: 'swap-5',
    requesterId: 'specialist-1',
    requesterName: 'Dr. Robert Kim',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'intermediate-1',
    skillOffered: 'Medical Knowledge',
    skillWanted: 'JavaScript',
    status: 'pending',
    requestDate: '2025-07-11',
    message:
      "I'm developing a medical education website and need help with JavaScript. I can offer medical knowledge or healthcare insights in exchange.",
    availability: ['Tuesday evenings', 'Thursday evenings'],
    proposedFormat: 'Hybrid',
    proposedDuration: '1 hour per session',
  },
  {
    id: 'swap-6',
    requesterId: 'expert-1',
    requesterName: 'Dr. Emily Watson',
    requesterAvatar: '/placeholder.svg?height=40&width=40',
    recipientId: 'advanced-1',
    skillOffered: 'Python',
    skillWanted: 'UI/UX Design',
    status: 'in-progress',
    requestDate: '2025-06-28',
    acceptDate: '2025-06-30',
    sessionsCompleted: 2,
    sessionsRemaining: 3,
    nextSession: '2025-07-15 19:00',
    message:
      "I'm looking to improve the UI of my data visualization tools. I can offer Python or ML expertise in return.",
    availability: ['Weekday evenings', 'Sunday mornings'],
    proposedFormat: 'Online',
    proposedDuration: '1 hour per session',
  },
];

// Function to get swap requests by user (either as requester or recipient)
export const getSwapRequestsByUser = (userId: string) => {
  return mockSwapRequests.filter((req) => req.requesterId === userId || req.recipientId === userId);
};

// Function to get swap requests by status
export const getSwapRequestsByStatus = (status: string) => {
  return mockSwapRequests.filter((req) => req.status === status);
};

// Mock detailed messages for conversations
export const mockMessages = {
  'conv-1': [
    {
      id: 'msg-1-1',
      senderId: 'expert-1',
      recipientId: 'current-user',
      content:
        "Hello! I noticed you're interested in learning machine learning. I'd be happy to help with that!",
      timestamp: '2025-07-11T14:30:00',
      isRead: true,
    },
    {
      id: 'msg-1-2',
      senderId: 'current-user',
      recipientId: 'expert-1',
      content:
        "Yes, I'm very interested! I have some programming background but ML concepts are new to me.",
      timestamp: '2025-07-11T14:35:00',
      isRead: true,
    },
    {
      id: 'msg-1-3',
      senderId: 'expert-1',
      recipientId: 'current-user',
      content:
        "That's a perfect starting point. I suggest we begin with the fundamental concepts and then move to practical applications. Would you be interested in swapping for some JavaScript help?",
      timestamp: '2025-07-11T14:40:00',
      isRead: true,
    },
    {
      id: 'msg-1-4',
      senderId: 'current-user',
      recipientId: 'expert-1',
      content:
        "Absolutely! JavaScript is my strength. I'd be happy to help with any frontend or Node.js challenges you're facing.",
      timestamp: '2025-07-11T14:45:00',
      isRead: true,
    },
    {
      id: 'msg-1-5',
      senderId: 'expert-1',
      recipientId: 'current-user',
      content:
        "I'd be happy to help you with machine learning concepts! How about we start with a session this weekend? I can introduce you to supervised learning and we can do some simple exercises.",
      timestamp: '2025-07-12T09:15:00',
      isRead: false,
    },
    {
      id: 'msg-1-6',
      senderId: 'expert-1',
      recipientId: 'current-user',
      content:
        'I also just uploaded some resource materials that might be helpful for you to review before our session. Let me know if you have any questions!',
      timestamp: '2025-07-12T09:17:00',
      isRead: false,
    },
  ],
  'conv-2': [
    {
      id: 'msg-2-1',
      senderId: 'advanced-1',
      recipientId: 'current-user',
      content:
        "Hi there! I saw your profile and thought we might be a good match for skill exchange. I'm a designer looking to learn more about coding.",
      timestamp: '2025-07-10T10:20:00',
      isRead: true,
    },
    {
      id: 'msg-2-2',
      senderId: 'current-user',
      recipientId: 'advanced-1',
      content:
        "Hey Sarah! That sounds great. I've been wanting to improve my design skills. What specific coding areas are you interested in?",
      timestamp: '2025-07-10T10:25:00',
      isRead: true,
    },
    {
      id: 'msg-2-3',
      senderId: 'advanced-1',
      recipientId: 'current-user',
      content:
        "I'm really interested in React and TypeScript. I want to be able to prototype my designs and understand the development process better.",
      timestamp: '2025-07-10T10:30:00',
      isRead: true,
    },
    {
      id: 'msg-2-4',
      senderId: 'current-user',
      recipientId: 'advanced-1',
      content:
        "Perfect! I can definitely help with that. And I'd love to learn more about UI/UX design principles and Figma.",
      timestamp: '2025-07-10T10:35:00',
      isRead: true,
    },
    {
      id: 'msg-2-5',
      senderId: 'advanced-1',
      recipientId: 'current-user',
      content:
        "Let's schedule our design session for this weekend. How about Saturday at 2pm? We can start with the basics of design thinking and then get into Figma.",
      timestamp: '2025-07-11T16:45:00',
      isRead: true,
    },
  ],
  'conv-3': [
    {
      id: 'msg-3-1',
      senderId: 'intermediate-1',
      recipientId: 'current-user',
      content:
        "Hello! I'm Jamie. I noticed we have complementary skills. Would you be interested in swapping some knowledge?",
      timestamp: '2025-07-09T15:10:00',
      isRead: true,
    },
    {
      id: 'msg-3-2',
      senderId: 'current-user',
      recipientId: 'intermediate-1',
      content: 'Hi Jamie! Definitely interested. What were you thinking?',
      timestamp: '2025-07-09T15:15:00',
      isRead: true,
    },
    {
      id: 'msg-3-3',
      senderId: 'intermediate-1',
      recipientId: 'current-user',
      content:
        'I can help with JavaScript and Node.js if you could teach me some React and database design?',
      timestamp: '2025-07-09T15:20:00',
      isRead: true,
    },
    {
      id: 'msg-3-4',
      senderId: 'current-user',
      recipientId: 'intermediate-1',
      content:
        "Sounds like a perfect match! I'd be happy to show you React. When would you like to start?",
      timestamp: '2025-07-09T15:25:00',
      isRead: true,
    },
    {
      id: 'msg-3-5',
      senderId: 'intermediate-1',
      recipientId: 'current-user',
      content:
        "Thanks for the JavaScript tips! The way you explained promises and async/await really clicked for me. I'm looking forward to our next session!",
      timestamp: '2025-07-10T18:30:00',
      isRead: false,
    },
  ],
};

// Mock skill assessments
export const mockSkillAssessments = [
  {
    id: 'assessment-js-1',
    userId: 'current-user',
    skillName: 'JavaScript',
    skillLevel: 'advanced',
    completedAt: '2025-07-05T14:30:00',
    score: 92,
    questions: [
      {
        id: 'q1',
        question: 'What is the output of: console.log(typeof NaN)',
        userAnswer: 'number',
        correctAnswer: 'number',
        isCorrect: true,
      },
      {
        id: 'q2',
        question: 'How do you properly check if a variable is an array in JavaScript?',
        userAnswer: 'Array.isArray(variable)',
        correctAnswer: 'Array.isArray(variable)',
        isCorrect: true,
      },
      {
        id: 'q3',
        question: 'What is the difference between let and var declarations?',
        userAnswer: 'let is block-scoped while var is function-scoped',
        correctAnswer: 'let is block-scoped while var is function-scoped',
        isCorrect: true,
      },
    ],
    feedback:
      'Excellent understanding of JavaScript concepts. You showed strong knowledge in ES6 features and asynchronous programming.',
  },
  {
    id: 'assessment-react-1',
    userId: 'current-user',
    skillName: 'React',
    skillLevel: 'intermediate',
    completedAt: '2025-07-08T10:15:00',
    score: 85,
    questions: [
      {
        id: 'q1',
        question: "What is the purpose of React's virtual DOM?",
        userAnswer: 'To minimize direct DOM manipulation for better performance',
        correctAnswer: 'To minimize direct DOM manipulation for better performance',
        isCorrect: true,
      },
      {
        id: 'q2',
        question: 'What is the difference between state and props?',
        userAnswer: 'State is managed within the component and props are passed from parent',
        correctAnswer: 'State is managed within the component and props are passed from parent',
        isCorrect: true,
      },
      {
        id: 'q3',
        question: 'What is the correct lifecycle method to fetch data from an API?',
        userAnswer: 'componentWillMount',
        correctAnswer: 'componentDidMount or useEffect',
        isCorrect: false,
      },
    ],
    feedback:
      'Strong foundation in React. Consider reviewing the latest lifecycle methods and hooks for more current best practices.',
  },
];

// Mock ratings
export const mockRatings = [
  {
    id: 'rating-1',
    fromUserId: 'advanced-1',
    toUserId: 'current-user',
    swapRequestId: 'swap-req-2',
    rating: 5,
    comment: 'Excellent teacher! Made React concepts very clear and provided practical examples.',
    createdAt: '2025-07-10T15:30:00',
  },
  {
    id: 'rating-2',
    fromUserId: 'current-user',
    toUserId: 'advanced-1',
    swapRequestId: 'swap-req-2',
    rating: 5,
    comment:
      'Sarah is a fantastic design mentor. Her expertise in UI/UX principles was incredibly helpful.',
    createdAt: '2025-07-10T15:40:00',
  },
  {
    id: 'rating-3',
    fromUserId: 'intermediate-1',
    toUserId: 'current-user',
    swapRequestId: 'swap-req-3',
    rating: 4.5,
    comment:
      'Very knowledgeable about JavaScript. Patient teacher and explains complex topics well.',
    createdAt: '2025-07-09T18:45:00',
  },
  {
    id: 'rating-4',
    fromUserId: 'current-user',
    toUserId: 'intermediate-1',
    swapRequestId: 'swap-req-3',
    rating: 4,
    comment:
      'Jamie provided great insights on Node.js development. Would definitely work with them again.',
    createdAt: '2025-07-09T18:50:00',
  },
];

// Mock skill roadmaps
export const mockRoadmaps = [
  {
    id: 'roadmap-1',
    title: 'Frontend Web Development Path',
    description:
      'A comprehensive guide to becoming a frontend web developer, from HTML basics to advanced React applications.',
    category: 'Web Development',
    difficulty: 'beginner',
    estimatedTime: '6 months',
    steps: [
      {
        id: 'step-1',
        title: 'HTML & CSS Fundamentals',
        description: 'Learn the building blocks of web pages and how to style them.',
        resources: [
          {
            title: 'MDN Web Docs: HTML Basics',
            type: 'documentation',
            url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML',
          },
          { title: 'CSS Crash Course', type: 'video', url: 'https://example.com/css-crash-course' },
        ],
        estimatedTime: '3 weeks',
        completed: true,
      },
      {
        id: 'step-2',
        title: 'JavaScript Fundamentals',
        description: 'Learn the core concepts of JavaScript programming.',
        resources: [
          { title: 'JavaScript.info', type: 'tutorial', url: 'https://javascript.info/' },
          { title: 'Eloquent JavaScript', type: 'book', url: 'https://eloquentjavascript.net/' },
        ],
        estimatedTime: '6 weeks',
        completed: false,
      },
      {
        id: 'step-3',
        title: 'React.js',
        description: 'Build dynamic user interfaces with React.',
        resources: [
          {
            title: 'React Documentation',
            type: 'documentation',
            url: 'https://reactjs.org/docs/getting-started.html',
          },
          {
            title: 'Build a Todo App with React',
            type: 'project',
            url: 'https://example.com/react-todo-app',
          },
        ],
        estimatedTime: '8 weeks',
        completed: false,
      },
    ],
    creator: 'advanced-1',
    users: ['current-user', 'intermediate-2'],
    createdAt: '2025-06-01T12:00:00',
    updatedAt: '2025-06-15T14:30:00',
  },
  {
    id: 'roadmap-2',
    title: 'Machine Learning Foundations',
    description:
      'Start your journey in machine learning with this structured path from basic statistics to building your first models.',
    category: 'Data Science',
    difficulty: 'intermediate',
    estimatedTime: '4 months',
    steps: [
      {
        id: 'step-1',
        title: 'Python for Data Science',
        description: 'Learn Python programming with focus on data manipulation libraries.',
        resources: [
          {
            title: 'Python Data Science Handbook',
            type: 'book',
            url: 'https://jakevdp.github.io/PythonDataScienceHandbook/',
          },
          {
            title: 'NumPy and Pandas Crash Course',
            type: 'video',
            url: 'https://example.com/numpy-pandas',
          },
        ],
        estimatedTime: '4 weeks',
        completed: false,
      },
      {
        id: 'step-2',
        title: 'Statistics & Mathematics for ML',
        description: 'Essential mathematical concepts behind machine learning algorithms.',
        resources: [
          {
            title: 'StatQuest with Josh Starmer',
            type: 'video',
            url: 'https://www.youtube.com/c/joshstarmer',
          },
          {
            title: 'Mathematics for Machine Learning',
            type: 'book',
            url: 'https://mml-book.github.io/',
          },
        ],
        estimatedTime: '6 weeks',
        completed: false,
      },
      {
        id: 'step-3',
        title: 'Supervised Learning Models',
        description:
          'Build your first machine learning models for classification and regression tasks.',
        resources: [
          {
            title: 'Scikit-learn Tutorials',
            type: 'tutorial',
            url: 'https://scikit-learn.org/stable/tutorial/index.html',
          },
          {
            title: 'Kaggle Competition: House Prices',
            type: 'project',
            url: 'https://www.kaggle.com/c/house-prices-advanced-regression-techniques',
          },
        ],
        estimatedTime: '6 weeks',
        completed: false,
      },
    ],
    creator: 'expert-1',
    users: ['current-user'],
    createdAt: '2025-06-20T09:15:00',
    updatedAt: '2025-07-01T16:45:00',
  },
];

// Mock user skill progress
export const mockUserSkillProgress = [
  {
    userId: 'current-user',
    skillId: 'javascript',
    skillName: 'JavaScript',
    currentLevel: 'advanced',
    targetLevel: 'expert',
    progress: 85,
    activities: [
      {
        id: 'activity-1',
        type: 'assessment',
        title: 'JavaScript Advanced Assessment',
        score: 92,
        date: '2025-07-05T14:30:00',
      },
      {
        id: 'activity-2',
        type: 'session',
        title: 'Mentoring Session with Jamie',
        notes: 'Covered advanced async patterns and error handling',
        date: '2025-07-08T15:00:00',
      },
      {
        id: 'activity-3',
        type: 'project',
        title: 'Build a JavaScript Framework',
        status: 'in-progress',
        startDate: '2025-07-10T09:00:00',
      },
    ],
    startDate: '2025-06-01T00:00:00',
    targetDate: '2025-09-30T00:00:00',
  },
  {
    userId: 'current-user',
    skillId: 'ui-design',
    skillName: 'UI Design',
    currentLevel: 'beginner',
    targetLevel: 'intermediate',
    progress: 40,
    activities: [
      {
        id: 'activity-1',
        type: 'assessment',
        title: 'UI Design Basics Assessment',
        score: 65,
        date: '2025-07-07T10:00:00',
      },
      {
        id: 'activity-2',
        type: 'session',
        title: 'Learning Session with Sarah',
        notes: 'Covered color theory and typography basics',
        date: '2025-07-10T14:00:00',
      },
      {
        id: 'activity-3',
        type: 'resource',
        title: 'Figma Fundamentals Course',
        status: 'completed',
        completionDate: '2025-07-09T17:30:00',
      },
    ],
    startDate: '2025-06-15T00:00:00',
    targetDate: '2025-10-15T00:00:00',
  },
  {
    userId: 'current-user',
    skillId: 'machine-learning',
    skillName: 'Machine Learning',
    currentLevel: 'beginner',
    targetLevel: 'intermediate',
    progress: 20,
    activities: [
      {
        id: 'activity-1',
        type: 'assessment',
        title: 'ML Foundations Assessment',
        score: 55,
        date: '2025-07-06T11:30:00',
      },
      {
        id: 'activity-2',
        type: 'resource',
        title: 'Python for Data Science',
        status: 'in-progress',
        startDate: '2025-07-08T09:00:00',
      },
    ],
    startDate: '2025-07-01T00:00:00',
    targetDate: '2025-12-31T00:00:00',
  },
];

// Mock scheduled sessions
export const mockScheduledSessions = [
  {
    id: 'session-1',
    title: 'Machine Learning Fundamentals',
    description: 'Introduction to supervised learning concepts and practical exercises',
    startTime: '2025-07-15T15:00:00',
    endTime: '2025-07-15T16:30:00',
    participants: [
      {
        userId: 'current-user',
        role: 'learner',
      },
      {
        userId: 'expert-1',
        role: 'teacher',
      },
    ],
    skillName: 'Machine Learning',
    platform: 'video-call',
    link: 'https://meet.example.com/abc123',
    status: 'upcoming',
    materials: [
      {
        title: 'ML Intro Slides',
        type: 'presentation',
        url: 'https://docs.example.com/ml-intro',
      },
      {
        title: 'Practice Dataset',
        type: 'dataset',
        url: 'https://data.example.com/housing-prices',
      },
    ],
    swapRequestId: 'swap-req-1',
  },
  {
    id: 'session-2',
    title: 'Advanced React Patterns',
    description: 'Deep dive into React hooks, context, and performance optimization',
    startTime: '2025-07-16T14:00:00',
    endTime: '2025-07-16T15:30:00',
    participants: [
      {
        userId: 'current-user',
        role: 'teacher',
      },
      {
        userId: 'advanced-1',
        role: 'learner',
      },
    ],
    skillName: 'React',
    platform: 'in-person',
    location: 'Coffee Shop Downtown',
    status: 'upcoming',
    materials: [
      {
        title: 'React Patterns Code Repository',
        type: 'code',
        url: 'https://github.com/example/react-patterns',
      },
    ],
    swapRequestId: 'swap-req-2',
  },
  {
    id: 'session-3',
    title: 'JavaScript ES6+ Features',
    description: 'Overview of modern JavaScript features and best practices',
    startTime: '2025-07-12T11:00:00',
    endTime: '2025-07-12T12:30:00',
    participants: [
      {
        userId: 'current-user',
        role: 'teacher',
      },
      {
        userId: 'intermediate-1',
        role: 'learner',
      },
    ],
    skillName: 'JavaScript',
    platform: 'video-call',
    link: 'https://meet.example.com/def456',
    status: 'completed',
    feedback: {
      rating: 4.5,
      comments: 'Very helpful session, clear explanations of complex topics.',
    },
    swapRequestId: 'swap-req-3',
  },
];

// Mock user availability slots
export const mockUserAvailability = {
  'current-user': [
    {
      id: 'avail-1',
      day: 'Monday',
      startTime: '18:00',
      endTime: '20:00',
      isRecurring: true,
    },
    {
      id: 'avail-2',
      day: 'Wednesday',
      startTime: '18:00',
      endTime: '20:00',
      isRecurring: true,
    },
    {
      id: 'avail-3',
      day: 'Saturday',
      startTime: '10:00',
      endTime: '16:00',
      isRecurring: true,
    },
    {
      id: 'avail-4',
      date: '2025-07-20',
      startTime: '14:00',
      endTime: '18:00',
      isRecurring: false,
    },
  ],
  'expert-1': [
    {
      id: 'avail-5',
      day: 'Tuesday',
      startTime: '19:00',
      endTime: '21:00',
      isRecurring: true,
    },
    {
      id: 'avail-6',
      day: 'Thursday',
      startTime: '19:00',
      endTime: '21:00',
      isRecurring: true,
    },
    {
      id: 'avail-7',
      day: 'Sunday',
      startTime: '14:00',
      endTime: '18:00',
      isRecurring: true,
    },
  ],
  'advanced-1': [
    {
      id: 'avail-8',
      day: 'Monday',
      startTime: '12:00',
      endTime: '14:00',
      isRecurring: true,
    },
    {
      id: 'avail-9',
      day: 'Friday',
      startTime: '17:00',
      endTime: '19:00',
      isRecurring: true,
    },
    {
      id: 'avail-10',
      day: 'Saturday',
      startTime: '10:00',
      endTime: '12:00',
      isRecurring: true,
    },
  ],
};

// Mock skills data
export const mockSkills = [
  {
    id: 'skill-1',
    name: 'JavaScript',
    category: 'Web Development',
    description:
      'JavaScript is a versatile programming language primarily used for web development.',
    difficultyLevel: 'INTERMEDIATE' as 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT',
    createdAt: '2024-01-15T09:00:00Z',
    usersOffering: 52,
    usersWanting: 87,
    totalSwaps: 34,
  },
  {
    id: 'skill-2',
    name: 'React',
    category: 'Web Development',
    description: 'React is a JavaScript library for building user interfaces.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-01-20T14:30:00Z',
    usersOffering: 45,
    usersWanting: 120,
    totalSwaps: 40,
  },
  {
    id: 'skill-3',
    name: 'Python',
    category: 'Programming',
    description:
      'Python is a high-level programming language known for its simplicity and readability.',
    difficultyLevel: 'BEGINNER',
    createdAt: '2024-01-10T11:45:00Z',
    usersOffering: 78,
    usersWanting: 94,
    totalSwaps: 53,
  },
  {
    id: 'skill-4',
    name: 'UI/UX Design',
    category: 'Design',
    description:
      'UI/UX Design focuses on creating intuitive and effective user interfaces and experiences.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-01-25T16:20:00Z',
    usersOffering: 31,
    usersWanting: 67,
    totalSwaps: 25,
  },
  {
    id: 'skill-5',
    name: 'Machine Learning',
    category: 'Data Science',
    description:
      'Machine Learning is a field of AI that enables systems to learn and improve from experience.',
    difficultyLevel: 'ADVANCED',
    createdAt: '2024-02-01T10:10:00Z',
    usersOffering: 19,
    usersWanting: 86,
    totalSwaps: 15,
  },
  {
    id: 'skill-6',
    name: 'Node.js',
    category: 'Web Development',
    description: "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-02-05T13:45:00Z',
    usersOffering: 38,
    usersWanting: 72,
    totalSwaps: 29,
  },
  {
    id: 'skill-7',
    name: 'Graphic Design',
    category: 'Design',
    description: 'Graphic Design is the art of creating visual content to communicate messages.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-02-10T09:30:00Z',
    usersOffering: 42,
    usersWanting: 58,
    totalSwaps: 31,
  },
  {
    id: 'skill-8',
    name: 'Data Analysis',
    category: 'Data Science',
    description:
      'Data Analysis involves inspecting, cleansing, and modeling data to discover useful information.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-02-15T14:50:00Z',
    usersOffering: 27,
    usersWanting: 69,
    totalSwaps: 22,
  },
  {
    id: 'skill-9',
    name: 'TypeScript',
    category: 'Web Development',
    description: 'TypeScript is a strongly typed programming language that builds on JavaScript.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-02-20T11:20:00Z',
    usersOffering: 33,
    usersWanting: 81,
    totalSwaps: 27,
  },
  {
    id: 'skill-10',
    name: 'Next.js',
    category: 'Web Development',
    description:
      'Next.js is a React framework for production that enables server-side rendering and static site generation.',
    difficultyLevel: 'ADVANCED',
    createdAt: '2024-02-25T15:15:00Z',
    usersOffering: 21,
    usersWanting: 75,
    totalSwaps: 18,
  },
  {
    id: 'skill-11',
    name: 'Digital Marketing',
    category: 'Marketing',
    description: 'Digital Marketing uses digital channels to promote products and services.',
    difficultyLevel: 'BEGINNER',
    createdAt: '2024-03-01T09:45:00Z',
    usersOffering: 39,
    usersWanting: 62,
    totalSwaps: 28,
  },
  {
    id: 'skill-12',
    name: 'SQL',
    category: 'Data Science',
    description:
      'SQL is a standard language for storing, manipulating, and retrieving data in databases.',
    difficultyLevel: 'INTERMEDIATE',
    createdAt: '2024-03-05T14:00:00Z',
    usersOffering: 46,
    usersWanting: 70,
    totalSwaps: 35,
  },
  {
    id: 'skill-13',
    name: 'Docker',
    category: 'DevOps',
    description:
      'Docker is a platform for developing, shipping, and running applications in containers.',
    difficultyLevel: 'ADVANCED',
    createdAt: '2024-03-10T10:30:00Z',
    usersOffering: 24,
    usersWanting: 66,
    totalSwaps: 20,
  },
  {
    id: 'skill-14',
    name: 'Photography',
    category: 'Creative Arts',
    description:
      'Photography is the art, application, and practice of creating images by recording light.',
    difficultyLevel: 'BEGINNER',
    createdAt: '2024-03-15T16:40:00Z',
    usersOffering: 56,
    usersWanting: 43,
    totalSwaps: 32,
  },
  {
    id: 'skill-15',
    name: 'Content Writing',
    category: 'Communication',
    description:
      'Content Writing involves creating engaging content for various platforms and audiences.',
    difficultyLevel: 'BEGINNER',
    createdAt: '2024-03-20T11:50:00Z',
    usersOffering: 61,
    usersWanting: 49,
    totalSwaps: 38,
  },
];

// Get all skill categories
export const getSkillCategories = () => {
  const categories = new Set(mockSkills.map((skill) => skill.category));
  return Array.from(categories);
};

// Utility functions to access mock data

// Get user by ID
export const getMockUserById = (userId: string) => {
  return mockUsers.find((user) => user.id === userId);
};

// Get swap requests for a user
export const getMockSwapRequestsForUser = (userId: string) => {
  return mockSwapRequests.filter(
    (req) => req.requesterId === userId || req.requestedUserId === userId
  );
};

// Get notifications for a user
export const getMockNotificationsForUser = (userId: string) => {
  return mockNotifications.filter((notif) => notif.userId === userId);
};

// Get conversations for a user
export const getMockConversationsForUser = (userId: string) => {
  return mockConversations.filter((conv) => conv.participants.includes(userId));
};

// Get scheduled sessions for a user
export const getMockSessionsForUser = (userId: string) => {
  return mockScheduledSessions.filter((session) =>
    session.participants.some((p) => p.userId === userId)
  );
};

// Get skill progress for a user
export const getMockSkillProgressForUser = (userId: string) => {
  return mockUserSkillProgress.filter((progress) => progress.userId === userId);
};

// Get ratings for a user
export const getMockRatingsForUser = (userId: string) => {
  return mockRatings.filter((rating) => rating.toUserId === userId);
};

// Get assessments for a user
export const getMockAssessmentsForUser = (userId: string) => {
  return mockSkillAssessments.filter((assessment) => assessment.userId === userId);
};

// Get user availability
export const getMockUserAvailability = (userId: string) => {
  return mockUserAvailability[userId as keyof typeof mockUserAvailability] || [];
};

// Get mock users based on skill match
export const getMockUsersBySkill = (skillName: string) => {
  return mockUsers.filter((user) => user.skillsOffered.includes(skillName));
};

// Comprehensive mock data getter that simulates an API call
export const getMockUserData = (userId: string) => {
  const user = getMockUserById(userId);

  if (!user) return null;

  return {
    user,
    swapRequests: getMockSwapRequestsForUser(userId),
    conversations: getMockConversationsForUser(userId),
    messages: Object.values(mockMessages)
      .flat()
      .filter((msg) => msg.senderId === userId || msg.recipientId === userId),
    notifications: getMockNotificationsForUser(userId),
    sessions: getMockSessionsForUser(userId),
    skillProgress: getMockSkillProgressForUser(userId),
    ratings: getMockRatingsForUser(userId),
    assessments: getMockAssessmentsForUser(userId),
    availability: getMockUserAvailability(userId),
  };
};

// Function to get messages for a specific conversation
export const getMessagesForConversation = (conversationId: string) => {
  return mockMessages[conversationId as keyof typeof mockMessages] || [];
};
