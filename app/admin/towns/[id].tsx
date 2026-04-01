import { View, ScrollView, Text, Pressable, ActivityIndicator, Platform, Image } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { useTown, useUpdateTown } from "@/hooks/useTowns";
import { useTownPhotos, useAddTownPhoto, useDeleteTownPhoto } from "@/hooks/useTownPhotos";
import { useUpload } from "@/hooks/useUpload";
import { useResponsive } from "@/hooks/useResponsive";

export default function EditTown() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: town, isLoading } = useTown(id!);
  const updateTown = useUpdateTown();
  const { isMobile } = useResponsive();
  const { data: photos = [] } = useTownPhotos(id!);
  const addTownPhoto = useAddTownPhoto();
  const deleteTownPhoto = useDeleteTownPhoto();
  const upload = useUpload();

  const [name, setName] = useState("");
  const [chief, setChief] = useState("");
  const [description, setDescription] = useState("");
  const [landmarks, setLandmarks] = useState<string[]>([]);
  const [newLandmark, setNewLandmark] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [deletePhotoId, setDeletePhotoId] = useState<string | null>(null);

  useEffect(() => {
    if (town) {
      setName(town.name);
      setChief(town.chief);
      setDescription(town.description ?? "");
      setLandmarks(town.landmarks ?? []);
      setImageUrl(town.image_url ?? "");
    }
  }, [town]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-warm">
        <ActivityIndicator size="large" color="#d4a843" />
      </View>
    );
  }

  const handleSave = async () => {
    await updateTown.mutateAsync({
      id: id!,
      name,
      chief,
      description: description || null,
      landmarks,
      image_url: imageUrl || null,
    });
    router.back();
  };

  const addLandmark = () => {
    if (newLandmark.trim()) {
      setLandmarks([...landmarks, newLandmark.trim()]);
      setNewLandmark("");
    }
  };

  const removeLandmark = (index: number) => {
    setLandmarks(landmarks.filter((_, i) => i !== index));
  };

  const handleAddPhoto = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];
    setUploadingPhoto(true);
    try {
      const publicUrl = await upload.mutateAsync({
        uri: asset.uri,
        type: asset.mimeType ?? "image/jpeg",
        name: asset.fileName ?? `photo-${Date.now()}.jpg`,
      });
      await addTownPhoto.mutateAsync({
        town_id: id!,
        image_url: publicUrl,
        caption: "",
        display_order: photos.length,
        uploaded_by: null,
      });
    } finally {
      setUploadingPhoto(false);
    }
  };

  const confirmDeletePhoto = async () => {
    if (!deletePhotoId) return;
    await deleteTownPhoto.mutateAsync(deletePhotoId);
    setDeletePhotoId(null);
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[700px] mx-auto w-full">
        <Text style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 3, color: "#d4a843", fontWeight: "700", fontFamily: "Inter_600SemiBold, sans-serif", marginBottom: 8 }}>
          EDIT TOWN
        </Text>
        <H2 className="mb-6">Edit Town</H2>

        <View className="bg-white rounded-xl p-6 md:p-8" style={Platform.OS === "web" ? { boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)", borderWidth: 1, borderColor: "rgba(212, 168, 67, 0.15)", borderRadius: 12, padding: 32 } : undefined}>
          <ImageUpload
            value={imageUrl || undefined}
            onUpload={setImageUrl}
            label="Town Image"
          />

          <Input
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Town name"
          />

          <Input
            label="Chief"
            value={chief}
            onChangeText={setChief}
            placeholder="Chief's name"
          />

          <TextArea
            label="Description"
            value={description}
            onChangeText={setDescription}
            placeholder="Town description..."
            numberOfLines={6}
          />

          {/* Landmarks Editor */}
          <View className="mb-6">
            <Text className="font-body-medium text-gray-charcoal mb-2">
              Landmarks
            </Text>

            {landmarks.map((landmark, index) => (
              <View
                key={index}
                className="flex-row items-center bg-white border border-brown-earth/30 rounded-lg px-3 py-2 mb-2"
              >
                <Text className="font-body text-base text-gray-charcoal flex-1">
                  {landmark}
                </Text>
                <Pressable
                  onPress={() => removeLandmark(index)}
                  className="ml-2 min-w-[44px] min-h-[44px] items-center justify-center"
                  accessibilityRole="button"
                  accessibilityLabel={`Remove ${landmark}`}
                >
                  <FontAwesome name="times-circle" size={18} color="#8B0000" />
                </Pressable>
              </View>
            ))}

            <View className="flex-row items-center gap-2">
              <View className="flex-1">
                <Input
                  value={newLandmark}
                  onChangeText={setNewLandmark}
                  placeholder="Add a landmark..."
                  onSubmitEditing={addLandmark}
                />
              </View>
              <Pressable
                onPress={addLandmark}
                className="bg-green-deep w-11 h-11 rounded-lg items-center justify-center mb-4"
                accessibilityRole="button"
                accessibilityLabel="Add landmark"
              >
                <FontAwesome name="plus" size={16} color="#FFFFFF" />
              </Pressable>
            </View>
          </View>

          {/* Photo Gallery */}
          <View
            className="mb-6 mt-2 rounded-xl p-4 md:p-6 border"
            style={[
              { borderColor: "rgba(212, 168, 67, 0.25)", backgroundColor: "#FDFCF8" },
              Platform.OS === "web"
                ? { boxShadow: "0px 2px 8px rgba(212, 168, 67, 0.1)" }
                : undefined,
            ]}
          >
            <View className="flex-row items-center justify-between mb-4">
              <Text className="font-heading-bold text-base text-gray-charcoal">
                Photo Gallery ({photos.length}/6)
              </Text>
            </View>

            <View
              className="flex-row flex-wrap"
              style={{ gap: 12 }}
            >
              {photos.map((photo) => (
                <View
                  key={photo.id}
                  style={{
                    width: isMobile ? "48%" : "31%",
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: "rgba(212, 168, 67, 0.2)",
                    overflow: "hidden",
                    backgroundColor: "#FFFFFF",
                  }}
                >
                  <View>
                    <Image
                      source={{ uri: photo.image_url }}
                      style={{ width: "100%", height: 120, borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
                      resizeMode="cover"
                      accessibilityLabel={photo.caption || "Town photo"}
                    />
                    <Pressable
                      onPress={() => setDeletePhotoId(photo.id)}
                      className="absolute top-1 right-1 bg-red-kente w-7 h-7 rounded-full items-center justify-center"
                      style={{ elevation: 2 }}
                      accessibilityRole="button"
                      accessibilityLabel="Delete photo"
                    >
                      <FontAwesome name="times" size={13} color="#FFFFFF" />
                    </Pressable>
                  </View>
                  <View className="px-2 py-2">
                    <Input
                      value={photo.caption ?? ""}
                      onChangeText={(text) => {
                        // Caption editing is handled inline; save on blur via addTownPhoto update
                        // Use the update mutation for caption changes
                        addTownPhoto.mutate({
                          town_id: id!,
                          image_url: photo.image_url,
                          caption: text,
                          display_order: photo.display_order,
                          uploaded_by: photo.uploaded_by,
                        });
                      }}
                      placeholder="Add caption..."
                      style={{ fontSize: 12, minHeight: 32, paddingVertical: 4 }}
                    />
                  </View>
                </View>
              ))}
            </View>

            <View className="mt-4">
              <Pressable
                onPress={handleAddPhoto}
                disabled={photos.length >= 6 || uploadingPhoto}
                className="flex-row items-center justify-center py-3 px-4 rounded-lg border-2 border-dashed"
                style={{
                  borderColor: photos.length >= 6 ? "rgba(0,0,0,0.1)" : "rgba(212, 168, 67, 0.4)",
                  backgroundColor: photos.length >= 6 ? "rgba(0,0,0,0.03)" : "rgba(212, 168, 67, 0.05)",
                  opacity: photos.length >= 6 ? 0.5 : 1,
                }}
                accessibilityRole="button"
                accessibilityLabel="Add photo"
              >
                {uploadingPhoto ? (
                  <ActivityIndicator size="small" color="#d4a843" />
                ) : (
                  <>
                    <FontAwesome name="plus" size={14} color={photos.length >= 6 ? "#999" : "#d4a843"} />
                    <Text
                      className="font-body-medium text-sm ml-2"
                      style={{ color: photos.length >= 6 ? "#999" : "#d4a843" }}
                    >
                      Add Photo
                    </Text>
                  </>
                )}
              </Pressable>
            </View>

            <Text className="font-body text-xs text-gray-charcoal/40 mt-3">
              Up to 6 photos per town. Drag to reorder (coming soon).
            </Text>
          </View>

          <ConfirmDialog
            visible={!!deletePhotoId}
            title="Delete Photo"
            message="Are you sure you want to delete this photo? This action cannot be undone."
            confirmLabel="Delete"
            variant="danger"
            onConfirm={confirmDeletePhoto}
            onCancel={() => setDeletePhotoId(null)}
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
              loading={updateTown.isPending}
              disabled={!name || !chief}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
