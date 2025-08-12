import React from 'react';
import { View, Text, Button } from 'react-native';
import { MissionPayload } from '../../../packages/shared/src/types';

interface Props {
  mission: MissionPayload;
  onAct: (action: 'done' | 'skip' | 'swap') => void;
}

export function MissionCard({ mission, onAct }: Props) {
  return (
    <View
      style={{
        padding: 16,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        shadowColor: '#000',
        shadowOpacity: 0.05,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 2 }
      }}
    >
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 4 }}>{mission.title}</Text>
      {mission.desc ? (
        <Text style={{ marginBottom: 8, color: '#475569' }}>{mission.desc}</Text>
      ) : null}
      <View style={{ flexDirection: 'row', gap: 8 }}>
        <Button title="Done" onPress={() => onAct('done')} />
        <Button title="Swap" onPress={() => onAct('swap')} />
        <Button title="Later" onPress={() => onAct('skip')} />
      </View>
    </View>
  );
}
