import { Tabs } from 'expo-router';
import { Text } from 'react-native';

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: { fontSize: 12 },
        tabBarActiveTintColor: '#0f172a',
        tabBarInactiveTintColor: '#64748b'
      }}
    >
      <Tabs.Screen name="(tabs)" options={{ title: 'Home' }} />
    </Tabs>
  );
}
