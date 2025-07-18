import { NextRequest, NextResponse } from 'next/server';
import { mockSkills } from '@/lib/mock-data-enhanced';

/**
 * Handler for getting popular skills - using mock data to avoid Prisma dependency
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    // Use mock data instead of Prisma
    const skills = mockSkills.slice(0, limit);

    return NextResponse.json(
      {
        message: 'Popular skills retrieved successfully',
        skills,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting popular skills:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve popular skills',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
