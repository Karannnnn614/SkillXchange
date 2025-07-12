import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { userSkillWantedSchema } from '@/schemas/validation';
import { UserSkillRepository } from '@/lib/repositories/skill.repository';

async function getUserWantedSkillsHandler(req: any) {
  const skills = await UserSkillRepository.getUserWantedSkills(req.user.userId);

  return NextResponse.json(
    {
      message: 'Wanted skills retrieved successfully',
      skills,
    },
    { status: 200 }
  );
}

async function addWantedSkillHandler(req: any, skillData: any) {
  const skill = await UserSkillRepository.addWantedSkill(req.user.userId, skillData);

  return NextResponse.json(
    {
      message: 'Skill added to wanted skills successfully',
      skill,
    },
    { status: 201 }
  );
}

export const GET = combineMiddleware(withErrorHandling, withAuth)(getUserWantedSkillsHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(userSkillWantedSchema)
)(addWantedSkillHandler);
