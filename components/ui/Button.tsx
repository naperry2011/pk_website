import { Pressable, Text, ActivityIndicator } from "react-native";

type ButtonVariant = "primary" | "secondary" | "outline" | "danger";

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
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

export function Button({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  fullWidth = false,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      className={`
        px-6 py-3 rounded-lg items-center justify-center min-h-[44px]
        ${variantStyles[variant]}
        ${fullWidth ? "w-full" : ""}
        ${disabled ? "opacity-50" : ""}
      `}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === "outline" ? "#D4AF37" : "#FFFFFF"}
        />
      ) : (
        <Text
          className={`font-body-semibold text-base ${textStyles[variant]}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
