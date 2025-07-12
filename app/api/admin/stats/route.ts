import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { adminUserActionSchema } from '@/schemas/validation';

// Mock admin repository
class AdminRepository {
  private static bannedUsers = new Set<string>();
  private static adminActions: any[] = [];

  static async getAllUsers() {
    // Import mock users (simulate getting from database)
    const { mockUsers } = await import('@/lib/mock-data-enhanced');

    return mockUsers.map((user) => ({
      ...user,
      isBanned: this.bannedUsers.has(user.id),
      lastAction: this.getLastAction(user.id),
    }));
  }

  static async getUserStats() {
    const { mockUsers } = await import('@/lib/mock-data-enhanced');

    const totalUsers = mockUsers.length;
    const adminUsers = mockUsers.filter((u) => u.role === 'admin').length;
    const bannedUsers = this.bannedUsers.size;
    const activeUsers = mockUsers.filter((u) => u.isOnline).length;

    return {
      totalUsers,
      adminUsers,
      bannedUsers,
      activeUsers,
      newUsersThisMonth: Math.floor(totalUsers * 0.2), // Mock data
    };
  }

  static async banUser(userId: string, reason: string, adminId: string, duration?: number) {
    this.bannedUsers.add(userId);

    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'ban',
      targetUserId: userId,
      adminId,
      reason,
      duration,
      timestamp: new Date().toISOString(),
    };

    this.adminActions.push(action);
    return action;
  }

  static async unbanUser(userId: string, reason: string, adminId: string) {
    this.bannedUsers.delete(userId);

    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'unban',
      targetUserId: userId,
      adminId,
      reason,
      timestamp: new Date().toISOString(),
    };

    this.adminActions.push(action);
    return action;
  }

  static async getAdminActions(limit = 50) {
    return this.adminActions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }

  static getLastAction(userId: string) {
    return this.adminActions
      .filter((action) => action.targetUserId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  }

  static async deleteContent(
    contentType: string,
    contentId: string,
    reason: string,
    adminId: string
  ) {
    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'content_delete',
      contentType,
      contentId,
      adminId,
      reason,
      timestamp: new Date().toISOString(),
    };

    this.adminActions.push(action);
    return action;
  }
}

async function getAdminStatsHandler(req: any) {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }

  const stats = await AdminRepository.getUserStats();
  const recentActions = await AdminRepository.getAdminActions(10);

  return NextResponse.json(
    {
      message: 'Admin stats retrieved successfully',
      stats,
      recentActions,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getAdminStatsHandler);
