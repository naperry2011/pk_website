import { View, ActivityIndicator, Text } from "react-native";
import { tokens } from "@/constants/tokens";

interface LoadingStateProps {
  message?: string;
  /** "dark" (default) for ink canvas, "light" for admin surfaces. */
  tone?: "dark" | "light";
}

export function LoadingState({ message, tone = "dark" }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <ActivityIndicator size="large" color={tokens.colors.champagne} />
      {message && (
        <Text
          className={`font-body mt-4 text-base ${
            tone === "dark" ? "text-ivory/60" : "text-gray-charcoal"
          }`}
        >
          {message}
        </Text>
      )}
    </View>
  );
}
