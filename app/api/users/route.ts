import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { updateUserSchema, userSearchSchema } from '@/schemas/validation';
import { UserRepository } from '@/lib/repositories/user.repository';

async function getUsersHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const queryData = userSearchSchema.parse(Object.fromEntries(searchParams));

  const result = await UserRepository.search(
    queryData.query,
    queryData.location,
    queryData.skillOffered,
    queryData.skillWanted,
    queryData.isOnline,
    queryData.page,
    queryData.limit
  );

  return NextResponse.json(
    {
      message: 'Users retrieved successfully',
      users: result.users,
      pagination: {
        page: queryData.page,
        limit: queryData.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / queryData.limit),
      },
    },
    { status: 200 }
  );
}

async function updateUserHandler(req: any, userData: any) {
  const updatedUser = await UserRepository.update(req.user.userId, userData);

  if (!updatedUser) {
    return NextResponse.json(
      { error: 'User not found', message: 'User not found or update failed' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    {
      message: 'User updated successfully',
      user: updatedUser,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling)(getUsersHandler);

export const PUT = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(updateUserSchema)
)(updateUserHandler);
