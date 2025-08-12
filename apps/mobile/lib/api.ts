// Simple API client for the LEVEL mobile app.  This module defines helper
// functions for communicating with the Next.js backend.  All functions
// assume the backend is deployed at the URL specified by the
// EXPO_PUBLIC_API_BASE environment variable.

const API_BASE = process.env.EXPO_PUBLIC_API_BASE || 'http://localhost:3000';

export async function fetchTodayMissions(userId: string) {
  const res = await fetch(`${API_BASE}/api/missions/today?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`Failed to fetch missions: ${res.status}`);
  return res.json();
}

export async function actOnMission(id: string, action: 'done' | 'skip' | 'swap', mood?: number) {
  const res = await fetch(`${API_BASE}/api/missions/${id}/act`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, mood })
  });
  if (!res.ok) throw new Error(`Failed to act on mission: ${res.status}`);
  return res.json();
}

export async function onboard(profile: any) {
  const res = await fetch(`${API_BASE}/api/onboard`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profile })
  });
  if (!res.ok) throw new Error(`Failed to onboard: ${res.status}`);
  return res.json();
}

export async function fetchProgress(userId: string) {
  const res = await fetch(`${API_BASE}/api/progress?userId=${encodeURIComponent(userId)}`);
  if (!res.ok) throw new Error(`Failed to fetch progress: ${res.status}`);
  return res.json();
}
