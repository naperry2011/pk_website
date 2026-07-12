import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import { Announcement } from "@/lib/database.types";

const typeConfig: Record<string, { label: string }> = {
  event: { label: "Event" },
  council: { label: "Council" },
  development: { label: "Development" },
  urgent: { label: "Urgent" },
};

const isWeb = Platform.OS === "web";

interface AnnouncementCardProps {
  announcement: Announcement;
  isLast?: boolean;
}

export function AnnouncementCard({ announcement, isLast = false }: AnnouncementCardProps) {
  const config = typeConfig[announcement.type] || typeConfig.council;
  const formattedDate = new Date(announcement.date).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <Link href="/community/announcements" asChild>
      <Pressable
        className={`py-6 ${isLast ? "" : "border-b border-gray-charcoal/10"}`}
        style={
          isWeb ? ({ cursor: "pointer", transition: "all 0.2s ease" } as any) : undefined
        }
        accessibilityLabel={`${announcement.type} announcement: ${announcement.title}`}
      >
        {({ hovered }: any) => (
          <>
            {/* Meta row: date + category tag */}
            <View className="flex-row items-center gap-4 mb-2">
              <Text className="font-body text-sm text-gray-muted">
                {formattedDate}
              </Text>
              <Text
                className={`font-accent text-xs uppercase tracking-widest ${
                  announcement.type === "urgent" ? "text-red-kente" : "text-gold"
                }`}
              >
                {config.label}
              </Text>
            </View>

            {/* Serif headline */}
            <Text
              numberOfLines={2}
              className={`font-heading-bold text-xl md:text-2xl mb-2 ${
                isWeb && hovered ? "text-green-deep" : "text-gray-charcoal"
              }`}
            >
              {announcement.title}
            </Text>

            <Text
              numberOfLines={2}
              className="font-body text-base text-gray-muted leading-6"
            >
              {announcement.excerpt}
            </Text>
          </>
        )}
      </Pressable>
    </Link>
  );
}
