import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils, RateLimiter } from './auth';
import { ZodError } from 'zod';

export interface AuthenticatedRequest extends NextRequest {
  user?: {
    userId: string;
    email: string;
    username: string;
  };
}

export function withAuth(handler: (req: AuthenticatedRequest) => Promise<NextResponse>) {
  return async (req: AuthenticatedRequest) => {
    try {
      const user = await AuthUtils.getUserFromRequest(req);

      if (!user) {
        return NextResponse.json(
          { error: 'Unauthorized', message: 'Authentication required' },
          { status: 401 }
        );
      }

      req.user = user;
      return handler(req);
    } catch (error) {
      console.error('Authentication error:', error);
      return NextResponse.json(
        { error: 'Authentication failed', message: 'Invalid token' },
        { status: 401 }
      );
    }
  };
}

export function withRateLimit(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      const forwardedFor = req.headers.get('x-forwarded-for');
      const realIp = req.headers.get('x-real-ip');
      const identifier = forwardedFor || realIp || req.headers.get('cf-connecting-ip') || 'unknown';

      if (!RateLimiter.isAllowed(identifier)) {
        const resetTime = RateLimiter.getResetTime(identifier);
        const remainingMs = resetTime - Date.now();

        return NextResponse.json(
          {
            error: 'Rate limit exceeded',
            message: 'Too many requests',
            retryAfter: Math.ceil(remainingMs / 1000),
          },
          {
            status: 429,
            headers: {
              'Retry-After': Math.ceil(remainingMs / 1000).toString(),
              'X-RateLimit-Limit': process.env.RATE_LIMIT_MAX || '100',
              'X-RateLimit-Remaining': RateLimiter.getRemainingAttempts(identifier).toString(),
              'X-RateLimit-Reset': Math.ceil(resetTime / 1000).toString(),
            },
          }
        );
      }

      return handler(req);
    } catch (error) {
      console.error('Rate limiting error:', error);
      return handler(req);
    }
  };
}

export function withErrorHandling(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    try {
      return await handler(req);
    } catch (error) {
      console.error('API Error:', error);

      if (error instanceof ZodError) {
        return NextResponse.json(
          {
            error: 'Validation error',
            message: 'Invalid request data',
            details: error.errors,
          },
          { status: 400 }
        );
      }

      if (error instanceof Error) {
        // Don't expose internal error messages in production
        const message =
          process.env.NODE_ENV === 'production' ? 'Internal server error' : error.message;

        return NextResponse.json(
          {
            error: 'Internal server error',
            message,
          },
          { status: 500 }
        );
      }

      return NextResponse.json(
        {
          error: 'Unknown error',
          message: 'An unexpected error occurred',
        },
        { status: 500 }
      );
    }
  };
}

export function validateRequestBody<T>(schema: { parse: (data: unknown) => T }) {
  return (handler: (req: NextRequest, data: T) => Promise<NextResponse>) => {
    return async (req: NextRequest) => {
      try {
        const body = await req.json();
        const validatedData = schema.parse(body);
        return handler(req, validatedData);
      } catch (error) {
        if (error instanceof ZodError) {
          return NextResponse.json(
            {
              error: 'Validation error',
              message: 'Invalid request data',
              details: error.errors,
            },
            { status: 400 }
          );
        }
        throw error;
      }
    };
  };
}

export function combineMiddleware(...middlewares: Array<(handler: any) => any>) {
  return (handler: any) => {
    return middlewares.reduceRight((acc, middleware) => middleware(acc), handler);
  };
}

// CORS middleware
export function withCors(handler: (req: NextRequest) => Promise<NextResponse>) {
  return async (req: NextRequest) => {
    const response = await handler(req);

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    response.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, X-Requested-With'
    );
    response.headers.set('Access-Control-Max-Age', '86400');

    return response;
  };
}

// Options handler for CORS preflight
export function handleOptions() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
      'Access-Control-Max-Age': '86400',
    },
  });
}
