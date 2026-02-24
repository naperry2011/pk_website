import { View, Text, Pressable, Image } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

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
  const handlePress = async () => {
    // Image picker integration will be added when expo-image-picker is configured
    // For now, this serves as the upload UI placeholder
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
          className="border-2 border-dashed border-brown-earth/30 rounded-lg py-8 items-center justify-center bg-gray-warm/30 min-h-[120px]"
          accessibilityRole="button"
          accessibilityLabel={label}
        >
          <FontAwesome name="camera" size={28} color="#2C3E5044" />
          <Text className="font-body text-sm text-gray-charcoal/40 mt-2">
            Tap to upload
          </Text>
        </Pressable>
      )}
    </View>
  );
}
