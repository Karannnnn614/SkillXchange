import { NextRequest, NextResponse } from 'next/server';
import { combineMiddleware, withErrorHandling } from '@/lib/middleware';
import { UserRepository } from '@/lib/repositories/user.repository';
import { UserSkillRepository } from '@/lib/repositories/skill.repository';

interface RouteParams {
  params: {
    id: string;
  };
}

async function getUserByIdHandler(req: NextRequest, { params }: RouteParams) {
  const user = await UserRepository.findByIdWithStats(params.id);

  if (!user) {
    return NextResponse.json(
      { error: 'User not found', message: 'User not found' },
      { status: 404 }
    );
  }

  // Get user's skills
  const [offeredSkills, wantedSkills] = await Promise.all([
    UserSkillRepository.getUserOfferedSkills(params.id),
    UserSkillRepository.getUserWantedSkills(params.id),
  ]);

  return NextResponse.json(
    {
      message: 'User retrieved successfully',
      user: {
        ...user,
        skillsOffered: offeredSkills,
        skillsWanted: wantedSkills,
      },
    },
    { status: 200 }
  );
}

export const GET = combineMiddleware(withErrorHandling)(getUserByIdHandler);
