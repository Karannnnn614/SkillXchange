import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { createSwapRequestSchema } from '@/schemas/validation';

// Mock swap requests repository (since we're using mock data)
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

  static async getAll(userId?: string) {
    if (userId) {
      return this.swapRequests.filter(
        (req) => req.requesterId === userId || req.providerId === userId
      );
    }
    return this.swapRequests;
  }

  static async getByStatus(status: string, userId?: string) {
    let requests = this.swapRequests.filter((req) => req.status === status);
    if (userId) {
      requests = requests.filter((req) => req.requesterId === userId || req.providerId === userId);
    }
    return requests;
  }

  static async create(data: any) {
    const newRequest = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.swapRequests.push(newRequest);
    return newRequest;
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

async function getSwapRequestsHandler(req: any) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');
  const type = searchParams.get('type'); // 'incoming' or 'outgoing'

  let requests = await SwapRequestRepository.getAll(req.user.userId);

  if (status) {
    requests = requests.filter((request) => request.status === status);
  }

  if (type === 'incoming') {
    requests = requests.filter((request) => request.providerId === req.user.userId);
  } else if (type === 'outgoing') {
    requests = requests.filter((request) => request.requesterId === req.user.userId);
  }

  return NextResponse.json(
    {
      message: 'Swap requests retrieved successfully',
      requests,
    },
    { status: 200 }
  );
}

async function createSwapRequestHandler(req: any, requestData: any) {
  // Ensure user isn't requesting from themselves
  if (requestData.providerId === req.user.userId) {
    return NextResponse.json(
      { error: 'Invalid request', message: 'Cannot create swap request with yourself' },
      { status: 400 }
    );
  }

  const swapRequest = await SwapRequestRepository.create({
    ...requestData,
    requesterId: req.user.userId,
  });

  return NextResponse.json(
    {
      message: 'Swap request created successfully',
      request: swapRequest,
    },
    { status: 201 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getSwapRequestsHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(createSwapRequestSchema)
)(createSwapRequestHandler);
