import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/progress
 *
 * Returns summary statistics for the user’s progress: total XP, level,
 * streak and category splits (percentage of XP earned per category).  The
 * caller must provide `userId` as a query parameter.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const levelState = await prisma.levelState.findUnique({ where: { userId } });
  if (!levelState) {
    return NextResponse.json({ error: 'Progress not found' }, { status: 404 });
  }
  // Compute category splits
  const missions = await prisma.mission.findMany({ where: { userId, status: 'done' } });
  const categoryTotals: Record<string, number> = {};
  let total = 0;
  for (const m of missions) {
    categoryTotals[m.category] = (categoryTotals[m.category] ?? 0) + m.xp;
    total += m.xp;
  }
  const categorySplits: Record<string, number> = {};
  for (const [cat, xp] of Object.entries(categoryTotals)) {
    categorySplits[cat] = total > 0 ? Math.round((xp / total) * 100) : 0;
  }
  // Placeholder mood sparkline (empty array)
  const moodSparkline: number[] = [];
  return NextResponse.json({
    totalXp: levelState.totalXp,
    level: levelState.level,
    streak: levelState.streak,
    categorySplits,
    moodSparkline
  });
}
