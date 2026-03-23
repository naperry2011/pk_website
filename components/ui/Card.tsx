import { View, Pressable, Platform } from "react-native";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

const isWeb = Platform.OS === "web";

const webTransitionStyle = isWeb
  ? ({
      transition: "box-shadow 0.25s ease, transform 0.25s ease",
    } as any)
  : undefined;

const webHoverStyle = isWeb
  ? ({
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      transform: "translateY(-2px)",
    } as any)
  : undefined;

export function Card({ children, onPress, className = "", accessibilityLabel, accessibilityHint }: CardProps) {
  const cardClasses = `
    bg-white p-4 shadow-sm border border-gray-warm
    ${className}
  `;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        className={`${cardClasses} active:bg-gray-warm`}
        style={({ hovered }: any) => [
          { borderRadius: 12, overflow: "hidden" as const },
          webTransitionStyle,
          hovered && webHoverStyle,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View
      className={cardClasses}
      style={[{ borderRadius: 12, overflow: "hidden" as const }, webTransitionStyle]}
    >
      {children}
    </View>
  );
}

export function CardHeader({ children }: { children: ReactNode }) {
  return <View className="mb-3">{children}</View>;
}

export function CardContent({ children }: { children: ReactNode }) {
  return <View>{children}</View>;
}

export function CardFooter({ children }: { children: ReactNode }) {
  return (
    <View className="mt-4 pt-3 border-t border-gray-warm">{children}</View>
  );
}
