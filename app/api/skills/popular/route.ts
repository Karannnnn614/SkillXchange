import { NextRequest, NextResponse } from 'next/server';
import { combineMiddleware, withErrorHandling } from '@/lib/middleware';
import { SkillRepository } from '@/lib/repositories/skill.repository';

async function getPopularSkillsHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const limit = parseInt(searchParams.get('limit') || '10');

  const skills = await SkillRepository.getPopularSkills(limit);

  return NextResponse.json(
    {
      message: 'Popular skills retrieved successfully',
      skills,
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling)(getPopularSkillsHandler);
