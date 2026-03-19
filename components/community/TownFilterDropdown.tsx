import { View, Pressable, ScrollView } from "react-native";
import { useState } from "react";
import { Body } from "@/components/ui/Typography";
import { FontAwesome } from "@expo/vector-icons";

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
    <View className="mb-4 z-10">
      <Body className="font-body-medium text-gray-charcoal mb-2">Filter by Town</Body>
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        className="flex-row items-center justify-between px-4 py-3 bg-white border border-brown-earth/30 rounded-lg min-h-[44px]"
        accessibilityRole="button"
        accessibilityLabel={`Filter by town: ${displayLabel}`}
      >
        <Body className="text-gray-charcoal">{displayLabel}</Body>
        <FontAwesome
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={14}
          color="#2C3E50"
        />
      </Pressable>

      {isOpen && (
        <View className="bg-white border border-brown-earth/20 rounded-lg mt-1 shadow-md max-h-[300px]">
          <ScrollView>
            <Pressable
              onPress={() => {
                onSelectTown("");
                setIsOpen(false);
              }}
              className={`px-4 py-3 border-b border-brown-earth/10 min-h-[44px] justify-center ${
                !selectedTown ? "bg-gold/10" : ""
              }`}
            >
              <Body className={!selectedTown ? "text-gold font-body-semibold" : "text-gray-charcoal"}>
                All Towns
              </Body>
            </Pressable>
            {ALL_TOWNS.map((town) => (
              <Pressable
                key={town}
                onPress={() => {
                  onSelectTown(town);
                  setIsOpen(false);
                }}
                className={`px-4 py-3 border-b border-brown-earth/10 min-h-[44px] justify-center ${
                  selectedTown === town ? "bg-gold/10" : ""
                }`}
              >
                <Body className={selectedTown === town ? "text-gold font-body-semibold" : "text-gray-charcoal"}>
                  {town}
                </Body>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
}
