import { View, Text, Pressable, Platform } from "react-native";
import { Link } from "expo-router";
import { Announcement } from "@/lib/database.types";
import { tokens } from "@/constants/tokens";

const typeConfig: Record<string, { label: string }> = {
  event: { label: "Event" },
  council: { label: "Council" },
  development: { label: "Development" },
  urgent: { label: "Urgent" },
};

const isWeb = Platform.OS === "web";

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

interface AnnouncementCardProps {
  announcement: Announcement;
  /** Renders the large featured tile treatment (first announcement). */
  featured?: boolean;
  isLast?: boolean;
}

export function AnnouncementCard({
  announcement,
  featured = false,
  isLast = false,
}: AnnouncementCardProps) {
  const config = typeConfig[announcement.type] || typeConfig.council;
  const formattedDate = formatDate(announcement.date);

  if (featured) {
    return (
      <Link href="/community/announcements" asChild>
        <Pressable
          className="bg-ink-raised px-8 py-12 md:px-16 md:py-20 mb-0"
          style={
            isWeb ? ({ cursor: "pointer", transition: "background-color 0.4s ease" } as any) : undefined
          }
          accessibilityRole="link"
          accessibilityLabel={`Featured ${announcement.type} announcement: ${announcement.title}`}
        >
          {({ hovered }: any) => (
            <>
              <View className="flex-row items-center gap-4 mb-6">
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                  {formattedDate}
                </Text>
                <Text
                  className={`font-body-medium text-label uppercase tracking-[3px] ${
                    announcement.type === "urgent" ? "text-red-kente" : "text-champagne"
                  }`}
                >
                  {config.label}
                </Text>
              </View>

              <Text
                accessibilityRole="header"
                numberOfLines={3}
                className={`font-display text-title md:text-title-desktop mb-6 max-w-[820px] ${
                  isWeb && hovered ? "text-champagne" : "text-ivory"
                }`}
                style={isWeb ? ({ transition: "color 0.4s ease" } as any) : undefined}
              >
                {announcement.title}
              </Text>

              <Text
                numberOfLines={2}
                className="font-body text-body-lg text-ivory/60 leading-relaxed max-w-[640px]"
              >
                {announcement.excerpt}
              </Text>
            </>
          )}
        </Pressable>
      </Link>
    );
  }

  return (
    <Link href="/community/announcements" asChild>
      <Pressable
        className={`py-6 px-2 border-b border-white/10 ${isLast ? "" : ""}`}
        style={({ hovered }: any) =>
          isWeb
            ? ({
                cursor: "pointer",
                transition: "background-color 0.3s ease",
                backgroundColor: hovered ? tokens.colors.inkRaised : "transparent",
              } as any)
            : undefined
        }
        accessibilityRole="link"
        accessibilityLabel={`${announcement.type} announcement: ${announcement.title}`}
      >
        {({ hovered }: any) => (
          <View className="flex-row items-center justify-between gap-6">
            <View className="flex-1 flex-row items-baseline gap-6 flex-wrap">
              <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 min-w-[110px]">
                {formattedDate}
              </Text>
              <Text
                numberOfLines={2}
                className="font-display text-xl text-ivory flex-1 min-w-[200px]"
              >
                {announcement.title}
              </Text>
            </View>
            <Text
              className="text-champagne text-base"
              style={
                isWeb
                  ? ({
                      transition: "transform 0.3s ease",
                      transform: hovered ? "translateX(4px)" : "translateX(0)",
                    } as any)
                  : undefined
              }
            >
              →
            </Text>
          </View>
        )}
      </Pressable>
    </Link>
  );
}
