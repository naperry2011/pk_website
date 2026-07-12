import { View, Text, Platform } from "react-native";
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
  { value: 17, suffix: "", label: "Principal Towns" },
  { value: 300, suffix: "+", label: "Years of Heritage" },
  { value: 1, suffix: "", label: "United Kingdom" },
];

export function StatsSection() {
  const { isMobile } = useResponsive();

  return (
    <View className="bg-ink px-[6%]">
      <View
        className={`max-w-[1280px] mx-auto w-full border-t border-b border-white/10 ${
          isMobile ? "flex-col" : "flex-row items-stretch"
        }`}
      >
        {stats.map((stat, index) => (
          <View
            key={stat.label}
            className={
              isMobile
                ? `w-full ${index > 0 ? "border-t border-white/10" : ""}`
                : `flex-1 ${index > 0 ? "border-l border-white/10" : ""}`
            }
          >
            <AnimateOnScroll delay={index * 150}>
              <View className="items-start px-8 md:px-14 py-12 md:py-16">
                <Text className="font-display text-5xl md:text-7xl text-champagne mb-4">
                  <AnimatedNumber end={stat.value} suffix={stat.suffix} />
                </Text>
                <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
                  {stat.label}
                </Text>
              </View>
            </AnimateOnScroll>
          </View>
        ))}
      </View>
    </View>
  );
}
