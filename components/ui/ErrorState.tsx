import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Button } from "./Button";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export function ErrorState({
  message = "Something went wrong. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20 px-6">
      <FontAwesome name="exclamation-circle" size={48} color="#8B0000" />
      <Text className="font-body text-gray-charcoal mt-4 text-base text-center">
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
