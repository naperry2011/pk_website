import { Link, Stack } from "expo-router";
import { View, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Page Not Found" }} />
      <View className="flex-1 bg-gray-warm items-center justify-center px-6">
        <View className="w-24 h-24 bg-gold/10 rounded-full items-center justify-center mb-6">
          <FontAwesome name="compass" size={48} color="#D4AF37" />
        </View>

        <Text className="font-heading-bold text-3xl text-gray-charcoal text-center mb-3">
          Page Not Found
        </Text>

        <Text className="font-body text-base text-gray-charcoal/70 text-center mb-8 max-w-md leading-relaxed">
          The page you are looking for may have been moved or no longer exists.
          Please return to the homepage to continue exploring.
        </Text>

        <Link href="/" asChild>
          <View className="bg-gold px-8 py-4 rounded-lg">
            <Text className="font-body-semibold text-white text-base">
              Return to Homepage
            </Text>
          </View>
        </Link>

        <View className="mt-12 items-center">
          <View className="w-12 h-12 bg-green-deep rounded-full items-center justify-center mb-2">
            <Text className="text-white font-bold text-sm">AK</Text>
          </View>
          <Text className="font-body text-xs text-gray-charcoal/50">
            Akuapem Paramount King Council
          </Text>
        </View>
      </View>
    </>
  );
}
