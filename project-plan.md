# LEVEL MVP Sprint – 7‑Day Plan

This plan outlines the recommended milestones for the initial 7‑day sprint to build the minimum viable product of the LEVEL self‑improvement game.  Each day includes clear deliverables to keep development on track.

## Day 1 – Repository setup & schema

- **Initialise** a Git repository (if not already) and scaffold the monorepo structure (`apps/web`, `apps/mobile`, `packages/shared`, `prisma`).
- **Define** the Prisma schema based on the provided models (`User`, `Profile`, `Mission`, `Event`, `LevelState`).  Commit the schema to `prisma/schema.prisma`.
- **Configure** the root `package.json` and create `apps/web/package.json` and `apps/mobile/package.json` with scripts for dev, build and lint.
- **Generate** the first migration and connect Prisma to the Supabase database.

## Day 2 – Next.js API scaffolding

- **Create** a basic Next.js 14 project in `apps/web` using the App Router.
- **Implement** `/api/onboard` (POST) to accept onboarding data, validate it with Zod and create/update a `Profile`.  Seed an initial set of missions using placeholder logic.
- **Implement** `/api/missions/today` (GET) to return 3‑5 missions for the authenticated user.  Use stub mission generation for now.
- **Write** unit tests for these endpoints using any test framework (e.g. vitest or jest).

## Day 3 – Remaining API endpoints

- **Implement** `/api/missions/:id/act` (POST) to handle mission actions (done, skip, swap).  Update XP, streak and return a new mission when swapped.
- **Implement** `/api/progress` (GET) to return the user’s total XP, current level, streak and category splits.
- **Implement** `/api/nudge/check` (POST) to find inactive users, call the OpenAI API to generate a nudge and schedule a push notification.  Use a mock push scheduling function for now.

## Day 4 – Mobile app skeleton

- **Scaffold** an Expo React Native project in `apps/mobile` with TypeScript.
- **Implement** basic navigation with three tabs (Today, Progress, Profile) using `expo-router` or a similar library.
- **Create** `MissionCard` and `LevelRing` components with placeholder styling inspired by Opal (large text, soft gradients).
- **Fetch** missions and progress from the API using simple fetch wrappers (stored in `apps/mobile/lib/api.ts`).

## Day 5 – AI integration

- **Define** prompt templates for mission generation and nudge generation in `apps/web/lib/ai/prompts`.
- **Implement** functions in `apps/web/lib/ai` to call the OpenAI API and parse the JSON responses.
- **Wire** these functions into the `/api/onboard` seeding step and `/api/nudge/check`.
- **Add** Zod schemas in `packages/shared` to validate AI responses.

## Day 6 – Personalisation & heuristics

- **Implement** basic personalisation rules in `apps/web/lib/logic/personalize.ts` (e.g. adjust category weights after skips, schedule missions in the user’s preferred time window, enforce instant‑win and medium‑mission rules).
- **Update** mission generation to pass recent events and time windows to the AI template.
- **Enhance** the mobile UI with confetti on completion and gentle haptics (placeholder functions for now).

## Day 7 – Polish & deployment

- **Write** documentation in the README covering setup, environment variables, migration commands and running the app locally.
- **Deploy** the Next.js application to Vercel using a new project.  Configure environment variables and Vercel cron for the nudge endpoint.
- **Configure** the Expo app for EAS builds.  Ensure that it talks to the deployed API and that push notifications work locally (stub or via Expo’s push service).
- **Perform** manual end‑to‑end testing of onboarding, mission completion, streak calculations and nudges.
