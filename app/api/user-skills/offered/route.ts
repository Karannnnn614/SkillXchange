import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { userSkillOfferedSchema } from '@/schemas/validation';
import { UserSkillRepository } from '@/lib/repositories/skill.repository';

async function getUserOfferedSkillsHandler(req: any) {
  const skills = await UserSkillRepository.getUserOfferedSkills(req.user.userId);

  return NextResponse.json(
    {
      message: 'Offered skills retrieved successfully',
      skills,
    },
    { status: 200 }
  );
}

async function addOfferedSkillHandler(req: any, skillData: any) {
  const skill = await UserSkillRepository.addOfferedSkill(req.user.userId, skillData);

  return NextResponse.json(
    {
      message: 'Skill added to offered skills successfully',
      skill,
    },
    { status: 201 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getUserOfferedSkillsHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(userSkillOfferedSchema)
)(addOfferedSkillHandler);
