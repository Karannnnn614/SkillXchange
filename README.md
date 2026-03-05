# SkillXchange

A peer-to-peer skill swap platform that enables users to exchange skills, connect, and learn together in a community-driven environment — built with Next.js.

---

## 🎯 About

**SkillXchange** is a web application that reimagines how people learn and share skills. Instead of paying for courses or tutors, users list what they know and what they want to learn — then connect with others for direct, mutual skill exchanges.

Whether you want to trade guitar lessons for Python help, or swap cooking classes for graphic design tips, SkillXchange makes it simple to find your perfect learning partner.

---

## ✨ Features

- 🔐 **Secure Authentication** — User registration and login with multiple OAuth providers
- 👤 **Dynamic Profiles** — Public/private profiles showcasing skills offered and wanted
- 🔍 **Smart Search** — Filter by skill, availability, location, and expertise level
- 🤝 **Swap Management** — Send, accept, reject, and track skill exchange requests
- ⭐ **Review System** — Rate and review partners after each session
- 💬 **In-App Messaging** — Communicate directly within the platform
- 📊 **Analytics Dashboard** — Track your exchanges and learning progress
- 📱 **Mobile-First Design** — Fully responsive across all devices

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (React 18) |
| Styling | Tailwind CSS |
| UI Components | Headless UI / Radix UI |
| Backend | Next.js API Routes |
| Database | MongoDB + Mongoose |
| Auth | NextAuth.js |
| Language | TypeScript |
| Deployment | Vercel |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud instance)
- Git

### Installation

1. **Clone the repo**

   ```bash
   git clone https://github.com/Karannnnn614/SkillXchange.git
   cd SkillXchange
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env.local` file in the root directory:

   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string

   # Authentication
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret

   # OAuth Providers (optional)
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret

   # Email Service (optional)
   EMAIL_SERVER_HOST=your_email_host
   EMAIL_SERVER_PORT=587
   EMAIL_SERVER_USER=your_email
   EMAIL_SERVER_PASSWORD=your_email_password
   ```

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📖 How It Works

1. **Sign Up** — Create your account
2. **Build Your Profile** — Add skills you can teach and skills you want to learn
3. **Discover** — Browse and search for users with complementary skills
4. **Connect** — Send a swap request
5. **Exchange** — Teach and learn together
6. **Review** — Leave feedback to build community trust

---

## 🗺️ Roadmap

- [x] Core skill swap functionality
- [ ] Video call integration
- [ ] Skill verification system
- [ ] Mobile app
- [ ] AI-powered skill matching

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -m 'Add your feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Open a Pull Request

Please make sure your code follows the existing TypeScript conventions and is responsive and accessible.

---

## 📝 License

Licensed under the [MIT License](LICENSE).
