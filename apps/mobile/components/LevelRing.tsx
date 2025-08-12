import React from 'react';
import { View, Text } from 'react-native';

interface Props {
  level: number;
  xp: number;
}

/**
 * A simple placeholder component for the level ring.  In the MVP this could be
 * replaced with a circular progress indicator showing the current level and
 * XP bar.
 */
export function LevelRing({ level, xp }: Props) {
  return (
    <View style={{ alignItems: 'center', marginVertical: 16 }}>
      <Text style={{ fontSize: 32, fontWeight: '700' }}>Lvl {level}</Text>
      <Text style={{ fontSize: 14, color: '#475569' }}>{xp} XP</Text>
    </View>
  );
}
