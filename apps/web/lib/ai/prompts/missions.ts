export const missionSystemPrompt = `You are a coach that designs 30–90 second micro‑missions that compound. Never assign more than 5 per day. Prefer actions over reading. Make them specific, measurable, and phone‑friendly. Respect user constraints and time‑of‑day. Avoid repeats within 3 days. Include exactly one “instant win” (<45s).`;

export function buildMissionUserPrompt(params: {
  age?: number;
  workStatus?: string;
  focusMoney: number;
  focusHealth: number;
  focusPeace: number;
  skills: Record<string, number>;
  history: any[];
  localTime: string;
  window: string;
}): string {
  const { age, workStatus, focusMoney, focusHealth, focusPeace, skills, history, localTime, window } = params;
  const skillsJson = JSON.stringify(skills);
  const historyJson = JSON.stringify(history);
  return `User snapshot:\nAge: ${age ?? ''} | Work: ${workStatus ?? ''} | Focus: Money ${focusMoney}% / Health ${focusHealth}% / Peace ${focusPeace}%\nSkills(0–10): ${skillsJson}\nHistory(3d): ${historyJson}\nTime now: ${localTime} | Best window next 3h: ${window}\nNeed: 3–5 micro missions with {title, one_line_instruction, category, difficulty 0.8–1.4, estSeconds, xp}\nConstraints: no equipment unless specified; one instant_win.\nOutput: JSON array only.`;
}
