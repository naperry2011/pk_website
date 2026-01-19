import { View, TextInput, Text, TextInputProps } from "react-native";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="font-body-medium text-gray-charcoal mb-2">
          {label}
        </Text>
      )}
      <TextInput
        className={`
          bg-white border rounded-lg px-4 py-3 font-body text-base text-gray-charcoal
          min-h-[44px]
          ${error ? "border-red-kente" : "border-brown-earth/30"}
          focus:border-gold
          ${className}
        `}
        placeholderTextColor="#2C3E50AA"
        {...props}
      />
      {error && (
        <Text className="font-body text-sm text-red-kente mt-1">{error}</Text>
      )}
    </View>
  );
}

export function TextArea({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="font-body-medium text-gray-charcoal mb-2">
          {label}
        </Text>
      )}
      <TextInput
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        className={`
          bg-white border rounded-lg px-4 py-3 font-body text-base text-gray-charcoal
          min-h-[120px]
          ${error ? "border-red-kente" : "border-brown-earth/30"}
          focus:border-gold
          ${className}
        `}
        placeholderTextColor="#2C3E50AA"
        {...props}
      />
      {error && (
        <Text className="font-body text-sm text-red-kente mt-1">{error}</Text>
      )}
    </View>
  );
}
