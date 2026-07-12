import { View, TextInput, Text, TextInputProps } from "react-native";
import { tokens } from "@/constants/tokens";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  accessibilityHint?: string;
  /** "boxed" (default) — light-surface admin style. "underline" — dark-canvas public style. */
  variant?: "boxed" | "underline";
}

function fieldClasses(variant: "boxed" | "underline", error?: string) {
  if (variant === "underline") {
    return `
      bg-transparent border-0 border-b rounded-none px-0 py-3 font-body text-base text-ivory
      ${error ? "border-red-kente" : "border-white/20"}
      focus:border-champagne
    `;
  }
  return `
    bg-white border rounded-lg px-4 py-3 font-body text-base text-gray-charcoal
    ${error ? "border-red-kente" : "border-gray-charcoal/20"}
    focus:border-champagne
  `;
}

function labelClasses(variant: "boxed" | "underline") {
  return variant === "underline"
    ? "font-body-medium text-label uppercase tracking-[3px] text-ivory/60 mb-2"
    : "font-body-medium text-gray-charcoal mb-2";
}

export function Input({
  label,
  error,
  className = "",
  accessibilityHint,
  variant = "boxed",
  ...props
}: InputProps) {
  return (
    <View className="mb-4" accessible={false}>
      {label && <Text className={labelClasses(variant)}>{label}</Text>}
      <TextInput
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: props.editable === false }}
        className={`min-h-[44px] ${fieldClasses(variant, error)} ${className}`}
        placeholderTextColor={
          variant === "underline" ? "rgba(244,241,234,0.35)" : "#2d2d2dAA"
        }
        {...props}
      />
      {error && (
        <Text className="font-body text-sm text-red-kente mt-1" accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}

export function TextArea({
  label,
  error,
  className = "",
  accessibilityHint,
  variant = "boxed",
  ...props
}: InputProps) {
  return (
    <View className="mb-4" accessible={false}>
      {label && <Text className={labelClasses(variant)}>{label}</Text>}
      <TextInput
        multiline
        numberOfLines={4}
        textAlignVertical="top"
        accessibilityLabel={label}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: props.editable === false }}
        className={`min-h-[120px] ${fieldClasses(variant, error)} ${className}`}
        placeholderTextColor={
          variant === "underline" ? "rgba(244,241,234,0.35)" : "#2d2d2dAA"
        }
        {...props}
      />
      {error && (
        <Text className="font-body text-sm text-red-kente mt-1" accessibilityRole="alert">
          {error}
        </Text>
      )}
    </View>
  );
}
