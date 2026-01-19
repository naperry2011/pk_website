import { Stack } from "expo-router";

export default function CommunityLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="obituaries" />
      <Stack.Screen name="weddings" />
      <Stack.Screen name="announcements" />
    </Stack>
  );
}
