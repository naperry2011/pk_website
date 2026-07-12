import { ReactNode } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

type RevealVariant = "fade-up" | "fade" | "scale" | "fade-left" | "fade-right";

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  style?: StyleProp<ViewStyle>;
}

const hiddenTransforms: Record<RevealVariant, string> = {
  "fade-up": "translateY(48px)",
  fade: "none",
  scale: "scale(0.96)",
  "fade-left": "translateX(-48px)",
  "fade-right": "translateX(48px)",
};

const visibleTransforms: Record<RevealVariant, string> = {
  "fade-up": "translateY(0)",
  fade: "none",
  scale: "scale(1)",
  "fade-left": "translateX(0)",
  "fade-right": "translateX(0)",
};

// Web-specific implementation using react-intersection-observer
function AnimateOnScrollWeb({
  children,
  delay = 0,
  variant = "fade-up",
  style,
}: AnimateOnScrollProps) {
  // We use a dynamic import approach for web-only
  const { useInView } = require("react-intersection-observer");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.12,
  });

  return (
    <View
      ref={ref as any}
      style={[
        {
          opacity: inView ? 1 : 0,
          transform: inView
            ? visibleTransforms[variant]
            : hiddenTransforms[variant],
          transition: `opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 0.9s cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        } as any,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AnimateOnScroll({
  children,
  delay = 0,
  variant = "fade-up",
  style,
}: AnimateOnScrollProps) {
  if (Platform.OS !== "web") {
    return <View style={style}>{children}</View>;
  }

  return (
    <AnimateOnScrollWeb delay={delay} variant={variant} style={style}>
      {children}
    </AnimateOnScrollWeb>
  );
}
