import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create skills
  const skills = [
    {
      name: 'JavaScript',
      category: 'Programming',
      description: 'Modern JavaScript programming language',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      name: 'React',
      category: 'Programming',
      description: 'React.js library for building user interfaces',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      name: 'Node.js',
      category: 'Programming',
      description: 'Server-side JavaScript runtime',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      name: 'Python',
      category: 'Programming',
      description: 'Versatile programming language',
      difficultyLevel: 'BEGINNER',
    },
    {
      name: 'Data Science',
      category: 'Data',
      description: 'Data analysis and machine learning',
      difficultyLevel: 'ADVANCED',
    },
    {
      name: 'UI/UX Design',
      category: 'Design',
      description: 'User interface and experience design',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      name: 'Photography',
      category: 'Creative',
      description: 'Digital and film photography',
      difficultyLevel: 'BEGINNER',
    },
    {
      name: 'Marketing',
      category: 'Business',
      description: 'Digital marketing and strategy',
      difficultyLevel: 'INTERMEDIATE',
    },
    {
      name: 'Guitar',
      category: 'Music',
      description: 'Acoustic and electric guitar playing',
      difficultyLevel: 'BEGINNER',
    },
    {
      name: 'Spanish',
      category: 'Language',
      description: 'Spanish language conversation and grammar',
      difficultyLevel: 'INTERMEDIATE',
    },
  ];

  console.log('📚 Creating skills...');
  for (const skill of skills) {
    await prisma.skill.upsert({
      where: { name: skill.name },
      update: {},
      create: {
        name: skill.name,
        category: skill.category,
        description: skill.description,
        difficultyLevel: skill.difficultyLevel as any,
      },
    });
  }

  // Create demo users
  console.log('👥 Creating demo users...');

  const hashedPassword = await bcrypt.hash('password123', 12);

  const demoUser1 = await prisma.user.upsert({
    where: { email: 'demo@skillxchange.com' },
    update: {},
    create: {
      email: 'demo@skillxchange.com',
      username: 'demo_user',
      passwordHash: hashedPassword,
      firstName: 'Demo',
      lastName: 'User',
      bio: 'This is a demo user account for testing the SkillXchange platform.',
      location: 'San Francisco, CA',
    },
  });

  const demoUser2 = await prisma.user.upsert({
    where: { email: 'jane@skillxchange.com' },
    update: {},
    create: {
      email: 'jane@skillxchange.com',
      username: 'jane_dev',
      passwordHash: hashedPassword,
      firstName: 'Jane',
      lastName: 'Developer',
      bio: 'Full-stack developer passionate about teaching and learning new technologies.',
      location: 'New York, NY',
    },
  });

  // Add some skills to demo users
  console.log('🎯 Adding skills to demo users...');

  const jsSkill = await prisma.skill.findUnique({ where: { name: 'JavaScript' } });
  const reactSkill = await prisma.skill.findUnique({ where: { name: 'React' } });
  const pythonSkill = await prisma.skill.findUnique({ where: { name: 'Python' } });
  const designSkill = await prisma.skill.findUnique({ where: { name: 'UI/UX Design' } });

  if (jsSkill && reactSkill && pythonSkill && designSkill) {
    // Demo user 1 skills
    await prisma.userSkillOffered.upsert({
      where: { userId_skillId: { userId: demoUser1.id, skillId: jsSkill.id } },
      update: {},
      create: {
        userId: demoUser1.id,
        skillId: jsSkill.id,
        proficiencyLevel: 'ADVANCED',
        experienceYears: 5,
        description: 'Experienced in modern JavaScript, ES6+, and frameworks',
      },
    });

    await prisma.userSkillWanted.upsert({
      where: { userId_skillId: { userId: demoUser1.id, skillId: designSkill.id } },
      update: {},
      create: {
        userId: demoUser1.id,
        skillId: designSkill.id,
        desiredLevel: 'INTERMEDIATE',
        priority: 1,
        description: 'Want to learn UI/UX design principles and tools',
      },
    });

    // Demo user 2 skills
    await prisma.userSkillOffered.upsert({
      where: { userId_skillId: { userId: demoUser2.id, skillId: designSkill.id } },
      update: {},
      create: {
        userId: demoUser2.id,
        skillId: designSkill.id,
        proficiencyLevel: 'EXPERT',
        experienceYears: 8,
        description: 'Professional UI/UX designer with experience in web and mobile',
      },
    });

    await prisma.userSkillWanted.upsert({
      where: { userId_skillId: { userId: demoUser2.id, skillId: pythonSkill.id } },
      update: {},
      create: {
        userId: demoUser2.id,
        skillId: pythonSkill.id,
        desiredLevel: 'INTERMEDIATE',
        priority: 2,
        description: 'Want to learn Python for data analysis and automation',
      },
    });
  }

  console.log('✅ Database seeded successfully!');
  console.log('\n📝 Demo accounts created:');
  console.log('Email: demo@skillxchange.com | Password: password123');
  console.log('Email: jane@skillxchange.com | Password: password123');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
