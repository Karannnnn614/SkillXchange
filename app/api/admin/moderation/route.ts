import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { adminContentModerationSchema } from '@/schemas/validation';

// Mock content moderation repository
class ContentModerationRepository {
  private static deletedContent = new Set<string>();
  private static flaggedContent = new Set<string>();
  private static moderationActions: any[] = [];

  static async deleteContent(
    contentType: string,
    contentId: string,
    reason: string,
    adminId: string
  ) {
    this.deletedContent.add(`${contentType}:${contentId}`);

    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'content_delete',
      contentType,
      contentId,
      adminId,
      reason,
      timestamp: new Date().toISOString(),
    };

    this.moderationActions.push(action);
    return action;
  }

  static async flagContent(
    contentType: string,
    contentId: string,
    reason: string,
    adminId: string
  ) {
    this.flaggedContent.add(`${contentType}:${contentId}`);

    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'content_flag',
      contentType,
      contentId,
      adminId,
      reason,
      timestamp: new Date().toISOString(),
    };

    this.moderationActions.push(action);
    return action;
  }

  static async unflagContent(
    contentType: string,
    contentId: string,
    reason: string,
    adminId: string
  ) {
    this.flaggedContent.delete(`${contentType}:${contentId}`);

    const action = {
      id: Math.random().toString(36).substr(2, 9),
      type: 'content_unflag',
      contentType,
      contentId,
      adminId,
      reason,
      timestamp: new Date().toISOString(),
    };

    this.moderationActions.push(action);
    return action;
  }

  static async getModerationActions(limit = 50) {
    return this.moderationActions
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, limit);
  }
}

async function moderateContentHandler(req: any, moderationData: any) {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }

  const { contentType, contentId, action, reason } = moderationData;

  let result;

  switch (action) {
    case 'delete':
      result = await ContentModerationRepository.deleteContent(
        contentType,
        contentId,
        reason,
        req.user.userId
      );
      break;
    case 'flag':
      result = await ContentModerationRepository.flagContent(
        contentType,
        contentId,
        reason,
        req.user.userId
      );
      break;
    case 'unflag':
      result = await ContentModerationRepository.unflagContent(
        contentType,
        contentId,
        reason,
        req.user.userId
      );
      break;
    default:
      return NextResponse.json(
        { error: 'Invalid action', message: 'Unsupported moderation action' },
        { status: 400 }
      );
  }

  return NextResponse.json(
    {
      message: `Content ${action} action completed successfully`,
      action: result,
    },
    { status: 200 }
  );
}

async function getModerationHistoryHandler(req: any) {
  // Check if user is admin
  if (req.user.role !== 'admin') {
    return NextResponse.json(
      { error: 'Forbidden', message: 'Admin access required' },
      { status: 403 }
    );
  }

  const actions = await ContentModerationRepository.getModerationActions();

  return NextResponse.json(
    {
      message: 'Moderation history retrieved successfully',
      actions,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getModerationHistoryHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(adminContentModerationSchema)
)(moderateContentHandler);
