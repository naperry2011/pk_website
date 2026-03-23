import { View, ScrollView, Text, Image, Platform } from "react-native";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Card } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { useTowns } from "@/hooks/useTowns";
import { ActivityIndicator } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";

export default function TownsList() {
  const { isMobile } = useResponsive();
  const { data: towns, isLoading } = useTowns();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-warm">
        <ActivityIndicator size="large" color="#d4a843" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[1200px] mx-auto w-full">
        <Text style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 3, color: "#d4a843", fontWeight: "700", fontFamily: "Inter_600SemiBold, sans-serif", marginBottom: 8 }}>
          DIRECTORY
        </Text>
        <H2 className="mb-8">Towns</H2>

        <View
          className={`gap-3 ${isMobile ? "flex-col" : "flex-row flex-wrap"}`}
        >
          {(towns ?? []).map((town) => (
            <View
              key={town.id}
              style={!isMobile ? { width: "31%" } : undefined}
            >
              <Card
                onPress={() => router.push(`/admin/towns/${town.id}`)}
                accessibilityLabel={`Edit ${town.name}`}
                accessibilityHint="Opens town editor"
              >
                {town.image_url ? (
                  <Image
                    source={{ uri: town.image_url }}
                    className="w-full h-32 rounded-lg mb-3"
                    resizeMode="cover"
                  />
                ) : (
                  <View className="w-full h-32 rounded-lg mb-3 bg-gray-warm items-center justify-center">
                    <FontAwesome name="image" size={28} color="#6b6b6b33" />
                  </View>
                )}
                <Text className="font-heading-bold text-base text-gray-charcoal">
                  {town.name}
                </Text>
                <Text className="font-body text-sm text-gray-charcoal/60 mt-1">
                  Chief: {town.chief}
                </Text>
              </Card>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
