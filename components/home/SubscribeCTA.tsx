import { View, Text } from "react-native";
import { useRouter } from "expo-router";
import { useResponsive } from "@/hooks/useResponsive";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui";

/** Ivory contrast band — deliberate dark → light → dark rhythm. */
export function SubscribeCTA() {
  const { isMobile } = useResponsive();
  const router = useRouter();

  return (
    <Section background="ivory">
      <View className={isMobile ? "flex-col gap-10" : "flex-row items-end justify-between gap-16"}>
        <View className="flex-1 max-w-[680px]">
          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ink/50 mb-6">
            Stay Informed
          </Text>
          <Text
            accessibilityRole="header"
            className="font-display text-title md:text-title-desktop text-ink mb-6"
          >
            Never miss a moment of the Kingdom
          </Text>
          <Text className="font-body text-body-lg text-ink/60 leading-relaxed">
            Festival dates, council decisions, obituaries and wedding
            announcements — delivered to your inbox.
          </Text>
        </View>

        <View className={isMobile ? "w-full" : "self-end"}>
          <Button
            title="Subscribe"
            variant="primary"
            fullWidth={isMobile}
            onPress={() => router.push("/subscribe")}
          />
        </View>
      </View>
    </Section>
  );
}
