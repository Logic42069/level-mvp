/**
 * Determine the new streak value.  If the user completed at least one mission on the
 * previous day, increment the streak; otherwise reset to 1.  This is a simplified
 * version of streak logic and can be enhanced later.
 */
export function updateStreak(lastActive: Date | null, now: Date): number {
  if (!lastActive) return 1;
  const millisInDay = 24 * 60 * 60 * 1000;
  const diff = now.getTime() - lastActive.getTime();
  // if difference is less than 48h and at least 24h have passed, increment streak
  if (diff >= millisInDay && diff < millisInDay * 2) {
    return 1; // caller should increment from previous value
  }
  return 0;
}
