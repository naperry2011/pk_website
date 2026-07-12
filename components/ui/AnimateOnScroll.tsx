import { ReactNode } from "react";
import { Platform, StyleProp, View, ViewStyle } from "react-native";

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
  style?: StyleProp<ViewStyle>;
}

// Web-specific implementation using react-intersection-observer
function AnimateOnScrollWeb({ children, delay = 0, style }: AnimateOnScrollProps) {
  // We use a dynamic import approach for web-only
  const { useInView } = require("react-intersection-observer");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <View
      ref={ref as any}
      style={[
        {
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(30px)",
          transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
        } as any,
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function AnimateOnScroll({ children, delay = 0, style }: AnimateOnScrollProps) {
  if (Platform.OS !== "web") {
    return <View style={style}>{children}</View>;
  }

  return (
    <AnimateOnScrollWeb delay={delay} style={style}>
      {children}
    </AnimateOnScrollWeb>
  );
}
