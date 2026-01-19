import { View } from "react-native";
import { Link } from "expo-router";
import { H2, Body } from "../ui/Typography";
import { Button } from "../ui/Button";

export function SubscribeCTA() {
  return (
    <View className="py-16 px-4 bg-gold">
      <View className="max-w-3xl mx-auto items-center">
        <H2 className="text-white text-center mb-4">
          Stay Connected with Your Community
        </H2>

        <Body className="text-white/90 text-center text-lg mb-8">
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
      </View>
    </View>
  );
}
