import { Mission } from '@prisma/client';

/**
 * Apply simple heuristics to adjust the focus mix based on recent skip events.
 * If the user skips a category twice in 48h we temporarily lower that weight.
 * This function returns a new weight object but does not persist it.
 */
export function adjustCategoryWeights(focus: { money: number; health: number; peace: number }, events: { type: string; payload: any; createdAt: Date }[]): { money: number; health: number; peace: number } {
  const now = Date.now();
  const twoDays = 48 * 60 * 60 * 1000;
  const counts = { money: 0, health: 0, peace: 0 };
  for (const ev of events) {
    if (ev.type === 'skip' && ev.createdAt && now - ev.createdAt.getTime() < twoDays) {
      const category = ev.payload?.category as 'money' | 'health' | 'peace' | undefined;
      if (category) counts[category]++;
    }
  }
  const updated = { ...focus };
  for (const k of Object.keys(counts) as Array<'money' | 'health' | 'peace'>) {
    if (counts[k] >= 2) {
      updated[k] = Math.max(0, updated[k] - 10);
    }
  }
  // normalise weights to sum to 100
  const sum = updated.money + updated.health + updated.peace;
  if (sum > 0) {
    updated.money = Math.round((updated.money / sum) * 100);
    updated.health = Math.round((updated.health / sum) * 100);
    updated.peace = 100 - updated.money - updated.health;
  }
  return updated;
}
