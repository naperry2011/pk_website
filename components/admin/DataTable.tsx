import { View, Text, Pressable, ActivityIndicator, useWindowDimensions, Platform } from "react-native";
import { ReactNode } from "react";
import { FontAwesome } from "@expo/vector-icons";

interface Column {
  key: string;
  label: string;
  render?: (item: any) => ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  onRowPress?: (item: any) => void;
  loading?: boolean;
  emptyMessage?: string;
}

export function DataTable({
  data,
  columns,
  onRowPress,
  loading = false,
  emptyMessage = "No items found",
}: DataTableProps) {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  if (loading) {
    return (
      <View className="py-12 items-center justify-center">
        <ActivityIndicator size="large" color="#d4a843" />
      </View>
    );
  }

  if (data.length === 0) {
    return (
      <View className="py-12 items-center justify-center">
        <FontAwesome name="inbox" size={40} color="#2d2d2d66" />
        <Text className="font-body text-base text-gray-charcoal/50 mt-3">
          {emptyMessage}
        </Text>
      </View>
    );
  }

  if (isMobile) {
    return (
      <View className="gap-3">
        {data.map((item, index) => (
          <Pressable
            key={item.id ?? index}
            onPress={() => onRowPress?.(item)}
            className="bg-white rounded-xl p-4 border border-gray-warm active:bg-gray-warm"
            style={Platform.OS === "web" ? { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)" } : undefined}
            accessibilityRole={onRowPress ? "button" : undefined}
          >
            {columns.map((col) => (
              <View key={col.key} className="flex-row items-center py-1">
                <Text className="font-body-medium text-sm text-gray-charcoal/60 w-28">
                  {col.label}
                </Text>
                <View className="flex-1">
                  {col.render ? (
                    col.render(item)
                  ) : (
                    <Text className="font-body text-sm text-gray-charcoal">
                      {item[col.key] ?? "-"}
                    </Text>
                  )}
                </View>
              </View>
            ))}
          </Pressable>
        ))}
      </View>
    );
  }

  return (
    <View
      className="bg-white rounded-xl border border-gray-warm overflow-hidden"
      style={Platform.OS === "web" ? { boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.04)" } : undefined}
    >
      {/* Header Row */}
      <View className="flex-row bg-gray-warm/50 border-b border-gray-warm px-4 py-3">
        {columns.map((col) => (
          <Text
            key={col.key}
            className="font-body-semibold text-sm text-gray-charcoal flex-1"
          >
            {col.label}
          </Text>
        ))}
      </View>

      {/* Data Rows */}
      {data.map((item, index) => (
        <Pressable
          key={item.id ?? index}
          onPress={() => onRowPress?.(item)}
          className={`flex-row px-4 py-3 items-center ${
            index < data.length - 1 ? "border-b border-gray-warm" : ""
          } ${onRowPress ? "hover:bg-gray-warm/30 active:bg-gray-warm/50" : ""}`}
          style={({ hovered }: any) => [
            Platform.OS === "web" ? { transition: "background-color 0.2s ease" } : undefined,
            Platform.OS === "web" && hovered ? { backgroundColor: "#f5f2eb80" } : undefined,
          ]}
          accessibilityRole={onRowPress ? "button" : undefined}
        >
          {columns.map((col) => (
            <View key={col.key} className="flex-1">
              {col.render ? (
                col.render(item)
              ) : (
                <Text className="font-body text-sm text-gray-charcoal">
                  {item[col.key] ?? "-"}
                </Text>
              )}
            </View>
          ))}
        </Pressable>
      ))}
    </View>
  );
}
