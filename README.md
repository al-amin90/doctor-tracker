# Doctor Tracker

Doctor Tracker is a modern full-stack healthcare management system built with Next.js. It helps organizations manage doctors, patients, appointments, and dashboard insights through a secure and responsive interface.

## 🔐 Admin Login

Use the following admin credentials to sign in:

- Email: ijesun@gmail.com
- Password: 12345678

## ✨ Features

- Secure authentication with JWT and httpOnly cookies
- Role-based access for admin users
- Doctor and patient management
- Dashboard analytics with charts and statistics
- Advanced search, filtering, and pagination
- Clean modular backend architecture
- Responsive UI for desktop and mobile

## 🛠️ Technology Stack

- Frontend: Next.js, React, TypeScript, Tailwind CSS
- UI Components: shadcn/ui, Radix UI, Lucide React
- State Management: Redux Toolkit, RTK Query
- Backend: Next.js API routes, Mongoose, MongoDB
- Validation & Security: Zod, JWT, bcrypt
- Charts: Recharts

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone <your-repo-url>
cd doctor-tracker
npm install
```

Create your environment file:

```bash
cp .env.example .env.local
```

Add the required environment variables:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_ACCESS_TOKEN=your_access_secret
JWT_REFRESH_TOKEN=your_refresh_secret
JWT_ACCESS_EXPIRES_IN=1d
JWT_REFRESH_EXPIRES_IN=7d
BCRYPT_SALT_ROUNDS=12
```

Run the development server:

```bash
npm run dev
```

Open http://localhost:3000

## 📁 Project Structure

- src/app: Next.js app routes and pages
- src/components: reusable UI components
- src/modules: backend logic for auth, doctors, patients, and dashboard
- src/lib: database, middleware, errors, and utility helpers
- src/redux: global state and API integration

## 📸 Screenshots

The app includes a dashboard view, doctor management pages, and patient management flows with a responsive layout.

## 🧩 Notes

This project follows a modular architecture to make the codebase scalable and easier to maintain for future feature expansion.
