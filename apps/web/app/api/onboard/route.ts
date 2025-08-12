import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { profileInputSchema } from '../../../../../packages/shared/src/schemas';

/**
 * POST /api/onboard
 *
 * Accepts a JSON body containing a `profile` object.  Validates the input
 * and creates or updates a user profile.  For the MVP this endpoint does not
 * require authentication – a new User row will be created on every request.
 */
export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch (err) {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }
  const profile = (body as any).profile;
  const result = profileInputSchema.safeParse(profile);
  if (!result.success) {
    return NextResponse.json({ error: 'Invalid profile data', details: result.error.flatten() }, { status: 400 });
  }
  const data = result.data;
  // Create a new user and associated profile.  In a real app you would
  // authenticate the requester and upsert the profile for the current user.
  const user = await prisma.user.create({ data: {} });
  await prisma.profile.create({
    data: {
      userId: user.id,
      age: data.age,
      heightCm: data.heightCm,
      weightKg: data.weightKg,
      workStatus: data.workStatus,
      incomeBand: data.incomeBand,
      focusMoney: data.focusMoney ?? 34,
      focusHealth: data.focusHealth ?? 33,
      focusPeace: data.focusPeace ?? 33,
      skills: data.skills,
      tz: data.tz ?? 'America/Bogota'
    }
  });
  // Seed a handful of placeholder missions.  In production this would call
  // the OpenAI API to generate personalised missions.
  const seedMissions = [
    {
      title: 'Drink a glass of water',
      desc: 'Hydrate yourself with a full glass of water.',
      category: 'health',
      difficulty: 0.8,
      estSeconds: 30,
      xp: 15
    },
    {
      title: 'Write down one idea',
      desc: 'Take 60 seconds to jot down a business or creative idea.',
      category: 'money',
      difficulty: 1.0,
      estSeconds: 60,
      xp: 20
    },
    {
      title: 'Deep breathe',
      desc: 'Take five deep breaths to clear your mind.',
      category: 'peace',
      difficulty: 0.9,
      estSeconds: 45,
      xp: 18
    }
  ];
  for (const m of seedMissions) {
    await prisma.mission.create({ data: { userId: user.id, title: m.title, desc: m.desc, category: m.category, difficulty: m.difficulty, estSeconds: m.estSeconds, xp: m.xp, source: 'seed:v0' } });
  }
  return NextResponse.json({ ok: true, userId: user.id });
}
