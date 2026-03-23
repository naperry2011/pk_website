import { View, Text, Platform } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: string;
  color: string;
}

export function StatsCard({ title, value, icon, color }: StatsCardProps) {
  return (
    <View
      className="bg-white rounded-xl p-5 flex-1 min-w-[140px]"
      style={Platform.OS === "web" ? { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)", borderColor: "rgba(212, 168, 67, 0.15)", borderWidth: 1, borderRadius: 12 } : undefined}
    >
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
