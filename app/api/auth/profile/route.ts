import { NextRequest, NextResponse } from 'next/server';
import { combineMiddleware, withAuth, withErrorHandling } from '@/lib/middleware';
import { UserRepository } from '@/lib/repositories/user.repository';

async function profileHandler(req: any) {
  const user = await UserRepository.findByIdWithStats(req.user.userId);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found', message: 'User profile not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: 'Profile retrieved successfully',
      user,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(profileHandler);
