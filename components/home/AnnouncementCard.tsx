import { View, Text } from "react-native";
import { Link } from "expo-router";
import { Card, CardHeader, CardContent } from "../ui/Card";
import { H4, Body } from "../ui/Typography";
import { FontAwesome } from "@expo/vector-icons";
import { Announcement } from "@/types";

const typeConfig = {
  event: { icon: "calendar", color: "#D4AF37" },
  council: { icon: "gavel", color: "#1B4D3E" },
  development: { icon: "building", color: "#1E4D8B" },
  urgent: { icon: "exclamation-circle", color: "#8B0000" },
};

interface AnnouncementCardProps {
  announcement: Announcement;
}

export function AnnouncementCard({ announcement }: AnnouncementCardProps) {
  const config = typeConfig[announcement.type];
  const formattedDate = new Date(announcement.date).toLocaleDateString(
    "en-GB",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  );

  return (
    <Link href={`/community/announcements`} asChild>
      <Card className="mb-4">
        <CardHeader>
          <View className="flex-row items-center gap-2 mb-2">
            <FontAwesome name={config.icon as any} size={16} color={config.color} />
            <Text
              className="font-body-medium text-sm uppercase tracking-wide"
              style={{ color: config.color }}
            >
              {announcement.type}
            </Text>
          </View>
          <H4>{announcement.title}</H4>
        </CardHeader>
        <CardContent>
          <Body className="mb-3">{announcement.excerpt}</Body>
          <Text className="font-body text-sm text-gray-charcoal/60">
            {formattedDate}
          </Text>
        </CardContent>
      </Card>
    </Link>
  );
}
