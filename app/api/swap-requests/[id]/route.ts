import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { updateSwapRequestSchema } from '@/schemas/validation';

// Using the same mock repository from the main route
class SwapRequestRepository {
  private static swapRequests = [
    {
      id: '1',
      requesterId: 'user-2',
      providerId: 'user-1',
      offeredSkillId: 'python',
      requestedSkillId: 'video-editing',
      status: 'pending',
      message:
        "I'm a data scientist looking to get into content creation. I can teach you Python, machine learning, and data analysis in exchange for video editing skills using Adobe Premiere or DaVinci Resolve.",
      proposedSchedule: { days: ['weekends'], timeSlots: ['morning', 'afternoon'] },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      requesterId: 'user-1',
      providerId: 'user-3',
      offeredSkillId: 'video-editing',
      requestedSkillId: 'react',
      status: 'accepted',
      message: "Hi! I'd love to exchange my video editing skills for React development knowledge.",
      proposedSchedule: { days: ['weekdays'], timeSlots: ['evening'] },
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ];

  static async findById(id: string) {
    return this.swapRequests.find((req) => req.id === id);
  }

  static async updateStatus(id: string, status: string, userId: string) {
    const requestIndex = this.swapRequests.findIndex((req) => req.id === id);
    if (requestIndex === -1) return null;

    const request = this.swapRequests[requestIndex];

    // Only the provider can accept/decline, only the requester can cancel
    if (status === 'accepted' || status === 'declined') {
      if (request.providerId !== userId) return null;
    } else if (status === 'cancelled') {
      if (request.requesterId !== userId) return null;
    }

    this.swapRequests[requestIndex] = {
      ...request,
      status,
      updatedAt: new Date().toISOString(),
    };

    return this.swapRequests[requestIndex];
  }

  static async delete(id: string, userId: string) {
    const requestIndex = this.swapRequests.findIndex((req) => req.id === id);
    if (requestIndex === -1) return false;

    const request = this.swapRequests[requestIndex];
    // Only requester can delete their own requests
    if (request.requesterId !== userId) return false;

    this.swapRequests.splice(requestIndex, 1);
    return true;
  }
}

async function getSwapRequestHandler(req: any, { params }: { params: { id: string } }) {
  const request = await SwapRequestRepository.findById(params.id);

  if (!request) {
    return NextResponse.json(
      { error: 'Request not found', message: 'Swap request not found' },
      { status: 404 }
    );
  }

  // Check if user is involved in this request
  if (request.requesterId !== req.user.userId && request.providerId !== req.user.userId) {
    return NextResponse.json(
      { error: 'Unauthorized', message: 'Not authorized to view this request' },
      { status: 403 }
    );
  }

  return NextResponse.json(
    {
      message: 'Swap request retrieved successfully',
      request,
    },
    { status: 200 }
  );
}

async function updateSwapRequestHandler(
  req: any,
  updateData: any,
  { params }: { params: { id: string } }
) {
  const { status } = updateData;

  const updatedRequest = await SwapRequestRepository.updateStatus(
    params.id,
    status,
    req.user.userId
  );

  if (!updatedRequest) {
    return NextResponse.json(
      { error: 'Update failed', message: 'Request not found or unauthorized' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: 'Swap request updated successfully',
      request: updatedRequest,
    },
    { status: 200 }
  );
}

async function deleteSwapRequestHandler(req: any, { params }: { params: { id: string } }) {
  const deleted = await SwapRequestRepository.delete(params.id, req.user.userId);

  if (!deleted) {
    return NextResponse.json(
      { error: 'Delete failed', message: 'Request not found or unauthorized' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: 'Swap request deleted successfully',
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getSwapRequestHandler);

export const PUT = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(updateSwapRequestSchema)
)(updateSwapRequestHandler);

export const DELETE = combineMiddleware(withErrorHandling, withAuth)(deleteSwapRequestHandler);
