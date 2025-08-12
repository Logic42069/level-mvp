import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { generateNudge } from '@/lib/ai';

/**
 * POST /api/nudge/check
 *
 * Cron endpoint to find users who have been inactive for 12 hours or more
 * and schedule a personalised nudge.  For the MVP this implementation
 * simply generates a JSON nudge via the AI helper and records an event.  In
 * production you would integrate with Expo Notifications or another push
 * provider.
 */
export async function POST() {
  const twelveHours = 12 * 60 * 60 * 1000;
  const now = new Date();
  // Find users whose lastActive is null or more than 12h ago
  const inactive = await prisma.levelState.findMany({
    where: {
      OR: [
        { lastActive: null },
        { lastActive: { lt: new Date(now.getTime() - twelveHours) } }
      ]
    }
  });
  const nudges = [] as Array<{ userId: string; nudge: any }>;
  for (const state of inactive) {
    // Determine last mission types – fetch last 3 events for user
    const recentEvents = await prisma.event.findMany({
      where: { userId: state.userId },
      orderBy: { createdAt: 'desc' },
      take: 3
    });
    const lastTypes = recentEvents.map(ev => (ev.payload as any)?.category).filter(Boolean) as string[];
    const bestHour = now.getHours();
    try {
      const nudge = await generateNudge({ lastTypes, bestHour });
      nudges.push({ userId: state.userId, nudge });
      // Record an event
      await prisma.event.create({ data: { userId: state.userId, type: 'nudge_open', payload: nudge, createdAt: now } });
    } catch (err) {
      // If AI call fails, skip
    }
  }
  return NextResponse.json({ ok: true, sent: nudges.length });
}
