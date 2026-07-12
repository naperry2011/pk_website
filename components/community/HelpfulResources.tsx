import { View, Pressable, Platform } from "react-native";
import { Body, Eyebrow, H3 } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";
import { theme } from "@/constants/theme";

const isWeb = Platform.OS === "web";

const resources = [
  {
    title: "Akuapem Traditional Council Office",
    description: "For official inquiries and submissions",
    icon: "institution" as const,
  },
  {
    title: "Community Event Guidelines",
    description: "Rules for event submissions and announcements",
    icon: "book" as const,
  },
  {
    title: "Funeral Planning Resources",
    description: "Traditional funeral customs and arrangements",
    icon: "heart" as const,
  },
  {
    title: "Marriage Registry Information",
    description: "Requirements for traditional marriage registration",
    icon: "file-text" as const,
  },
  {
    title: "Contact the Council",
    description: "Reach out for assistance or inquiries",
    icon: "phone" as const,
  },
];

export function HelpfulResources() {
  return (
    <Card goldBorder className="p-6">
      <CardContent>
        <Eyebrow className="mb-1">Guidance</Eyebrow>
        <H3 className="mb-2">Helpful Resources</H3>
        <View className="w-10 h-[2px] bg-gold mb-5" />
        <View className="gap-1">
          {resources.map((resource, index) => (
            <Pressable
              key={resource.title}
              className={`flex-row items-start gap-3 py-3 min-h-[44px] ${
                index < resources.length - 1 ? "border-b border-gray-charcoal/10" : ""
              }`}
              style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
              accessibilityRole="button"
              accessibilityLabel={resource.title}
            >
              <View className="w-8 h-8 rounded-full bg-green-deep/10 items-center justify-center mt-0.5">
                <FontAwesome name={resource.icon} size={14} color={theme.colors.primaryGreen} />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold text-sm text-gray-charcoal">
                  {resource.title}
                </Body>
                <Body className="text-xs text-gray-muted">
                  {resource.description}
                </Body>
              </View>
            </Pressable>
          ))}
        </View>
      </CardContent>
    </Card>
  );
}
