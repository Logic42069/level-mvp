/**
 * Compute the user’s level based on their total XP.  Level is defined as
 * `floor(sqrt(totalXp / 100))` as per the specification.
 */
export function computeLevel(totalXp: number): number {
  return Math.floor(Math.sqrt(totalXp / 100));
}

/**
 * Calculate the XP to award for a mission.  The base XP is multiplied by
 * the category weight and the mission’s difficulty.  The result is
 * rounded to the nearest integer.
 *
 * @param baseXp The baseline XP for a mission (e.g. 20)
 * @param categoryWeight The user’s weighting for the category (0–1)
 * @param difficulty Mission difficulty (0.8–1.4)
 */
export function calculateXp(baseXp: number, categoryWeight: number, difficulty: number): number {
  return Math.round(baseXp * categoryWeight * difficulty);
}
