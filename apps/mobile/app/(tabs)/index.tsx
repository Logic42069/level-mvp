import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MissionPayload } from '../../../../packages/shared/src/types';
import { fetchTodayMissions, actOnMission } from '../../lib/api';
import { MissionCard } from '../../components/MissionCard';

export default function TodayScreen() {
  const [missions, setMissions] = useState<MissionPayload[]>([]);
  const userId = 'demo-user';
  useEffect(() => {
    fetchTodayMissions(userId).then((data) => {
      setMissions(data.missions ?? []);
    });
  }, []);
  const handleAct = async (missionId: string, action: 'done' | 'skip' | 'swap') => {
    await actOnMission(missionId, action);
    // refetch missions
    const data = await fetchTodayMissions(userId);
    setMissions(data.missions ?? []);
  };
  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      {missions.length === 0 ? (
        <Text style={{ fontSize: 16 }}>No missions available.</Text>
      ) : (
        missions.map((mission) => (
          <View key={mission.id} style={{ marginBottom: 12 }}>
            <MissionCard mission={mission} onAct={(action) => handleAct(mission.id, action)} />
          </View>
        ))
      )}
    </ScrollView>
  );
}
