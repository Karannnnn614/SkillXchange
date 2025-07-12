# SkillXchange Mock Data Generator Prompt

## Instructions for ChatGPT
Generate comprehensive SQL INSERT statements for a skill-sharing platform called "SkillXchange". Create realistic, diverse mock data that will showcase the platform's functionality during demonstrations.

## Database Schema Overview
The platform has the following main tables:
- **users**: User profiles with personal information
- **skills**: Available skills in various categories  
- **user_skills_offered**: Skills that users can teach
- **user_skills_wanted**: Skills that users want to learn
- **swap_requests**: Skill exchange requests between users
- **messages**: Direct messages between users
- **conversations**: Message threads
- **ratings**: User ratings and feedback
- **notifications**: System notifications

## Requirements

### 1. Users Table (25-30 users)
Create diverse users with:
- **Demographics**: Mix of genders, ages, backgrounds, locations (major cities worldwide)
- **Professions**: Software developers, designers, teachers, marketers, consultants, students, freelancers, entrepreneurs, etc.
- **Realistic Data**: 
  - Professional email addresses (gmail, outlook, company domains)
  - Strong passwords (bcrypt hashed - use placeholder hash: `$2b$10$rQ8K8O9nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1nV1`)
  - Professional usernames
  - Compelling bio descriptions (2-3 sentences about experience and motivation)
  - Realistic locations (City, State/Country format)
  - Professional avatar URLs (use placeholder: `/api/placeholder/avatar/{id}`)
  - Varied activity levels (some very active, some occasional users)

### 2. Skills Table (50+ skills)
Include skills across categories:
- **Programming**: JavaScript, Python, React, Node.js, Java, C++, Swift, Go, Rust, TypeScript, PHP, Ruby, etc.
- **Design**: UI/UX Design, Graphic Design, Web Design, Figma, Adobe Creative Suite, Sketch, Canva, etc.
- **Digital Marketing**: SEO, Social Media Marketing, Content Marketing, Google Ads, Facebook Ads, Email Marketing, etc.
- **Data & Analytics**: Data Analysis, SQL, Machine Learning, Python for Data Science, Tableau, Excel, etc.
- **Languages**: Spanish, French, German, Mandarin, Japanese, Portuguese, Italian, etc.
- **Business**: Project Management, Business Strategy, Finance, Accounting, Sales, Public Speaking, etc.
- **Creative**: Photography, Video Editing, Music Production, Writing, Content Creation, etc.
- **Other**: Cooking, Yoga, Guitar, Piano, Drawing, etc.

### 3. User Skills (Realistic Combinations)
- **Offered Skills**: 2-5 skills per user based on their profession/background
- **Wanted Skills**: 1-3 skills that complement their current skillset
- **Proficiency Levels**: Mix of beginner, intermediate, advanced, expert
- **Experience Years**: Realistic based on proficiency level

### 4. Swap Requests (15-20 requests)
- **Various Statuses**: pending, accepted, completed, declined
- **Realistic Messages**: Professional but friendly request messages
- **Diverse Skill Combinations**: Cross-category exchanges (dev ↔ design, language ↔ tech, etc.)
- **Timestamps**: Recent activity (last 30 days)

### 5. Conversations & Messages (10-15 conversations)
- **Active Threads**: Between users who have swap requests
- **Message Types**: Initial contact, scheduling, follow-ups, thank you messages
- **Realistic Content**: Professional but conversational tone
- **Recent Activity**: Mix of recent and older messages

### 6. Ratings (10-15 ratings)
- **High Quality**: Mostly 4-5 star ratings with constructive feedback
- **Detailed Reviews**: Specific comments about teaching quality, communication, reliability
- **Varied Aspects**: Rate skill quality, communication, and reliability separately

### 7. Notifications (20+ notifications)
- **Types**: swap_request, message, rating, system notifications
- **Mix of Read/Unread**: Some recent unread notifications
- **Relevant Content**: Tied to existing users and activities

## Sample Data Guidelines

### User Examples:
- **Sarah Chen**: UX Designer from San Francisco, offers UI/UX Design, wants to learn React
- **Marcus Johnson**: Full-stack developer from NYC, offers JavaScript/Node.js, wants to learn Spanish
- **Elena Rodriguez**: Marketing manager from Barcelona, offers Social Media Marketing, wants to learn Python
- **Alex Kim**: Data scientist from Toronto, offers Python/Machine Learning, wants to learn Guitar

### Skill Exchange Examples:
- Web Developer teaching React in exchange for learning Spanish
- Designer offering Figma training for Python lessons  
- Marketing expert sharing SEO knowledge for Guitar lessons
- Language teacher offering German for JavaScript training

## Output Format
Provide clean SQL INSERT statements in this order:
1. Users (with realistic password hashes)
2. Skills (organized by category)
3. User Skills Offered
4. User Skills Wanted  
5. Swap Requests
6. Conversations
7. Messages
8. Ratings
9. Notifications

## Important Notes:
- Use UUID format: `uuid_generate_v4()` for all ID fields
- Use current timestamps: `CURRENT_TIMESTAMP` for created_at fields
- Ensure referential integrity (valid foreign keys)
- Make data realistic and professionally appropriate
- Include variety in locations, backgrounds, and skill combinations
- Create logical relationships between users, requests, and messages
- Use proper PostgreSQL syntax and data types

Generate the SQL now, focusing on creating a vibrant, active community that will impress during project demonstrations.
