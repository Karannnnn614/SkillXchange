# SkillXchange - Skill Swap Platform

A modern, full-stack platform for skill exchange built with **Next.js**, **PostgreSQL**, **TypeScript**, and **Tailwind CSS**.

## 🚀 Features

- **User Authentication & Authorization** with JWT
- **Skill Management** - Add skills you can offer and skills you want to learn
- **Smart Matching System** - Find users with complementary skills
- **Real-time Messaging** with WebSocket support
- **Swap Request Management** - Send, receive, and manage skill exchange requests
- **Rating & Feedback System** - Rate and review completed exchanges
- **Skill Assessments** - Verify skill levels through assessments
- **Learning Roadmaps** - Structured learning paths for skills
- **Mobile Responsive Design** with modern UI/UX
- **Real-time Notifications** for platform activities

## 🛠️ Tech Stack

### Frontend

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Headless UI components
- **React Query (TanStack Query)** - Server state management
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend

- **Next.js API Routes** - Serverless API endpoints
- **PostgreSQL** - Relational database
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Socket.io** - Real-time communication

### Development Tools

- **ESLint** - Code linting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **PostgreSQL** (v12 or higher)

## 🔧 Installation & Setup

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd SkillXchange
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Setup

Copy the environment template and configure your variables:

```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/skillxchange"
DATABASE_HOST="localhost"
DATABASE_PORT="5432"
DATABASE_NAME="skillxchange"
DATABASE_USER="your_username"
DATABASE_PASSWORD="your_password"

# JWT Configuration
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_EXPIRES_IN="7d"

# NextAuth Configuration
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-nextauth-secret-change-this-in-production"

# App Configuration
NODE_ENV="development"
PORT="3000"

# Real-time Configuration
SOCKET_PORT="3001"

# Rate Limiting
RATE_LIMIT_MAX="100"
RATE_LIMIT_WINDOW="15"
```

### 4. Database Setup

**Option A: Setup with sample data (recommended for development)**

```bash
npm run db:setup:seed
```

**Option B: Setup without sample data**

```bash
npm run db:setup
```

This will:

- Create the PostgreSQL database
- Run all migrations to set up tables
- Optionally seed with sample data (skills, demo user)

### 5. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🗄️ Database Schema

The platform uses a normalized PostgreSQL schema with the following main entities:

- **users** - User accounts and profiles
- **skills** - Available skills in the platform
- **user_skills_offered** - Skills that users can teach
- **user_skills_wanted** - Skills that users want to learn
- **swap_requests** - Skill exchange requests between users
- **messages** - Real-time messaging system
- **conversations** - Message threads between users
- **ratings** - User feedback and ratings
- **notifications** - System notifications
- **skill_assessments** - Skill verification tests
- **roadmaps** - Learning path definitions

## 🔐 Authentication

The platform uses JWT-based authentication with the following endpoints:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get current user profile

## 📡 API Endpoints

### Users

- `GET /api/users` - Search and list users
- `GET /api/users/[id]` - Get user by ID
- `PUT /api/users` - Update user profile

### Skills

- `GET /api/skills` - List skills with search/filter
- `POST /api/skills` - Create new skill
- `GET /api/skills/categories` - Get skill categories
- `GET /api/skills/popular` - Get popular skills

### User Skills

- `GET /api/user-skills/offered` - Get user's offered skills
- `POST /api/user-skills/offered` - Add offered skill
- `GET /api/user-skills/wanted` - Get user's wanted skills
- `POST /api/user-skills/wanted` - Add wanted skill

## 🔄 Real-time Features

The platform includes WebSocket support for:

- **Live messaging** between users
- **Real-time notifications** for swap requests
- **User online status** updates
- **Live swap request status** changes

## 🎨 UI Components

Built with a comprehensive design system including:

- **Responsive layout** with mobile-first approach
- **Dark/Light theme** support
- **Accessible components** following WCAG guidelines
- **Modern animations** and micro-interactions
- **Consistent typography** and spacing

## 🧪 Development

### Code Quality

```bash
# Lint code
npm run lint

# Fix linting issues
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check

# Type checking
npm run type-check
```

### Database Management

```bash
# Reset and recreate database
npm run db:setup

# Add sample data to existing database
npm run db:setup:seed
```

## 🚀 Deployment

### Environment Variables for Production

Ensure you set the following in your production environment:

```env
NODE_ENV="production"
DATABASE_URL="your-production-database-url"
JWT_SECRET="your-production-jwt-secret"
NEXTAUTH_URL="your-production-domain"
NEXTAUTH_SECRET="your-production-nextauth-secret"
```

### Build for Production

```bash
npm run build
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

If you encounter any issues:

1. Check the [troubleshooting section](#troubleshooting)
2. Search [existing issues](../../issues)
3. Create a [new issue](../../issues/new) if needed

### Troubleshooting

**Database connection issues:**

- Ensure PostgreSQL is running
- Verify database credentials in `.env.local`
- Check if the database exists and is accessible

**Build errors:**

- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npm run type-check`

**Authentication issues:**

- Verify JWT_SECRET is set in environment variables
- Check if tokens are being stored correctly in localStorage
- Ensure API endpoints are accessible

---

Built with ❤️ using Next.js and modern web technologies.
