'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authApi, usersApi, skillsApi, userSkillsApi } from '@/lib/api/client';

// Query Keys
export const QUERY_KEYS = {
  // Auth
  profile: ['profile'] as const,

  // Users
  users: ['users'] as const,
  user: (id: string) => ['users', id] as const,

  // Skills
  skills: ['skills'] as const,
  skillCategories: ['skills', 'categories'] as const,
  popularSkills: ['skills', 'popular'] as const,

  // User Skills
  offeredSkills: ['user-skills', 'offered'] as const,
  wantedSkills: ['user-skills', 'wanted'] as const,
  skillMatches: ['user-skills', 'matches'] as const,
};

// Auth Hooks
export function useAuth() {
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data: any) => {
      queryClient.setQueryData(QUERY_KEYS.profile, data.user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: (data: any) => {
      queryClient.setQueryData(QUERY_KEYS.profile, data.user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
    },
  });

  return {
    login: loginMutation,
    register: registerMutation,
    logout: logoutMutation,
  };
}

export function useProfile() {
  return useQuery({
    queryKey: QUERY_KEYS.profile,
    queryFn: authApi.getProfile,
    retry: false,
  });
}

// Users Hooks
export function useUsers(params?: any) {
  return useQuery({
    queryKey: [...QUERY_KEYS.users, params],
    queryFn: () => usersApi.getUsers(params),
    enabled: !!params,
  });
}

export function useUser(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.user(id),
    queryFn: () => usersApi.getUserById(id),
    enabled: !!id,
  });
}

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: usersApi.updateProfile,
    onSuccess: (data: any) => {
      queryClient.setQueryData(QUERY_KEYS.profile, data.user);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
    },
  });
}

// Skills Hooks
export function useSkills(params?: any) {
  return useQuery({
    queryKey: [...QUERY_KEYS.skills, params],
    queryFn: () => skillsApi.getSkills(params),
  });
}

export function useSkillCategories() {
  return useQuery({
    queryKey: QUERY_KEYS.skillCategories,
    queryFn: skillsApi.getCategories,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

export function usePopularSkills(limit?: number) {
  return useQuery({
    queryKey: [...QUERY_KEYS.popularSkills, limit],
    queryFn: () => skillsApi.getPopularSkills(limit),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useCreateSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: skillsApi.createSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skills });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skillCategories });
    },
  });
}

// User Skills Hooks
export function useOfferedSkills() {
  return useQuery({
    queryKey: QUERY_KEYS.offeredSkills,
    queryFn: userSkillsApi.getOfferedSkills,
  });
}

export function useWantedSkills() {
  return useQuery({
    queryKey: QUERY_KEYS.wantedSkills,
    queryFn: userSkillsApi.getWantedSkills,
  });
}

export function useSkillMatches() {
  return useQuery({
    queryKey: QUERY_KEYS.skillMatches,
    queryFn: userSkillsApi.findMatches,
  });
}

export function useAddOfferedSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSkillsApi.addOfferedSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.offeredSkills });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skillMatches });
    },
  });
}

export function useAddWantedSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSkillsApi.addWantedSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wantedSkills });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skillMatches });
    },
  });
}

export function useRemoveOfferedSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSkillsApi.removeOfferedSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.offeredSkills });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skillMatches });
    },
  });
}

export function useRemoveWantedSkill() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSkillsApi.removeWantedSkill,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.wantedSkills });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.profile });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.skillMatches });
    },
  });
}
