import { View, Pressable, Linking } from "react-native";
import { Body, H3 } from "@/components/ui/Typography";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";

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
    <Card>
      <CardContent>
        <H3 className="mb-4">Helpful Resources</H3>
        <View className="gap-3">
          {resources.map((resource) => (
            <Pressable
              key={resource.title}
              className="flex-row items-start gap-3 p-3 rounded-lg bg-gray-warm/50 hover:bg-gray-warm min-h-[44px]"
              accessibilityRole="button"
              accessibilityLabel={resource.title}
            >
              <View className="w-8 h-8 rounded-full bg-green-deep/10 items-center justify-center mt-0.5">
                <FontAwesome name={resource.icon} size={14} color="#1B4D3E" />
              </View>
              <View className="flex-1">
                <Body className="font-body-semibold text-sm text-gray-charcoal">
                  {resource.title}
                </Body>
                <Body className="text-xs text-gray-charcoal/60">
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
