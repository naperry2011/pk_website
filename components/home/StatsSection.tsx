import { View, Text, StyleSheet, Platform } from "react-native";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";

// Conditionally use CountUp on web
function AnimatedNumber({ end, suffix = "" }: { end: number; suffix?: string }) {
  if (Platform.OS === "web") {
    try {
      const { useInView } = require("react-intersection-observer");
      const CountUp = require("react-countup").default;
      const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

      return (
        <div ref={ref} style={{ display: "inline" }}>
          {inView ? (
            <CountUp end={end} duration={2.5} suffix={suffix} />
          ) : (
            <span>0{suffix}</span>
          )}
        </div>
      );
    } catch {
      return <>{end}{suffix}</>;
    }
  }
  return <>{end}{suffix}</>;
}

const stats = [
  { value: 17, suffix: "", label: "PRINCIPAL TOWNS" },
  { value: 300, suffix: "+", label: "YEARS OF HERITAGE" },
  { value: 1, suffix: "", label: "UNITED KINGDOM" },
];

export function StatsSection() {
  const { isMobile } = useResponsive();

  return (
    <View style={[styles.container, { paddingVertical: isMobile ? 60 : 100 }]}>
      <View style={[styles.inner, isMobile && styles.innerMobile]}>
        {stats.map((stat, index) => (
          <AnimateOnScroll key={stat.label} delay={index * 150}>
            <View style={[styles.statItem, isMobile && styles.statItemMobile]}>
              <Text style={styles.number}>
                <AnimatedNumber end={stat.value} suffix={stat.suffix} />
              </Text>
              <Text style={styles.label}>{stat.label}</Text>
            </View>
          </AnimateOnScroll>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a5632",
    paddingHorizontal: "8%",
  },
  inner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  innerMobile: {
    flexDirection: "column",
    gap: 40,
  },
  statItem: {
    alignItems: "center",
    minWidth: 180,
  },
  statItemMobile: {
    minWidth: 0,
  },
  number: {
    fontSize: 56,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
    color: "#d4a843",
    marginBottom: 8,
  },
  label: {
    fontSize: 15,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "rgba(255, 255, 255, 0.8)",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
  },
});
