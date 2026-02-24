import { View, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { H1, Body } from "../ui/Typography";
import { Button } from "../ui/Button";

export function Hero() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <LinearGradient
      colors={["#1B4D3E", "#163D32", "#0F2B23"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="min-h-[500px] md:min-h-[600px]"
    >
      {/* Top decorative gold line */}
      <View className="h-1 bg-gold" />

      <View className="flex-1 px-4 py-16 md:py-24 justify-center items-center">
        {/* Decorative seal */}
        <View className="w-28 h-28 md:w-36 md:h-36 bg-gold rounded-full items-center justify-center mb-8 border-4 border-gold-light" accessibilityLabel="Akuapem Traditional Council seal">
          <View className="w-24 h-24 md:w-32 md:h-32 bg-green-deep rounded-full items-center justify-center border-2 border-gold/50">
            <View className="items-center">
              <Body className="text-gold text-center text-xs tracking-widest">
                AKUAPEM
              </Body>
              <Body className="text-gold-light text-center text-3xl font-bold">
                AK
              </Body>
              <Body className="text-gold text-center text-xs tracking-widest">
                COUNCIL
              </Body>
            </View>
          </View>
        </View>

        {/* Gold accent line above heading */}
        <View className="w-16 h-0.5 bg-gold mb-6" />

        <H1 className="text-white text-center mb-4 md:text-5xl">
          Akuapem Traditional Council
        </H1>

        <Body className="text-white/90 text-center max-w-2xl mb-10 text-lg md:text-xl leading-relaxed">
          Preserving our heritage, serving our communities, and building a
          prosperous future for the people of Akuapem.
        </Body>

        <View
          className={`${isMobile ? "w-full px-4" : "flex-row"} gap-4 items-center`}
        >
          <Link href="/about" asChild>
            <Button title="Learn About Us" variant="primary" onPress={() => {}} />
          </Link>
          <Link href="/subscribe" asChild>
            <Button title="Subscribe for Updates" variant="outline" onPress={() => {}} />
          </Link>
        </View>

        {/* Bottom decorative gold line */}
        <View className="w-24 h-0.5 bg-gold/40 mt-12" />
      </View>
    </LinearGradient>
  );
}
