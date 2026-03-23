import { View, Text, Pressable, StyleSheet, Platform } from "react-native";
import { Link } from "expo-router";
import { PlaceholderImage } from "@/components/ui/PlaceholderImage";
import { Announcement } from "@/lib/database.types";

const typeConfig: Record<string, { label: string; bgColor: string }> = {
  event: { label: "Event", bgColor: "#d4a843" },
  council: { label: "Council", bgColor: "#1E4D8B" },
  development: { label: "Development", bgColor: "#1a5632" },
  urgent: { label: "Urgent", bgColor: "#8B0000" },
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const config = typeConfig[announcement.type] || typeConfig.council;
  const formattedDate = new Date(announcement.date).toLocaleDateString(
    "en-GB",
    { day: "numeric", month: "short", year: "numeric" }
  );

  return (
    <Link href="/community/announcements" asChild>
      <Pressable
        style={({ hovered }: any) => [
          styles.card,
          hovered && styles.cardHover,
        ]}
        accessibilityLabel={`${announcement.type} announcement: ${announcement.title}`}
      >
        {/* Image area */}
        <PlaceholderImage height={180} label="Event Photo" borderRadius={0} />

        {/* Content */}
        <View style={styles.content}>
          {/* Category badge */}
          <View style={[styles.badge, { backgroundColor: config.bgColor }]}>
            <Text style={styles.badgeText}>{config.label}</Text>
          </View>

          <Text style={styles.title} numberOfLines={2}>
            {announcement.title}
          </Text>
          <Text style={styles.excerpt} numberOfLines={3}>
            {announcement.excerpt}
          </Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#e8e8e8",
    ...(Platform.OS === "web"
      ? {
          transition: "all 0.3s ease",
          cursor: "pointer",
        }
      : {}),
  } as any,
  cardHover: {
    transform: [{ translateY: -6 }],
    boxShadow: "0px 12px 24px rgba(0, 0, 0, 0.15)",
    borderColor: "rgba(212, 168, 67, 0.3)",
  },
  content: {
    padding: 20,
  },
  badge: {
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold, sans-serif",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  excerpt: {
    fontSize: 15,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 22,
    marginBottom: 12,
  },
  date: {
    fontSize: 13,
    color: "#aaaaaa",
    fontFamily: "Inter_400Regular, sans-serif",
  },
});
