import { NextRequest, NextResponse } from 'next/server';
import {
  combineMiddleware,
  withAuth,
  withErrorHandling,
  validateRequestBody,
} from '@/lib/middleware';
import { createSkillSchema, skillSearchSchema } from '@/schemas/validation';
import { SkillRepository } from '@/lib/repositories/skill.repository';

async function getSkillsHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const queryData = skillSearchSchema.parse(Object.fromEntries(searchParams));

  const result = await SkillRepository.search(
    queryData.query,
    queryData.category,
    queryData.difficultyLevel,
    queryData.page,
    queryData.limit
  );

  return NextResponse.json(
    {
      message: 'Skills retrieved successfully',
      skills: result.skills,
      pagination: {
        page: queryData.page,
        limit: queryData.limit,
        total: result.total,
        totalPages: Math.ceil(result.total / queryData.limit),
      },
    },
    { status: 200 }
  );
}

async function createSkillHandler(req: NextRequest, skillData: any) {
  // Check if skill already exists
  const existingSkill = await SkillRepository.findByName(skillData.name);

  if (existingSkill) {
    return NextResponse.json(
      { error: 'Skill already exists', message: 'A skill with this name already exists' },
      { status: 409 }
    );
  }

  const skill = await SkillRepository.create(skillData);

  return NextResponse.json(
    {
      message: 'Skill created successfully',
      skill,
    },
    { status: 201 }
  );
}

export const GET = combineMiddleware(withErrorHandling)(getSkillsHandler);

export const POST = combineMiddleware(
  withErrorHandling,
  withAuth,
  validateRequestBody(createSkillSchema)
)(createSkillHandler);
