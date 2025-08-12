import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

/**
 * GET /api/missions/today
 *
 * Returns the current set of 3–5 missions for the given user.  The caller must
 * provide a `userId` query parameter; authentication will be added in a future
 * iteration.  Only missions with status `pending` are returned.
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  if (!userId) {
    return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
  }
  const missions = await prisma.mission.findMany({
    where: { userId, status: 'pending' },
    take: 5
  });
  return NextResponse.json({ missions });
}
