import { View, ActivityIndicator, Text } from "react-native";

interface LoadingStateProps {
  message?: string;
}

export function LoadingState({ message }: LoadingStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-20">
      <ActivityIndicator size="large" color="#D4AF37" />
      {message && (
        <Text className="font-body text-gray-charcoal mt-4 text-base">
          {message}
        </Text>
      )}
    </View>
  );
}
