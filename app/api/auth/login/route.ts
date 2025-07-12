import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withErrorHandling,
  withRateLimit,
  validateRequestBody,
} from '@/lib/middleware';
import { loginSchema } from '@/schemas/validation';
import { UserRepository } from '@/lib/repositories/user.repository';
import { AuthUtils } from '@/lib/auth';

async function loginHandler(req: NextRequest, loginData: any) {
  // Find user by email
  const user = await UserRepository.findByEmail(loginData.email);

  if (!user) {
    return NextResponse.json(
      { error: 'Authentication failed', message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Verify password
  const isPasswordValid = await AuthUtils.comparePassword(loginData.password, user.passwordHash);

  if (!isPasswordValid) {
    return NextResponse.json(
      { error: 'Authentication failed', message: 'Invalid email or password' },
      { status: 401 }
    );
  }

  // Update last seen
  await UserRepository.updateLastSeen(user.id);

  // Generate JWT token
  const token = AuthUtils.generateToken({
    userId: user.id,
    email: user.email,
    username: user.username,
  });

  // Remove sensitive information
  const { passwordHash, ...userResponse } = user;

  return NextResponse.json(
    {
      message: 'Login successful',
      user: userResponse,
      token,
    },
    { status: 200 }
  );
}

export const POST = combineMiddleware(
  withErrorHandling,
  withRateLimit,
  validateRequestBody(loginSchema)
)(loginHandler);
