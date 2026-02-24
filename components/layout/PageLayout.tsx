import { View, ScrollView } from "react-native";
import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { FadeIn } from "../ui/FadeIn";

interface PageLayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function PageLayout({
  children,
  showHeader = true,
  showFooter = true,
}: PageLayoutProps) {
  return (
    <View className="flex-1 bg-white">
      {showHeader && <Header />}
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="flex-1">{children}</View>
        {showFooter && <Footer />}
      </ScrollView>
    </View>
  );
}

export function Section({
  children,
  className = "",
  background = "white",
  animate = true,
}: {
  children: ReactNode;
  className?: string;
  background?: "white" | "warm" | "green" | "gold";
  animate?: boolean;
}) {
  const bgColors = {
    white: "bg-white",
    warm: "bg-gray-warm",
    green: "bg-green-deep",
    gold: "bg-gold",
  };

  const content = (
    <View className={`py-12 md:py-16 px-4 md:px-8 ${bgColors[background]} ${className}`}>
      <View className="max-w-7xl mx-auto w-full">{children}</View>
    </View>
  );

  if (!animate) return content;

  return (
    <FadeIn delay={100} duration={500}>
      {content}
    </FadeIn>
  );
}
