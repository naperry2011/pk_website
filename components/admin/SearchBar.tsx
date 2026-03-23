import { View, TextInput, Platform } from "react-native";
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
    <View
      className="flex-row items-center bg-white rounded-lg px-3 min-h-[44px]"
      style={[
        { borderWidth: 1, borderColor: "rgba(212, 168, 67, 0.15)" },
        Platform.OS === "web" ? { boxShadow: "0px 1px 4px rgba(0, 0, 0, 0.04)", transition: "border-color 0.2s ease, box-shadow 0.2s ease" } : undefined,
      ]}
    >
      <FontAwesome name="search" size={16} color="#6b6b6b" />
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#6b6b6bAA"
        accessibilityLabel={placeholder}
        className="flex-1 ml-2 py-2 font-body text-base text-gray-charcoal"
      />
    </View>
  );
}
