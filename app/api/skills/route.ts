import { NextRequest, NextResponse } from 'next/server';
import { mockSkills } from '@/lib/mock-data-enhanced';

/**
 * Handler for getting all skills - using mock data to avoid Prisma dependency
 */
export async function GET(request: NextRequest) {
  try {
    // Use our enhanced mock data
    return NextResponse.json({
      message: 'Skills retrieved successfully',
      skills: mockSkills,
    });
  } catch (error) {
    console.error('Error fetching skills:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve skills',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const { name, category } = await request.json();

    if (!name || !category) {
      return NextResponse.json({ error: 'Name and category are required' }, { status: 400 });
    }

    // Simulate adding a new skill
    const newSkill = {
      id: `skill-${Date.now()}`,
      name,
      category,
      description: '',
      difficultyLevel: 'BEGINNER',
      createdAt: new Date().toISOString(),
      usersOffering: 0,
      usersWanting: 0,
      totalSwaps: 0,
    };
    console.log('New skill added (simulated):', newSkill);

    return NextResponse.json(
      {
        message: 'Skill created successfully',
        skill: newSkill,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating skill:', error);
    return NextResponse.json(
      {
        message: 'Failed to create skill',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
