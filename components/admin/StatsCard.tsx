import { View, Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <View className="bg-white rounded-xl p-4 border border-gray-warm flex-1 min-w-[140px]">
      <View className="flex-row items-center justify-between mb-2">
        <View
          className="w-10 h-10 rounded-lg items-center justify-center"
          style={{ backgroundColor: color + "20" }}
        >
          <FontAwesome name={icon as any} size={18} color={color} />
        </View>
      </View>
      <Text className="font-heading-bold text-2xl text-gray-charcoal">
        {value}
      </Text>
      <Text className="font-body text-sm text-gray-charcoal/60 mt-1">
        {title}
      </Text>
    </View>
  );
}
