import { NextRequest, NextResponse } from 'next/server';
import { mockUsers, getUsersByRole, getUsersByLevel } from '@/lib/mock-data-enhanced';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const role = searchParams.get('role') as 'admin' | 'user' | 'moderator' | null;
    const level = searchParams.get('level') as 'beginner' | 'intermediate' | 'advanced' | 'expert' | null;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let filteredUsers = [...mockUsers];

    // Filter by role
    if (role) {
      filteredUsers = getUsersByRole(role);
    }

    // Filter by level
    if (level) {
      filteredUsers = filteredUsers.filter(user => user.level === level);
    }

    // Pagination
    const totalUsers = filteredUsers.length;
    const paginatedUsers = filteredUsers
      .slice(offset, offset + limit)
      .map(user => ({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        location: user.location,
        avatar: user.avatar,
        skillsOffered: user.skillsOffered,
        skillsWanted: user.skillsWanted,
        rating: user.rating,
        availability: user.availability,
        isOnline: user.isOnline,
        lastSeen: user.lastSeen,
        bio: user.bio,
        completedSwaps: user.completedSwaps,
        joinedDate: user.joinedDate,
        badges: user.badges,
        isVerified: user.isVerified,
        level: user.level,
        matchScore: user.matchScore,
      }));

    return NextResponse.json({
      users: paginatedUsers,
      pagination: {
        total: totalUsers,
        limit,
        offset,
        hasNext: offset + limit < totalUsers,
        hasPrev: offset > 0,
      },
      filters: {
        role,
        level,
      },
    });

  } catch (error) {
    console.error('Error fetching users:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
