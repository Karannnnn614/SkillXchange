import { NextRequest, NextResponse } from 'next/server';
import { combineMiddleware, withErrorHandling } from '@/lib/middleware';
import { SkillRepository } from '@/lib/repositories/skill.repository';

async function getCategoriesHandler(req: NextRequest) {
  const categories = await SkillRepository.getCategories();

  return NextResponse.json(
    {
      message: 'Categories retrieved successfully',
      categories,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling)(getCategoriesHandler);
