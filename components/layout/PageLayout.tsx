import { View, ScrollView, Text } from "react-native";
import { ReactNode, useRef, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnimateOnScroll } from "../ui/AnimateOnScroll";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  /** When true, content starts under the transparent header (cinematic heroes). */
  heroUnderHeader?: boolean;
}

export function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
  heroUnderHeader = false,
}: PageLayoutProps) {
  // The page scrolls inside this ScrollView (body scroll is disabled on web),
  // so header transparency and back-to-top are driven from here.
  const [scrolled, setScrolled] = useState(false);
  const scrollRef = useRef<ScrollView>(null);

  return (
    <View className="flex-1 bg-ink">
      {showHeader && <Header floating={heroUnderHeader} scrolled={scrolled} />}
      <ScrollView
        ref={scrollRef}
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={32}
        onScroll={
          heroUnderHeader
            ? (e) => setScrolled(e.nativeEvent.contentOffset.y > 60)
            : undefined
        }
      >
        <View className="flex-1">{children}</View>
        {showFooter && (
          <Footer
            onBackToTop={() =>
              scrollRef.current?.scrollTo({ y: 0, animated: true })
            }
          />
        )}
      </ScrollView>
    </View>
  );
}

type SectionBackground = "ink" | "ink-raised" | "ivory" | "white" | "warm";

export function Section({
  children,
  className = "",
  background = "ink",
  animate = true,
  number,
  label,
}: {
  children: ReactNode;
  className?: string;
  background?: SectionBackground;
  animate?: boolean;
  /** Renders an "01 — Label" hairline header row above the content. */
  number?: string;
  label?: string;
}) {
  const bgColors: Record<SectionBackground, string> = {
    ink: "bg-ink",
    "ink-raised": "bg-ink-raised",
    ivory: "bg-ivory",
    white: "bg-white",
    warm: "bg-gray-warm",
  };

  const dark = background === "ink" || background === "ink-raised";

  const content = (
    <View className={`py-20 md:py-32 px-[6%] ${bgColors[background]} ${className}`}>
      <View className="max-w-[1280px] mx-auto w-full">
        {(number || label) && (
          <View
            className={`flex-row items-baseline gap-4 border-t pb-10 md:pb-16 pt-4 ${
              dark ? "border-white/10" : "border-ink/10"
            }`}
          >
            {number && (
              <Text className="font-display text-base text-champagne">
                {number}
              </Text>
            )}
            {label && (
              <Text
                className={`font-body-medium text-label uppercase tracking-[3px] ${
                  dark ? "text-ivory/50" : "text-ink/50"
                }`}
              >
                {label}
              </Text>
            )}
          </View>
        )}
        {children}
      </View>
    </View>
  );

  if (!animate) return content;

  return <AnimateOnScroll>{content}</AnimateOnScroll>;
}
