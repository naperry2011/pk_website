import { View, Pressable } from "react-native";
import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  onPress?: () => void;
  className?: string;
  accessibilityLabel?: string;
  accessibilityHint?: string;
}

export function Card({ children, onPress, className = "", accessibilityLabel, accessibilityHint }: CardProps) {
  const cardStyles = `
    bg-white rounded-xl p-4 shadow-sm border border-gray-warm hover:shadow-md
    ${className}
  `;

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={accessibilityHint}
        className={`${cardStyles} active:bg-gray-warm`}
      >
        {children}
      </Pressable>
    );
  }

  return <View className={cardStyles}>{children}</View>;
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
