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
    <View className="bg-green-deep border-t-2 border-b-2 border-gold/40 px-[8%] py-16 md:py-24">
      <View
        className={`max-w-7xl mx-auto w-full ${
          isMobile ? "flex-col" : "flex-row justify-around items-stretch"
        }`}
      >
        {stats.map((stat, index) => (
          <AnimateOnScroll key={stat.label} delay={index * 150}>
            <View
              className={`items-center py-6 ${
                isMobile
                  ? `w-full ${index < stats.length - 1 ? "border-b border-gold/30" : ""}`
                  : `min-w-[180px] px-10 ${index > 0 ? "border-l border-gold/30" : ""}`
              }`}
            >
              <Text className="font-accent text-gold text-5xl md:text-6xl mb-3">
                <AnimatedNumber end={stat.value} suffix={stat.suffix} />
              </Text>
              <Text className="font-body-semibold uppercase tracking-[3px] text-white/70 text-sm text-center">
                {stat.label}
              </Text>
            </View>
          </AnimateOnScroll>
        ))}
      </View>
    </View>
  );
}
