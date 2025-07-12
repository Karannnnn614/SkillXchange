#!/usr/bin/env node

/**
 * Database Setup Script for SkillXchange
 *
 * This script helps set up the PostgreSQL database for the SkillXchange platform.
 * It will create the database, run the schema, and optionally seed with sample data.
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

async function createDatabase() {
  console.log('🔄 Setting up SkillXchange database...\n');

  // First, connect to PostgreSQL without specifying a database
  const adminPool = new Pool({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: 'postgres', // Connect to default postgres database
  });

  try {
    // Check if database exists
    const dbCheckResult = await adminPool.query('SELECT 1 FROM pg_database WHERE datname = $1', [
      process.env.DATABASE_NAME,
    ]);

    if (dbCheckResult.rows.length === 0) {
      console.log(`📋 Creating database: ${process.env.DATABASE_NAME}`);
      await adminPool.query(`CREATE DATABASE "${process.env.DATABASE_NAME}"`);
      console.log('✅ Database created successfully\n');
    } else {
      console.log(`📋 Database ${process.env.DATABASE_NAME} already exists\n`);
    }
  } catch (error) {
    console.error('❌ Error creating database:', error.message);
    throw error;
  } finally {
    await adminPool.end();
  }
}

async function runSchema() {
  console.log('🔄 Running database schema...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    const schemaPath = path.join(__dirname, '../lib/database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf-8');

    await pool.query(schemaSql);
    console.log('✅ Database schema applied successfully\n');
  } catch (error) {
    console.error('❌ Error running schema:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

async function seedDatabase() {
  console.log('🔄 Seeding database with sample data...');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    // Insert sample skills
    const skillsData = [
      {
        name: 'JavaScript',
        category: 'Programming',
        description: 'Modern JavaScript programming language',
        difficulty: 'intermediate',
      },
      {
        name: 'React',
        category: 'Programming',
        description: 'React.js library for building user interfaces',
        difficulty: 'intermediate',
      },
      {
        name: 'Node.js',
        category: 'Programming',
        description: 'Server-side JavaScript runtime',
        difficulty: 'intermediate',
      },
      {
        name: 'Python',
        category: 'Programming',
        description: 'Versatile programming language',
        difficulty: 'beginner',
      },
      {
        name: 'Data Science',
        category: 'Data',
        description: 'Data analysis and machine learning',
        difficulty: 'advanced',
      },
      {
        name: 'UI/UX Design',
        category: 'Design',
        description: 'User interface and experience design',
        difficulty: 'intermediate',
      },
      {
        name: 'Photography',
        category: 'Creative',
        description: 'Digital and film photography',
        difficulty: 'beginner',
      },
      {
        name: 'Marketing',
        category: 'Business',
        description: 'Digital marketing and strategy',
        difficulty: 'intermediate',
      },
      {
        name: 'Guitar',
        category: 'Music',
        description: 'Acoustic and electric guitar playing',
        difficulty: 'beginner',
      },
      {
        name: 'Spanish',
        category: 'Language',
        description: 'Spanish language conversation and grammar',
        difficulty: 'intermediate',
      },
    ];

    for (const skill of skillsData) {
      await pool.query(
        'INSERT INTO skills (name, category, description, difficulty_level) VALUES ($1, $2, $3, $4) ON CONFLICT (name) DO NOTHING',
        [skill.name, skill.category, skill.description, skill.difficulty]
      );
    }

    console.log('✅ Sample skills added to database');

    // Create a sample user (you can remove this in production)
    const sampleUserEmail = 'demo@skillxchange.com';
    const userExists = await pool.query('SELECT id FROM users WHERE email = $1', [sampleUserEmail]);

    if (userExists.rows.length === 0) {
      const bcrypt = require('bcryptjs');
      const hashedPassword = await bcrypt.hash('password123', 12);

      await pool.query(
        `INSERT INTO users (email, username, password_hash, first_name, last_name, bio, location) 
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          sampleUserEmail,
          'demo_user',
          hashedPassword,
          'Demo',
          'User',
          'This is a demo user account for testing the SkillXchange platform.',
          'San Francisco, CA',
        ]
      );
      console.log('✅ Sample user created (demo@skillxchange.com / password123)');
    }

    console.log('✅ Database seeded successfully\n');
  } catch (error) {
    console.error('❌ Error seeding database:', error.message);
    throw error;
  } finally {
    await pool.end();
  }
}

async function main() {
  try {
    // Check if required environment variables are set
    const requiredEnvVars = [
      'DATABASE_HOST',
      'DATABASE_PORT',
      'DATABASE_NAME',
      'DATABASE_USER',
      'DATABASE_PASSWORD',
      'DATABASE_URL',
    ];

    const missingEnvVars = requiredEnvVars.filter((envVar) => !process.env[envVar]);

    if (missingEnvVars.length > 0) {
      console.error('❌ Missing required environment variables:');
      missingEnvVars.forEach((envVar) => console.error(`   - ${envVar}`));
      console.error('\nPlease check your .env.local file');
      process.exit(1);
    }

    const args = process.argv.slice(2);
    const shouldSeed = args.includes('--seed');

    await createDatabase();
    await runSchema();

    if (shouldSeed) {
      await seedDatabase();
    }

    console.log('🎉 Database setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Install dependencies: npm install');
    console.log('2. Start the development server: npm run dev');
    console.log('3. Visit http://localhost:3000');

    if (shouldSeed) {
      console.log('\nDemo account created:');
      console.log('Email: demo@skillxchange.com');
      console.log('Password: password123');
    }
  } catch (error) {
    console.error('\n💥 Database setup failed:', error.message);
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}
