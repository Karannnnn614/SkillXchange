import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withErrorHandling,
  withRateLimit,
  validateRequestBody,
} from '@/lib/middleware';
import { createUserSchema } from '@/schemas/validation';
import { UserRepository } from '@/lib/repositories/user.repository';
import { AuthUtils } from '@/lib/auth';

async function registerHandler(req: NextRequest, userData: any) {
  // Check if user already exists
  const { emailExists, usernameExists } = await UserRepository.exists(
    userData.email,
    userData.username
  );

  if (emailExists) {
    return NextResponse.json(
      { error: 'User already exists', message: 'Email is already registered' },
      { status: 409 }
    );
  }

  if (usernameExists) {
    return NextResponse.json(
      { error: 'User already exists', message: 'Username is already taken' },
      { status: 409 }
    );
  }

  // Create user
  const user = await UserRepository.create(userData);

  // Generate JWT token
  const token = AuthUtils.generateToken({
    userId: user.id,
    email: user.email,
    username: user.username,
  });

  // Remove sensitive information from user object
  const { ...userResponse } = user;

  return NextResponse.json(
    {
      message: 'User registered successfully',
      user: userResponse,
      token,
    },
    { status: 201 }
  );
}

export const POST = combineMiddleware(
  withErrorHandling,
  withRateLimit,
  validateRequestBody(createUserSchema)
)(registerHandler);
