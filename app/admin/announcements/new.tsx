import { View, ScrollView, Text, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useCreateAnnouncement } from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import type { AnnouncementType } from "@/lib/database.types";

const announcementTypes: { value: AnnouncementType; label: string }[] = [
  { value: "event", label: "Event" },
  { value: "council", label: "Council" },
  { value: "development", label: "Development" },
  { value: "urgent", label: "Urgent" },
];

export default function NewAnnouncement() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<AnnouncementType>("event");
  const [townId, setTownId] = useState<string | null>(null);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const { data: towns } = useTowns();
  const createAnnouncement = useCreateAnnouncement();

  const handleSubmit = async () => {
    await createAnnouncement.mutateAsync({
      title,
      date,
      type,
      town_id: townId,
      excerpt,
      content,
      image_url: imageUrl || null,
      created_by: null,
    });
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-2xl">
        <H2 className="mb-6">New Announcement</H2>

        <Input
          label="Title"
          value={title}
          onChangeText={setTitle}
          placeholder="Announcement title"
        />

        <Input
          label="Date"
          value={date}
          onChangeText={setDate}
          placeholder="YYYY-MM-DD"
        />

        {/* Type Selector */}
        <View className="mb-4">
          <Text className="font-body-medium text-gray-charcoal mb-2">Type</Text>
          <View className="flex-row flex-wrap gap-2">
            {announcementTypes.map((t) => (
              <Pressable
                key={t.value}
                onPress={() => setType(t.value)}
                className={`px-4 py-2 rounded-lg min-h-[44px] items-center justify-center ${
                  type === t.value
                    ? "bg-gold"
                    : "bg-white border border-brown-earth/30"
                }`}
                accessibilityRole="button"
                accessibilityState={{ selected: type === t.value }}
                accessibilityLabel={`Type: ${t.label}`}
              >
                <Text
                  className={`font-body-medium text-sm ${
                    type === t.value ? "text-white" : "text-gray-charcoal"
                  }`}
                >
                  {t.label}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Town Selector */}
        <View className="mb-4">
          <Text className="font-body-medium text-gray-charcoal mb-2">Town</Text>
          <View className="flex-row flex-wrap gap-2">
            <Pressable
              onPress={() => setTownId(null)}
              className={`px-4 py-2 rounded-lg min-h-[44px] items-center justify-center ${
                townId === null
                  ? "bg-green-deep"
                  : "bg-white border border-brown-earth/30"
              }`}
              accessibilityRole="button"
              accessibilityLabel="All towns"
            >
              <Text
                className={`font-body-medium text-sm ${
                  townId === null ? "text-white" : "text-gray-charcoal"
                }`}
              >
                All Towns
              </Text>
            </Pressable>
            {(towns ?? []).map((town) => (
              <Pressable
                key={town.id}
                onPress={() => setTownId(town.id)}
                className={`px-4 py-2 rounded-lg min-h-[44px] items-center justify-center ${
                  townId === town.id
                    ? "bg-green-deep"
                    : "bg-white border border-brown-earth/30"
                }`}
                accessibilityRole="button"
                accessibilityLabel={`Town: ${town.name}`}
              >
                <Text
                  className={`font-body-medium text-sm ${
                    townId === town.id ? "text-white" : "text-gray-charcoal"
                  }`}
                >
                  {town.name}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        <TextArea
          label="Excerpt"
          value={excerpt}
          onChangeText={setExcerpt}
          placeholder="Brief summary..."
        />

        <TextArea
          label="Content"
          value={content}
          onChangeText={setContent}
          placeholder="Full announcement content..."
          numberOfLines={8}
        />

        <ImageUpload
          value={imageUrl || undefined}
          onUpload={setImageUrl}
          label="Cover Image"
        />

        <View className="flex-row gap-3 mt-4">
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
          />
          <Button
            title="Create Announcement"
            onPress={handleSubmit}
            loading={createAnnouncement.isPending}
            disabled={!title || !date || !excerpt}
          />
        </View>
      </View>
    </ScrollView>
  );
}
