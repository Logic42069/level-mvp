import OpenAI from 'openai';
import { missionSystemPrompt, buildMissionUserPrompt } from './prompts/missions';
import { nudgeSystemPrompt, buildNudgeUserPrompt } from './prompts/nudges';

/**
 * Initialise a single OpenAI client.  The API key must be set via
 * the `OPENAI_API_KEY` environment variable.  This file wraps calls to
 * the OpenAI chat API and parses the JSON output into native types.
 */
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY ?? '' });

export interface MissionAIRequest {
  age?: number;
  workStatus?: string;
  focusMoney: number;
  focusHealth: number;
  focusPeace: number;
  skills: Record<string, number>;
  history: any[];
  localTime: string;
  window: string;
}

export async function generateMissions(req: MissionAIRequest) {
  const userPrompt = buildMissionUserPrompt(req);
  const messages = [
    { role: 'system' as const, content: missionSystemPrompt },
    { role: 'user' as const, content: userPrompt }
  ];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    response_format: { type: 'json_object' }
  });
  const content = response.choices[0].message?.content;
  if (!content) throw new Error('No content returned from OpenAI');
  return JSON.parse(content);
}

export interface NudgeAIRequest {
  lastTypes: string[];
  bestHour: number;
}

export async function generateNudge(req: NudgeAIRequest) {
  const userPrompt = buildNudgeUserPrompt(req);
  const messages = [
    { role: 'system' as const, content: nudgeSystemPrompt },
    { role: 'user' as const, content: userPrompt }
  ];
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages,
    response_format: { type: 'json_object' }
  });
  const content = response.choices[0].message?.content;
  if (!content) throw new Error('No content returned from OpenAI');
  return JSON.parse(content);
}
