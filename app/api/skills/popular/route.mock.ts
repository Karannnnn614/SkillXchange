import { NextRequest, NextResponse } from 'next/server';
import { mockSkills } from '@/lib/mock-data-enhanced';

export async function GET(request: NextRequest) {
  try {
    // Get top 10 skills from mock data
    const popularSkills = mockSkills ? mockSkills.slice(0, 10) : [];

    return NextResponse.json(
      {
        message: 'Popular skills retrieved successfully',
        skills: popularSkills,
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
