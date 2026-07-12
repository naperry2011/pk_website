import { Pressable, Text, View, ActivityIndicator, Platform } from "react-native";
import { tokens } from "@/constants/tokens";

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost-light"
  | "link-arrow"
  | "danger";

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

const variantStyles: Record<ButtonVariant, string> = {
  primary: "bg-champagne active:bg-champagne-dim",
  secondary: "bg-transparent border border-white/30 active:bg-white/10",
  outline: "bg-transparent border border-champagne active:bg-champagne/10",
  "ghost-light": "bg-transparent border border-white/60 active:bg-white/10",
  "link-arrow": "bg-transparent px-0",
  danger: "bg-red-kente active:bg-red-kente/80",
};

const textStyles: Record<ButtonVariant, string> = {
  primary: "text-ink",
  secondary: "text-ivory",
  outline: "text-champagne",
  "ghost-light": "text-white",
  "link-arrow": "text-champagne",
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
  const isLink = variant === "link-arrow";

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: disabled || loading, busy: loading }}
      className={`
        ${isLink ? "py-2" : "px-8 py-3.5"} items-center justify-center min-h-[44px]
        ${isLink ? "" : "min-w-[44px] rounded-none"}
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-40" : ""}
      `}
      style={
        isWeb
          ? ({
              cursor: disabled ? "not-allowed" : "pointer",
              transition:
                "background-color 0.35s ease, opacity 0.35s ease, transform 0.2s ease",
            } as any)
          : undefined
      }
    >
      {({ hovered }: any) =>
        loading ? (
          <ActivityIndicator
            color={
              variant === "primary" || variant === "danger"
                ? tokens.colors.white
                : tokens.colors.champagne
            }
          />
        ) : isLink ? (
          <View className="flex-row items-center gap-2">
            <Text
              className={`font-body-medium text-label uppercase tracking-[3px] ${textStyles[variant]}`}
            >
              {title}
            </Text>
            <Text
              className={`text-champagne text-base ${textStyles[variant]}`}
              style={
                isWeb
                  ? ({
                      transition: "transform 0.3s ease",
                      transform: hovered ? "translateX(4px)" : "translateX(0)",
                    } as any)
                  : undefined
              }
            >
              →
            </Text>
          </View>
        ) : (
          <Text
            className={`font-body-medium text-label uppercase tracking-[3px] ${textStyles[variant]}`}
            style={
              isWeb && hovered && !disabled
                ? ({ opacity: 0.85 } as any)
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
