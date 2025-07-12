# SkillXchange - Mock Users & Testing Guide

## Overview

This document provides comprehensive information about the mock users and testing setup for the SkillXchange platform.

## Mock User Database

### Admin Users (2 users)

| Name            | Email                       | Password | Role  | Description             |
| --------------- | --------------------------- | -------- | ----- | ----------------------- |
| Admin Sarah     | admin@skillxchange.com      | admin123 | admin | Platform administrator  |
| Tech Admin Mike | tech.admin@skillxchange.com | admin123 | admin | Technical administrator |

### Moderator Users (1 user)

| Name            | Email                      | Password | Role      | Description         |
| --------------- | -------------------------- | -------- | --------- | ------------------- |
| Moderator Jenny | jenny.mod@skillxchange.com | mod123   | moderator | Community moderator |

### Expert Level Users (4 users)

| Name               | Email                  | Password | Level  | Specialization      |
| ------------------ | ---------------------- | -------- | ------ | ------------------- |
| Dr. Emily Watson   | emily.watson@email.com | user123  | expert | AI/ML, Data Science |
| Marcus Chen        | marcus.chen@email.com  | user123  | expert | System Architecture |
| Dr. Robert Kim     | robert.kim@email.com   | user123  | expert | Medical/Healthcare  |
| Prof. Angela Davis | angela.davis@email.com | user123  | expert | Academic/Research   |

### Advanced Level Users (2 users)

| Name            | Email                     | Password | Level    | Specialization    |
| --------------- | ------------------------- | -------- | -------- | ----------------- |
| Sarah Rodriguez | sarah.rodriguez@email.com | user123  | advanced | UI/UX Design      |
| Alex Thompson   | alex.thompson@email.com   | user123  | advanced | Digital Marketing |

### Intermediate Level Users (2 users)

| Name       | Email                | Password | Level        | Specialization     |
| ---------- | -------------------- | -------- | ------------ | ------------------ |
| Jamie Park | jamie.park@email.com | user123  | intermediate | JavaScript/Web Dev |
| Lisa Kim   | lisa.kim@email.com   | user123  | intermediate | Photography        |

### Beginner Level Users (3 users)

| Name           | Email                    | Password | Level    | Background                       |
| -------------- | ------------------------ | -------- | -------- | -------------------------------- |
| Tom Wilson     | tom.wilson@email.com     | user123  | beginner | Career changer to tech           |
| Maria Gonzalez | maria.gonzalez@email.com | user123  | beginner | Language expert learning web dev |
| David Chang    | david.chang@email.com    | user123  | beginner | Chef learning digital marketing  |

## API Endpoints for Testing

### Authentication

- **Test Login**: `GET /api/auth/test-login` - View all test credentials
- **Login**: `POST /api/auth/test-login` - Login with test credentials

### Users

- **All Users**: `GET /api/users/mock` - Get all mock users
- **Filter by Role**: `GET /api/users/mock?role=admin` - Filter users by role (admin, user, moderator)
- **Filter by Level**: `GET /api/users/mock?level=expert` - Filter by skill level
- **Combined Filters**: `GET /api/users/mock?role=user&level=expert` - Multiple filters

### Database Testing

- **Seed Database**: `POST /api/seed` - Populate database with mock users (dev only)
- **Verify Data**: `GET /api/seed` - Check seeded data statistics

## Testing Scenarios

### 1. Role-Based Access Testing

```bash
# Test admin login
curl -X POST http://localhost:3000/api/auth/test-login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@skillxchange.com","password":"admin123"}'

# Test regular user login
curl -X POST http://localhost:3000/api/auth/test-login \
  -H "Content-Type: application/json" \
  -d '{"email":"emily.watson@email.com","password":"user123"}'
```

### 2. User Filtering

```bash
# Get only admin users
curl http://localhost:3000/api/users/mock?role=admin

# Get expert level users
curl http://localhost:3000/api/users/mock?level=expert

# Get expert users only (excluding admins/mods)
curl http://localhost:3000/api/users/mock?role=user&level=expert
```

### 3. Skill Matching Testing

Each user has different skills offered and wanted:

- **Dr. Emily Watson**: Offers ML/AI, wants Web Development
- **Marcus Chen**: Offers System Design, wants UI/UX
- **Sarah Rodriguez**: Offers Design, wants Programming
- **Jamie Park**: Offers JavaScript, wants React/AWS

## User Profiles Features

### Common Attributes

- **Ratings**: 4.1 to 5.0 (admins have 5.0)
- **Verification Status**: Experts and above are verified
- **Badges**: Role-specific and achievement-based
- **Availability**: Various schedules (weekends, evenings, flexible, etc.)
- **Completed Swaps**: 0-52 depending on experience level

### Skill Categories Covered

- **Programming**: JavaScript, Python, React, Node.js, AWS
- **Design**: UI/UX, Graphic Design, Figma, Adobe Suite
- **Data Science**: ML, AI, Statistics, R, Python
- **Marketing**: SEO, Content Strategy, Social Media
- **Creative**: Photography, Cooking, Language Translation
- **Academic**: Research, Writing, Teaching

## Development Notes

### File Structure

```
lib/
├── mock-data-enhanced.ts     # Enhanced mock users with roles
├── seed-database.ts          # Database seeding functions
└── mock-data.ts             # Original mock data (legacy)

app/api/
├── auth/test-login/         # Test authentication endpoint
├── users/mock/              # Mock users API
└── seed/                    # Database seeding endpoint

components/pages/
└── admin-dashboard.tsx      # Admin interface component
```

### Database Schema

The seeding script creates tables for:

- **users**: Main user profiles with roles and levels
- **user_skills**: Skills offered and wanted by users
- **user_badges**: Achievement badges earned by users

### Security Notes

- Test passwords are simple for development only
- JWT tokens are generated for authenticated sessions
- HTTP-only cookies are used for token storage
- Production seeding is disabled for security

## Usage Examples

### Frontend Integration

```typescript
// Fetch users by role
const adminUsers = await fetch('/api/users/mock?role=admin').then((r) => r.json());

// Login test user
const loginResponse = await fetch('/api/auth/test-login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: 'admin@skillxchange.com',
    password: 'admin123',
  }),
});
```

### Testing Different User Types

1. **Admin Testing**: Use admin credentials to test platform management features
2. **Expert Testing**: Use expert users to test advanced skill exchange features
3. **Beginner Testing**: Use beginner accounts to test onboarding and learning paths
4. **Cross-Level Testing**: Test skill exchanges between different user levels

This setup provides comprehensive testing scenarios for all aspects of the SkillXchange platform!
