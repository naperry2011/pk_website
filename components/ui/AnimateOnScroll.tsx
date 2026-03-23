import { ReactNode } from "react";
import { Platform, View } from "react-native";

interface AnimateOnScrollProps {
  children: ReactNode;
  delay?: number;
}

// Web-specific implementation using react-intersection-observer
function AnimateOnScrollWeb({ children, delay = 0 }: AnimateOnScrollProps) {
  // We use a dynamic import approach for web-only
  const { useInView } = require("react-intersection-observer");
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimateOnScroll({ children, delay = 0 }: AnimateOnScrollProps) {
  if (Platform.OS !== "web") {
    return <View>{children}</View>;
  }

  return <AnimateOnScrollWeb delay={delay}>{children}</AnimateOnScrollWeb>;
}
