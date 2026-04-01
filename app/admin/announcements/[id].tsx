import { View, ScrollView, Text, Pressable, ActivityIndicator, Platform } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import {
  useAnnouncement,
  useUpdateAnnouncement,
  useDeleteAnnouncement,
} from "@/hooks/useAnnouncements";
import { useTowns } from "@/hooks/useTowns";
import { useResponsive } from "@/hooks/useResponsive";
import type { AnnouncementType } from "@/lib/database.types";

const announcementTypes: { value: AnnouncementType; label: string }[] = [
  { value: "event", label: "Event" },
  { value: "council", label: "Council" },
  { value: "development", label: "Development" },
  { value: "urgent", label: "Urgent" },
];

export default function EditAnnouncement() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: announcement, isLoading } = useAnnouncement(id!);
  const updateAnnouncement = useUpdateAnnouncement();
  const deleteAnnouncement = useDeleteAnnouncement();
  const { data: towns } = useTowns();
  const { isMobile } = useResponsive();

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [type, setType] = useState<AnnouncementType>("event");
  const [townId, setTownId] = useState<string | null>(null);
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [showDelete, setShowDelete] = useState(false);

  useEffect(() => {
    if (announcement) {
      setTitle(announcement.title);
      setDate(announcement.date);
      setType(announcement.type);
      setTownId(announcement.town_id);
      setExcerpt(announcement.excerpt);
      setContent(announcement.content ?? "");
      setImageUrl(announcement.image_url ?? "");
    }
  }, [announcement]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-warm">
        <ActivityIndicator size="large" color="#d4a843" />
      </View>
    );
  }

  const handleSave = async () => {
    await updateAnnouncement.mutateAsync({
      id: id!,
      title,
      date,
      type,
      town_id: townId,
      excerpt,
      content,
      image_url: imageUrl || null,
    });
    router.back();
  };

  const handleDelete = async () => {
    await deleteAnnouncement.mutateAsync(id!);
    setShowDelete(false);
    router.back();
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[700px] mx-auto w-full">
        <Text style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 3, color: "#d4a843", fontWeight: "700", fontFamily: "Inter_600SemiBold, sans-serif", marginBottom: 8 }}>
          EDIT ANNOUNCEMENT
        </Text>
        <H2 className="mb-6">Edit Announcement</H2>

        <View className="bg-white rounded-xl p-6 md:p-8" style={Platform.OS === "web" ? { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)", borderWidth: 1, borderColor: "rgba(212, 168, 67, 0.15)", borderRadius: 12, padding: 32 } : undefined}>
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
          <View className="mb-6">
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
          <View className="mb-6">
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

          <View className="flex-row gap-3 mt-6">
            <Button
              title="Cancel"
              onPress={() => router.back()}
              variant="outline"
            />
            <Button
              title="Save Changes"
              onPress={handleSave}
              loading={updateAnnouncement.isPending}
              disabled={!title || !date || !excerpt}
            />
          </View>

          {/* Delete Section */}
          <View className="border-t border-gray-warm pt-6 mt-6">
            <Button
              title="Delete"
              onPress={() => setShowDelete(true)}
              variant="danger"
            />
          </View>
        </View>
      </View>

      <ConfirmDialog
        visible={showDelete}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement? This cannot be undone."
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setShowDelete(false)}
      />
    </ScrollView>
  );
}
