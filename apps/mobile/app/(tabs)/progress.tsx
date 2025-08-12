import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { fetchProgress } from '../../lib/api';
import { LevelRing } from '../../components/LevelRing';

export default function ProgressScreen() {
  const userId = 'demo-user';
  const [progress, setProgress] = useState<any>(null);
  useEffect(() => {
    fetchProgress(userId).then((data) => setProgress(data)).catch(() => setProgress(null));
  }, []);
  if (!progress) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading progress…</Text>
      </View>
    );
  }
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <LevelRing level={progress.level} xp={progress.totalXp} />
      <View style={{ marginTop: 16 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Category splits</Text>
        {Object.entries(progress.categorySplits).map(([cat, pct]) => (
          <Text key={cat} style={{ fontSize: 14, marginBottom: 4 }}>
            {cat}: {pct}%
          </Text>
        ))}
      </View>
    </ScrollView>
  );
}
