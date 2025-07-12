import { AuthUtils } from '@/lib/auth';
import pool from '@/lib/db';
import { mockUsers, testUserCredentials } from '@/lib/mock-data-enhanced';

export async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        role VARCHAR(20) DEFAULT 'user',
        location VARCHAR(255),
        avatar VARCHAR(500),
        bio TEXT,
        rating DECIMAL(3,2) DEFAULT 0.00,
        availability VARCHAR(100),
        is_public BOOLEAN DEFAULT true,
        is_online BOOLEAN DEFAULT false,
        is_verified BOOLEAN DEFAULT false,
        level VARCHAR(20) DEFAULT 'beginner',
        last_seen TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        completed_swaps INTEGER DEFAULT 0,
        joined_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create skills table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_skills (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(user_id),
        skill_name VARCHAR(255) NOT NULL,
        skill_type VARCHAR(20) NOT NULL, -- 'offered' or 'wanted'
        proficiency_level VARCHAR(20) DEFAULT 'beginner',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create badges table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS user_badges (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(50) REFERENCES users(user_id),
        badge_name VARCHAR(255) NOT NULL,
        earned_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log('Tables created successfully');

    // Clear existing data
    await pool.query('DELETE FROM user_badges');
    await pool.query('DELETE FROM user_skills');
    await pool.query('DELETE FROM users');

    console.log('Existing data cleared');

    // Insert users
    for (const user of mockUsers) {
      const credentials = testUserCredentials.find(cred => cred.email === user.email);
      const passwordHash = credentials ? 
        await AuthUtils.hashPassword(credentials.password) : 
        await AuthUtils.hashPassword('defaultpass123');

      await pool.query(`
        INSERT INTO users (
          user_id, name, email, password_hash, role, location, avatar, bio,
          rating, availability, is_public, is_online, is_verified, level,
          completed_swaps, joined_date
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
      `, [
        user.id,
        user.name,
        user.email,
        passwordHash,
        user.role,
        user.location,
        user.avatar,
        user.bio,
        user.rating,
        user.availability,
        user.isPublic,
        user.isOnline,
        user.isVerified,
        user.level,
        user.completedSwaps,
        new Date(user.joinedDate)
      ]);

      // Insert skills offered
      for (const skill of user.skillsOffered) {
        await pool.query(`
          INSERT INTO user_skills (user_id, skill_name, skill_type, proficiency_level)
          VALUES ($1, $2, 'offered', $3)
        `, [user.id, skill, user.level]);
      }

      // Insert skills wanted
      for (const skill of user.skillsWanted) {
        await pool.query(`
          INSERT INTO user_skills (user_id, skill_name, skill_type)
          VALUES ($1, $2, 'wanted')
        `, [user.id, skill]);
      }

      // Insert badges
      for (const badge of user.badges) {
        await pool.query(`
          INSERT INTO user_badges (user_id, badge_name)
          VALUES ($1, $2)
        `, [user.id, badge]);
      }
    }

    console.log(`Successfully seeded database with ${mockUsers.length} users`);
    
    // Print summary
    const adminCount = mockUsers.filter(u => u.role === 'admin').length;
    const moderatorCount = mockUsers.filter(u => u.role === 'moderator').length;
    const userCount = mockUsers.filter(u => u.role === 'user').length;
    
    console.log(`Seeded users: ${adminCount} admins, ${moderatorCount} moderators, ${userCount} regular users`);
    
    return {
      success: true,
      message: `Database seeded with ${mockUsers.length} users`,
      stats: { adminCount, moderatorCount, userCount }
    };

  } catch (error) {
    console.error('Error seeding database:', error);
    return {
      success: false,
      message: 'Failed to seed database',
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
}

// Function to verify seeded data
export async function verifySeededData() {
  try {
    const result = await pool.query(`
      SELECT 
        role,
        level,
        COUNT(*) as count
      FROM users 
      GROUP BY role, level
      ORDER BY role, level
    `);
    
    console.log('Database verification:');
    console.table(result.rows);
    
    return result.rows;
  } catch (error) {
    console.error('Error verifying data:', error);
    return [];
  }
}
