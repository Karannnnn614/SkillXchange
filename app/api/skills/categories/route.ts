import { NextRequest, NextResponse } from 'next/server';
import { getSkillCategories } from '@/lib/mock-data-enhanced';

/**
 * Handler for getting skill categories - using mock data to avoid Prisma dependency
 */
export async function GET(req: NextRequest) {
  try {
    // Use mock data instead of Prisma
    const categories = getSkillCategories();

    return NextResponse.json(
      {
        message: 'Categories retrieved successfully',
        categories,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error getting skill categories:', error);
    return NextResponse.json(
      {
        message: 'Failed to retrieve skill categories',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
