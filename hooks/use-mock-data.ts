import { useCallback, useEffect, useState } from 'react';
import {
  getMockUserData,
  getMockUsersBySkill,
  mockUsers,
  mockConversations,
  mockMessages,
  mockRoadmaps,
} from '@/lib/mock-data-enhanced';

/**
 * Custom hook for accessing mock data throughout the application
 * This simulates API calls and provides a consistent interface
 */
export const useMockData = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Simulate API delay
  const simulateApiCall = useCallback(async <T>(data: T): Promise<T> => {
    setLoading(true);
    setError(null);

    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 600));

    setLoading(false);
    return data;
  }, []);

  // Get current user data
  const getCurrentUserData = useCallback(async () => {
    try {
      // Use 'current-user' as the ID for the logged-in user
      const userData = getMockUserData('current-user');
      return await simulateApiCall(userData);
    } catch (err) {
      setError('Failed to fetch user data');
      setLoading(false);
      return null;
    }
  }, [simulateApiCall]);

  // Get users by skill
  const getUsersBySkill = useCallback(
    async (skillName: string) => {
      try {
        const users = getMockUsersBySkill(skillName);
        return await simulateApiCall(users);
      } catch (err) {
        setError('Failed to fetch users by skill');
        setLoading(false);
        return [];
      }
    },
    [simulateApiCall]
  );

  // Get all conversations
  const getAllConversations = useCallback(async () => {
    try {
      return await simulateApiCall(mockConversations);
    } catch (err) {
      setError('Failed to fetch conversations');
      setLoading(false);
      return [];
    }
  }, [simulateApiCall]);

  // Get messages for a conversation
  // Get messages for a conversation
  const getConversationMessages = useCallback(
    async (conversationId: string) => {
      try {
        const messages = mockMessages.filter(
          (message) => message.conversationId === conversationId
        );
        return await simulateApiCall(messages);
      } catch (err) {
        setError('Failed to fetch messages');
        setLoading(false);
        return [];
      }
    },
    [simulateApiCall]
  );
  // Get all available skill roadmaps
  const getSkillRoadmaps = useCallback(async () => {
    try {
      return await simulateApiCall(mockRoadmaps);
    } catch (err) {
      setError('Failed to fetch roadmaps');
      setLoading(false);
      return [];
    }
  }, [simulateApiCall]);

  // Get roadmap details
  const getRoadmapById = useCallback(
    async (roadmapId: string) => {
      try {
        const roadmap = mockRoadmaps.find((r) => r.id === roadmapId);
        return await simulateApiCall(roadmap);
      } catch (err) {
        setError('Failed to fetch roadmap');
        setLoading(false);
        return null;
      }
    },
    [simulateApiCall]
  );

  // Search users by name, skills, or location
  const searchUsers = useCallback(
    async (query: string) => {
      try {
        const lowercaseQuery = query.toLowerCase();
        const filteredUsers = mockUsers.filter(
          (user) =>
            user.name.toLowerCase().includes(lowercaseQuery) ||
            user.location.toLowerCase().includes(lowercaseQuery) ||
            user.skillsOffered.some((skill) => skill.toLowerCase().includes(lowercaseQuery)) ||
            user.skillsWanted.some((skill) => skill.toLowerCase().includes(lowercaseQuery))
        );
        return await simulateApiCall(filteredUsers);
      } catch (err) {
        setError('Failed to search users');
        setLoading(false);
        return [];
      }
    },
    [simulateApiCall]
  );

  return {
    loading,
    error,
    getCurrentUserData,
    getUsersBySkill,
    getAllConversations,
    getConversationMessages,
    getSkillRoadmaps,
    getRoadmapById,
    searchUsers,
  };
};

export default useMockData;
