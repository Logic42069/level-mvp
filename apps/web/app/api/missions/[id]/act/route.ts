import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { missionActionSchema } from '../../../../../../packages/shared/src/schemas';
import { computeLevel } from '@/lib/logic/xp';

/**
 * POST /api/missions/:id/act
 *
 * Updates the specified mission according to the action provided in the
 * request body.  Accepts `done`, `skip` or `swap`, and an optional mood
 * score.  Returns a replacement mission when swapping.
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const missionId = params.id;
  const body = await request.json();
  const parsed = missionActionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: 'Invalid request', details: parsed.error.flatten() }, { status: 400 });
  }
  const { action, mood } = parsed.data;
  const mission = await prisma.mission.findUnique({ where: { id: missionId } });
  if (!mission) {
    return NextResponse.json({ error: 'Mission not found' }, { status: 404 });
  }
  const userId = mission.userId;
  const now = new Date();
  if (action === 'done') {
    await prisma.mission.update({ where: { id: missionId }, data: { status: 'done' } });
    // Increment XP and streak
    const levelState = await prisma.levelState.upsert({
      where: { userId },
      update: {},
      create: { userId, totalXp: 0, level: 0, streak: 0, lastActive: now }
    });
    const newTotalXp = levelState.totalXp + mission.xp;
    const newLevel = computeLevel(newTotalXp);
    const newStreak = (levelState.lastActive && isSameDay(levelState.lastActive, now)) ? levelState.streak : levelState.streak + 1;
    await prisma.levelState.update({ where: { userId }, data: { totalXp: newTotalXp, level: newLevel, streak: newStreak, lastActive: now } });
    // Record event
    await prisma.event.create({ data: { userId, type: 'complete', payload: { missionId: missionId, category: mission.category, mood }, createdAt: now } });
    return NextResponse.json({ ok: true, xpGained: mission.xp, totalXp: newTotalXp, level: newLevel, streak: newStreak });
  }
  if (action === 'skip') {
    await prisma.mission.update({ where: { id: missionId }, data: { status: 'skipped' } });
    await prisma.event.create({ data: { userId, type: 'skip', payload: { missionId: missionId, category: mission.category, mood }, createdAt: now } });
    return NextResponse.json({ ok: true });
  }
  if (action === 'swap') {
    // Mark original mission as replaced
    await prisma.mission.update({ where: { id: missionId }, data: { status: 'replaced' } });
    await prisma.event.create({ data: { userId, type: 'swap', payload: { missionId: missionId, category: mission.category, mood }, createdAt: now } });
    // Generate a placeholder replacement mission in the same category
    const replacement = await prisma.mission.create({
      data: {
        userId,
        title: `Try a quick ${mission.category} task`,
        desc: `This is a placeholder mission in the ${mission.category} category.`,
        category: mission.category,
        difficulty: mission.difficulty,
        estSeconds: mission.estSeconds,
        xp: mission.xp,
        source: 'swap:v0'
      }
    });
    return NextResponse.json({ ok: true, replacement });
  }
  return NextResponse.json({ error: 'Unsupported action' }, { status: 400 });
}

function isSameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
