import { View, Text, Pressable, ScrollView, Platform } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import { tokens } from "@/constants/tokens";

const isWeb = Platform.OS === "web";

const ALL_TOWNS = [
  "Akropong", "Abiriw", "Amanokrom", "Awukugua", "Berekuso",
  "Tutu", "Mamfe", "Larteh", "Adukrom", "Mampong",
  "Obosomase", "Apirede", "Aseseeso", "Dawu", "Koforidua",
  "Nsawam", "Suhum",
];

interface TownFilterDropdownProps {
  selectedTown: string;
  onSelectTown: (town: string) => void;
}

export function TownFilterDropdown({ selectedTown, onSelectTown }: TownFilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const displayLabel = selectedTown || "All Towns";

  return (
    <View className="mb-10 z-10 max-w-xs">
      <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mb-3">
        Filter by Town
      </Text>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between py-3 border-b border-white/20 min-h-[44px]"
        style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
        accessibilityRole="button"
        accessibilityLabel={`Filter by town: ${displayLabel}`}
      >
        <Text className="font-body text-base text-ivory">{displayLabel}</Text>
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={12}
          color={tokens.colors.champagne}
        />
      </Pressable>

      {isOpen && (
        <View className="bg-ink-raised border border-white/10 mt-2 max-h-[300px]">
          <ScrollView>
            <Pressable
              onPress={() => {
                onSelectTown("");
                setIsOpen(false);
              }}
              className="px-4 py-3 border-b border-white/10 min-h-[44px] justify-center"
              style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
              accessibilityRole="button"
              accessibilityLabel="All Towns"
            >
              <Text
                className={`font-body text-sm ${
                  !selectedTown ? "text-champagne" : "text-ivory/70"
                }`}
              >
                All Towns
              </Text>
            </Pressable>
            {ALL_TOWNS.map((town) => (
              <Pressable
                key={town}
                onPress={() => {
                  onSelectTown(town);
                  setIsOpen(false);
                }}
                className="px-4 py-3 border-b border-white/10 min-h-[44px] justify-center"
                style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                accessibilityRole="button"
                accessibilityLabel={town}
              >
                <Text
                  className={`font-body text-sm ${
                    selectedTown === town ? "text-champagne" : "text-ivory/70"
                  }`}
                >
                  {town}
                </Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
