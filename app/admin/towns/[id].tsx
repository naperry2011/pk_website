import { View, ScrollView, Text, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { router, useLocalSearchParams } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { ImageUpload } from "@/components/admin/ImageUpload";
import { useTown, useUpdateTown } from "@/hooks/useTowns";

export default function EditTown() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: town, isLoading } = useTown(id!);
  const updateTown = useUpdateTown();

  const [name, setName] = useState("");
  const [chief, setChief] = useState("");
  const [description, setDescription] = useState("");
  const [landmarks, setLandmarks] = useState<string[]>([]);
  const [newLandmark, setNewLandmark] = useState("");
  const [imageUrl, setImageUrl] = useState("");

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
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  const handleSave = async () => {
    await updateTown.mutateAsync({
      id: id!,
      data: {
        name,
        chief,
        description: description || null,
        landmarks,
        image_url: imageUrl || null,
      },
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

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-2xl">
        <H2 className="mb-6">Edit Town</H2>

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
        <View className="mb-4">
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

        <View className="flex-row gap-3 mt-4">
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
    </ScrollView>
  );
}
