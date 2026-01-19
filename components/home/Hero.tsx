import { View, ImageBackground, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { H1, Body } from "../ui/Typography";
import { Button } from "../ui/Button";

export function Hero() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View className="bg-green-deep min-h-[400px] md:min-h-[500px]">
      <View className="flex-1 px-4 py-12 justify-center items-center">
        {/* Decorative seal placeholder */}
        <View className="w-24 h-24 md:w-32 md:h-32 bg-gold rounded-full items-center justify-center mb-6 border-4 border-gold-light">
          <View className="w-20 h-20 md:w-28 md:h-28 bg-green-deep rounded-full items-center justify-center">
            <View className="items-center">
              <Body className="text-gold text-center text-xs">AKUAPEM</Body>
              <Body className="text-gold-light text-center text-2xl font-bold">
                AK
              </Body>
              <Body className="text-gold text-center text-xs">COUNCIL</Body>
            </View>
          </View>
        </View>

        <H1 className="text-white text-center mb-4">
          Akuapem Traditional Council
        </H1>

        <Body className="text-white/90 text-center max-w-2xl mb-8 text-lg">
          Preserving our heritage, serving our communities, and building a
          prosperous future for the people of Akuapem.
        </Body>

        <View
          className={`${isMobile ? "w-full" : "flex-row"} gap-4 items-center`}
        >
          <Link href="/about" asChild>
            <Button title="Learn About Us" variant="primary" />
          </Link>
          <Link href="/subscribe" asChild>
            <Button title="Subscribe for Updates" variant="outline" />
          </Link>
        </View>
      </View>
    </View>
  );
}
