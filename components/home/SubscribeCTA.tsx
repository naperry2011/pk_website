import { View } from "react-native";
import { Link } from "expo-router";
import { H2, Body } from "../ui/Typography";
import { Button } from "../ui/Button";
import { FadeIn } from "../ui/FadeIn";

export function SubscribeCTA() {
  return (
    <View className="py-16 md:py-20 px-4 md:px-8 bg-gold">
      <FadeIn>
        <View className="max-w-3xl mx-auto items-center">
          {/* Decorative line */}
          <View className="w-12 h-0.5 bg-white/40 mb-6" />

          <H2 className="text-white text-center mb-4">
            Stay Connected with Your Community
          </H2>

          <Body className="text-white/90 text-center text-lg mb-8 max-w-xl">
            Subscribe to receive announcements about obituaries, weddings, council
            news, and cultural events. Choose what matters to you.
          </Body>

          <Link href="/subscribe" asChild>
            <Button
              title="Subscribe Now"
              variant="secondary"
              onPress={() => {}}
            />
          </Link>

          {/* Decorative line */}
          <View className="w-12 h-0.5 bg-white/40 mt-6" />
        </View>
      </FadeIn>
    </View>
  );
}
