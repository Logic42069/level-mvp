import { z } from 'zod';

/**
 * Zod schema for a user profile input.  The mobile client and API both rely on this
 * schema to validate data.  All fields except `skills` are optional.  Percentages
 * should sum to 100 on the client side but are not enforced here.
 */
export const profileInputSchema = z.object({
  age: z.number().int().min(0).max(120).optional(),
  heightCm: z.number().int().min(50).max(300).optional(),
  weightKg: z.number().min(20).max(300).optional(),
  workStatus: z.string().optional(),
  incomeBand: z.string().optional(),
  focusMoney: z.number().int().min(0).max(100).optional(),
  focusHealth: z.number().int().min(0).max(100).optional(),
  focusPeace: z.number().int().min(0).max(100).optional(),
  skills: z.record(z.string(), z.number().int().min(0).max(10)),
  tz: z.string().optional()
});

/**
 * Zod schema for the mission action endpoint.  Accepts one of the allowed actions
 * and an optional mood score between 0 and 10.
 */
export const missionActionSchema = z.object({
  action: z.enum(['done', 'skip', 'swap']),
  mood: z.number().int().min(0).max(10).optional()
});

export type ProfileInput = z.infer<typeof profileInputSchema>;
export type MissionActionInput = z.infer<typeof missionActionSchema>;
