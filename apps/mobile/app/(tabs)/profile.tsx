import React from 'react';
import { View, Text } from 'react-native';

export default function ProfileScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 18, fontWeight: '600' }}>Profile</Text>
      <Text style={{ marginTop: 8 }}>Profile editing is coming soon.</Text>
    </View>
  );
}
