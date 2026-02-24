import "../global.css";
import { View, Text, ActivityIndicator } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { ThemeProvider, DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";
import {
  PlayfairDisplay_400Regular,
  PlayfairDisplay_700Bold,
} from "@expo-google-fonts/playfair-display";
import {
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
} from "@expo-google-fonts/inter";
import { Cinzel_400Regular } from "@expo-google-fonts/cinzel";

export { ErrorBoundary } from "expo-router";
import { AppErrorBoundary } from "@/components/ui/ErrorBoundary";

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

const AkuapemTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#D4AF37", // Royal Gold
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#2C3E50", // Charcoal
    border: "#8B4513", // Earth Brown
    notification: "#8B0000", // Kente Red
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    PlayfairDisplay_400Regular,
    PlayfairDisplay_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Cinzel_400Regular,
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return (
      <View className="flex-1 bg-green-deep items-center justify-center">
        <View className="w-20 h-20 bg-gold rounded-full items-center justify-center mb-4">
          <Text className="text-white font-bold text-2xl">AK</Text>
        </View>
        <ActivityIndicator size="small" color="#D4AF37" />
      </View>
    );
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AppErrorBoundary>
      <ThemeProvider value={AkuapemTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </AppErrorBoundary>
  );
}
