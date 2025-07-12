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

  static getLastAction(userId: string) {
    return this.adminActions
      .filter((action) => action.targetUserId === userId)
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
  }
}

async function getAllUsersHandler(req: any) {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }

  const users = await AdminRepository.getAllUsers();

  return NextResponse.json(
    {
      message: 'Users retrieved successfully',
      users,
    },
    { status: 200 }
  );
}

async function manageUserHandler(
  req: any,
  actionData: any,
  { params }: { params: { id: string } }
) {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }

  const { action, reason, duration } = actionData;
  const userId = params.id;

  let result;

  switch (action) {
    case 'ban':
      result = await AdminRepository.banUser(userId, reason, req.user.userId, duration);
      break;
    case 'unban':
      result = await AdminRepository.unbanUser(userId, reason, req.user.userId);
      break;
    default:
      return NextResponse.json(
        { error: 'Invalid action', message: 'Unsupported action' },
        { status: 400 }
      );
  }

  return NextResponse.json(
    {
      message: `User ${action} action completed successfully`,
      action: result,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getAllUsersHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(adminUserActionSchema)
)(manageUserHandler);
