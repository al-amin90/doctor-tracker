# Doctor Tracker

A secure, full-stack administrative portal built with Next.js 15 for managing doctors and their patients. Features a real-time dashboard with data visualizations, advanced search/filter/pagination, JWT-based authentication with httpOnly cookies, and a clean modular backend architecture — all within a single Next.js application.

---

## Setup Guide

### Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

### Installation

```bash
git clone https://github.com/your-repo/doctor-tracker.git
cd doctor-tracker
npm install
```

Copy the example env file and fill in your values:

```bash
cp .env.example .env.local
```

Install shadcn/ui components:

```bash
npx shadcn@latest init
npx shadcn@latest add button input label card badge select table dialog alert-dialog avatar skeleton popover calendar sonner
```

Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### First-time Setup

First Register then Login, http://localhost:3000/register

---

## System Architecture

```
Browser (Next.js App Router)
    │
    ├── Redux Store (RTK Query) ──► /api/* (Next.js Route Handlers)
    │                                        │
    │                               modules/*/controller.ts
    │                                        │
    │                               modules/*/service.ts
    │                                        │
    │                               Mongoose Models ──► MongoDB
    │
    └── httpOnly Cookies (JWT) ──► auth middleware on every API route
```

**Data flow:** UI dispatches RTK Query → API route handler → module controller → service with QueryBuilder → MongoDB → serialized response → Redux cache → React component re-render.

---

## Technical Decisions

### 1. Redux over Context API

Redux was chosen over React's Context API for state management because the application requires complex state interactions across multiple components (auth state, API cache, form states). Redux provides predictable state updates through actions/reducers, time-travel debugging with Redux DevTools, and middleware support for async operations. Context API would lead to unnecessary re-renders and prop-drilling in a large-scale app, while Redux's single store and selectors optimize performance.

### 2. Soft Delete over Hard Delete

Both `DoctorModel` and `PatientModel` use an `isDeleted` flag rather than `findByIdAndDelete`. A Mongoose query middleware (`pre(/^find/)`) automatically filters out deleted documents system-wide. This preserves referential integrity — a deleted doctor's historical patient records remain queryable for audit/reporting — and makes accidental deletions recoverable without a separate audit log table.

---

## Visual Evidence

_(Add desktop and mobile screenshots here after running the app)_

---

## Environment Variables

| Variable                 | Description               |
| ------------------------ | ------------------------- |
| `DATABASE_URL`           | MongoDB connection string |
| `JWT_ACCESS_TOKEN`       | Access token secret       |
| `JWT_REFRESH_TOKEN`      | Refresh token secret      |
| `JWT_ACCESS_EXPIRES_IN`  | e.g. `1d`                 |
| `JWT_REFRESH_EXPIRES_IN` | e.g. `7d`                 |
| `BCRYPT_SALT_ROUNDS`     | e.g. `12`                 |
