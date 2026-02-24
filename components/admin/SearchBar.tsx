import { View, TextInput } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
}

export function SearchBar({
  value,
  onChangeText,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <View className="flex-row items-center bg-white border border-brown-earth/30 rounded-lg px-3 min-h-[44px]">
      <FontAwesome name="search" size={16} color="#2C3E5066" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#2C3E50AA"
        accessibilityLabel={placeholder}
        className="flex-1 ml-2 py-2 font-body text-base text-gray-charcoal"
      />
    </View>
  );
}
