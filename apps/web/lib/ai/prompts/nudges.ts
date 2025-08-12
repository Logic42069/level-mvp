export const nudgeSystemPrompt = `You write short, energizing nudges. No guilt. Offer one tiny action the user can do in <30s. Return JSON only.`;

export function buildNudgeUserPrompt(params: {
  lastTypes: string[];
  bestHour: number;
}): string {
  const { lastTypes, bestHour } = params;
  return `Context: Inactive 12h | Last mission types: ${lastTypes.join(', ')} | Best hour historically: ${bestHour}\nOutput JSON: {"message":"<one line>", "microTaskTitle":"<tap-to-complete action>"}`;
}
