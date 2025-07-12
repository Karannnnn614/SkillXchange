import { NextRequest, NextResponse } from 'next/server';
import { AuthUtils } from '@/lib/auth';
import { getUserByEmail, testUserCredentials } from '@/lib/mock-data-enhanced';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    // Find user in mock data
    const user = getUserByEmail(email);
    const credentials = testUserCredentials.find((cred) => cred.email === email);

    if (!user || !credentials) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Verify password (for testing, we'll use simple comparison)
    if (password !== credentials.password) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    // Generate JWT token
    const token = AuthUtils.generateToken({
      userId: user.id,
      email: user.email,
      username: user.name,
    });

    // Remove sensitive information and return user data
    const userResponse = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      location: user.location,
      avatar: user.avatar,
      bio: user.bio,
      rating: user.rating,
      level: user.level,
      isVerified: user.isVerified,
      badges: user.badges,
      completedSwaps: user.completedSwaps,
      joinedDate: user.joinedDate,
      skillsOffered: user.skillsOffered || [],
      skillsWanted: user.skillsWanted || [],
      availability: user.availability || 'flexible',
      isPublic: user.isPublic !== undefined ? user.isPublic : true,
      isOnline: user.isOnline !== undefined ? user.isOnline : true,
      lastSeen: user.lastSeen || 'now',
    };

    // Set HTTP-only cookie for security
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: userResponse,
        token,
      },
      { status: 200 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// GET endpoint to list available test users
export async function GET() {
  const testUsers = testUserCredentials.map((cred) => ({
    email: cred.email,
    role: cred.role,
    password: cred.password, // In real app, never expose passwords!
  }));

  return NextResponse.json({
    message: 'Available test users for login',
    users: testUsers,
    note: 'These are test credentials for development only',
  });
}
