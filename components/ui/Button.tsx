import { Pressable, Text, ActivityIndicator, Platform } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const variantStyles = {
  primary: "bg-gold active:bg-gold/80",
  secondary: "bg-green-deep active:bg-green-deep/80",
  outline: "bg-transparent border-2 border-gold active:bg-gold-light",
  danger: "bg-red-kente active:bg-red-kente/80",
};

const textStyles = {
  primary: "text-white",
  secondary: "text-white",
  outline: "text-gold",
  danger: "text-white",
};

const isWeb = Platform.OS === "web";

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
  accessibilityLabel,
  accessibilityHint,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      className={`
        px-6 py-3 rounded-lg items-center justify-center min-h-[44px] min-w-[44px]
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : ""}
      `}
      style={
        isWeb
          ? ({
              cursor: disabled ? "not-allowed" : "pointer",
              transition:
                "background-color 0.25s ease, opacity 0.25s ease, transform 0.15s ease",
            } as any)
          : undefined
      }
    >
      {({ hovered }: { hovered?: boolean }) =>
        loading ? (
          <ActivityIndicator
            color={variant === "outline" ? "#d4a843" : "#FFFFFF"}
          />
        ) : (
          <Text
            className={`font-body-semibold text-base ${textStyles[variant]}`}
            style={
              isWeb && hovered && !disabled
                ? ({ opacity: 0.9 } as any)
                : undefined
            }
          >
            {title}
          </Text>
        )
      }
    </Pressable>
  );
}
