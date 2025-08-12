/**
 * Shared TypeScript interfaces for the LEVEL application.
 */

export interface SkillMap {
  [key: string]: number;
}

/**
 * Data required to create or update a user profile.
 */
export interface ProfileInput {
  age?: number;
  heightCm?: number;
  weightKg?: number;
  workStatus?: string;
  incomeBand?: string;
  focusMoney?: number;
  focusHealth?: number;
  focusPeace?: number;
  skills: SkillMap;
  tz?: string;
}

/**
 * Represents a micro mission returned to the client.
 */
export interface MissionPayload {
  id: string;
  title: string;
  desc?: string;
  category: 'money' | 'health' | 'peace';
  difficulty: number;
  estSeconds: number;
  xp: number;
  status: 'pending' | 'done' | 'skipped' | 'replaced';
}

/**
 * Acceptable actions when updating a mission.
 */
export type MissionAction = 'done' | 'skip' | 'swap';
