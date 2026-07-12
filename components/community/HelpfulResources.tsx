import { View, Text, Pressable, Platform } from "react-native";
import { Label } from "@/components/ui/Typography";

const isWeb = Platform.OS === "web";

const resources = [
  {
    title: "Akuapem Traditional Council Office",
    description: "For official inquiries and submissions",
  },
  {
    title: "Community Event Guidelines",
    description: "Rules for event submissions and announcements",
  },
  {
    title: "Funeral Planning Resources",
    description: "Traditional funeral customs and arrangements",
  },
  {
    title: "Marriage Registry Information",
    description: "Requirements for traditional marriage registration",
  },
  {
    title: "Contact the Council",
    description: "Reach out for assistance or inquiries",
  },
];

export function HelpfulResources() {
  return (
    <View>
      <Label className="text-ivory/50 mb-6">Helpful Resources</Label>
      <View className="border-t border-white/10">
        {resources.map((resource) => (
          <Pressable
            key={resource.title}
            className="py-4 border-b border-white/10 min-h-[44px] justify-center"
            style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
            accessibilityRole="button"
            accessibilityLabel={resource.title}
          >
            {({ hovered }: any) => (
              <>
                <Text
                  className={`font-body-medium text-sm ${
                    hovered && isWeb ? "text-champagne" : "text-ivory/80"
                  }`}
                  style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                >
                  {resource.title}
                </Text>
                <Text className="font-body text-xs text-ivory/40 mt-1">
                  {resource.description}
                </Text>
              </>
            )}
          </Pressable>
        ))}
      </View>
    </View>
  );
}
