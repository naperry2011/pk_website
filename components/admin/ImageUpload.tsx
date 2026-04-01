import { View, Text, Pressable, Image, ActivityIndicator } from "react-native";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useUpload } from "@/hooks/useUpload";

interface ImageUploadProps {
  value?: string;
  onUpload: (url: string) => void;
  label?: string;
}

export function ImageUpload({
  value,
  onUpload,
  label = "Upload Image",
}: ImageUploadProps) {
  const upload = useUpload();
  const [uploading, setUploading] = useState(false);

  const handlePress = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });
    if (!result.canceled && result.assets[0]) {
      const asset = result.assets[0];
      setUploading(true);
      try {
        const publicUrl = await upload.mutateAsync({
          uri: asset.uri,
          type: asset.mimeType ?? "image/jpeg",
          name: asset.fileName ?? `image-${Date.now()}.jpg`,
        });
        onUpload(publicUrl);
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setUploading(false);
      }
    }
  };

  return (
    <View className="mb-4">
      {label && (
        <Text className="font-body-medium text-gray-charcoal mb-2">
          {label}
        </Text>
      )}
      {value ? (
        <View className="rounded-lg overflow-hidden border border-brown-earth/30">
          <Image
            source={{ uri: value }}
            className="w-full h-48"
            resizeMode="cover"
            accessibilityLabel="Uploaded image preview"
          />
          <Pressable
            onPress={() => onUpload("")}
            className="absolute top-2 right-2 bg-black/50 w-8 h-8 rounded-full items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel="Remove image"
          >
            <FontAwesome name="times" size={14} color="#FFFFFF" />
          </Pressable>
        </View>
      ) : (
        <Pressable
          onPress={handlePress}
          disabled={uploading}
          className="border-2 border-dashed rounded-lg py-8 items-center justify-center bg-gray-warm/30 min-h-[120px]"
          style={{ borderColor: "rgba(212, 168, 67, 0.3)" }}
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          {uploading ? (
            <>
              <ActivityIndicator size="small" color="#d4a843" />
              <Text className="font-body text-sm text-gray-charcoal/40 mt-2">
                Uploading...
              </Text>
            </>
          ) : (
            <>
              <FontAwesome name="camera" size={28} color="#6b6b6b44" />
              <Text className="font-body text-sm text-gray-charcoal/40 mt-2">
                Tap to upload
              </Text>
            </>
          )}
        </Pressable>
      )}
    </View>
  );
}
