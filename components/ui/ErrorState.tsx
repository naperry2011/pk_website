import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
  /** "dark" (default) for ink canvas, "light" for admin surfaces. */
  tone?: "dark" | "light";
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
  tone = "dark",
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20 px-6">
      <FontAwesome name="exclamation-circle" size={48} color="#7A2E2E" />
      <Text
        className={`font-body mt-4 text-base text-center ${
          tone === "dark" ? "text-ivory/60" : "text-gray-charcoal"
        }`}
      >
        {message}
      </Text>
      {onRetry && (
        <View className="mt-6">
          <Button title="Try Again" onPress={onRetry} variant="outline" />
        </View>
      )}
    </View>
  );
}
