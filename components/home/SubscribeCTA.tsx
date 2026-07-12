import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { Button, Eyebrow } from "@/components/ui";

export function SubscribeCTA() {
  const { isMobile } = useResponsive();
  const router = useRouter();

  return (
    <View className="bg-green-deep border-t border-gold/40">
      <AnimateOnScroll>
        <View className="items-center px-[8%] py-16 md:py-24 max-w-3xl w-full mx-auto">
          <Eyebrow className="mb-4 text-center">Stay Informed</Eyebrow>

          <Text
            accessibilityRole="header"
            className="font-heading-bold text-h2 md:text-h2-desktop text-white text-center mb-4"
          >
            Stay Connected with Your Community
          </Text>

          <Text className="font-body text-base text-white/85 text-center max-w-xl leading-6 mb-8">
            Festival dates, council decisions, obituaries, wedding announcements
            — delivered to your inbox.
          </Text>

          <Button
            title="Subscribe Now"
            variant="primary"
            fullWidth={isMobile}
            onPress={() => router.push("/subscribe")}
          />
        </View>
      </AnimateOnScroll>
    </View>
  );
}
