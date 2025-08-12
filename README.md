# LEVEL — Life‑as‑a‑Game App

This repository contains the source code for **LEVEL**, a mobile‑first self‑improvement game.  The goal of this project is to turn your everyday routines into a series of bite‑sized challenges.  Answer a few onboarding questions, receive a handful of micro‑missions every day, and watch your level bar fill up as you complete them.  The app personalises your missions based on the information you provide and gently nudges you back when you’ve been inactive for too long.

## Monorepo layout

```
apps/
  web/       – Next.js 14 API and web entry points
  mobile/    – Expo React Native application
packages/
  shared/    – Shared TypeScript types and Zod schemas
prisma/      – Prisma schema and migrations
```

### apps/web

The Next.js application exposes a handful of HTTP endpoints under `/api`.  These endpoints handle onboarding, mission retrieval, mission actions and progress reporting.  The API is stateless – all persistent data lives in a Postgres database managed via Prisma and Supabase.  See [`apps/web/app/api`](./apps/web/app/api) for the route handlers and [`apps/web/lib`](./apps/web/lib) for database and AI helpers.

### apps/mobile

The mobile app is built with Expo (React Native + TypeScript).  It has three main screens: **Today**, **Progress** and **Profile**.  These screens fetch data from the Next.js backend via simple fetch wrappers defined in `apps/mobile/lib/api.ts`.  Mission cards allow users to mark tasks as done, swap them out or defer them.

### packages/shared

Shared types and Zod schemas live in this package.  Both the mobile client and Next.js backend import types from here to ensure that data contracts remain consistent.

## Getting started

1. Clone this repository and install dependencies:

   ```bash
   npm install
   ```

2. Install the prisma CLI globally if you don’t have it:

   ```bash
   npm install -g prisma
   ```

3. Create a new Supabase project and copy your `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` and `SUPABASE_ANON_KEY` into an `.env` file at the repository root.  Also generate an `OPENAI_API_KEY` and set `NEXT_PUBLIC_APP_NAME` and any other variables you need:

   ```env
   NEXT_PUBLIC_APP_NAME=LEVEL
   OPENAI_API_KEY=sk-...
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=...
   SUPABASE_ANON_KEY=...
   EXPO_PUBLIC_API_BASE=https://<your-vercel-app>.vercel.app
   ```

4. Run database migrations:

   ```bash
   npx prisma generate
   npx prisma migrate dev --name init
   ```

5. Start the Next.js API locally:

   ```bash
   cd apps/web
   npm install
   npm run dev
   ```

6. Start the Expo app:

   ```bash
   cd apps/mobile
   npm install
   npm start
   ```

## Project plan

See [`project-plan.md`](./project-plan.md) for a day‑by‑day breakdown of the MVP sprint.
