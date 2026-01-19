import { View, Pressable, Switch } from "react-native";
import { useState } from "react";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";

const subscriptionOptions = [
  {
    id: "obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "Funeral announcements from all towns",
    color: "#8B0000",
  },
  {
    id: "weddings",
    icon: "bell",
    title: "Weddings",
    description: "Wedding announcements and celebrations",
    color: "#D4AF37",
  },
  {
    id: "council",
    icon: "gavel",
    title: "Council Business",
    description: "Official announcements and resolutions",
    color: "#1B4D3E",
  },
  {
    id: "events",
    icon: "calendar",
    title: "Events & Festivals",
    description: "Cultural events and festival dates",
    color: "#1E4D8B",
  },
];

export default function SubscribeScreen() {
  const [email, setEmail] = useState("");
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    obituaries: true,
    weddings: true,
    council: true,
    events: true,
  });

  const togglePreference = (id: string) => {
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email address");
      return;
    }
    alert(`Subscribed ${email} to selected categories (demo)`);
  };

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-gold py-16 px-4">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Stay Connected</H1>
          <Body className="text-white/90 text-center text-lg">
            Subscribe to receive updates that matter to you
          </Body>
        </View>
      </View>

      {/* Subscription Form */}
      <Section background="white">
        <View className="max-w-2xl mx-auto">
          <Card>
            <CardContent>
              <H2 className="mb-6 text-center">Choose Your Preferences</H2>

              {/* Email Input */}
              <Input
                label="Email Address"
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />

              {/* Preference Toggles */}
              <Body className="font-body-medium text-gray-charcoal mb-4">
                What would you like to receive?
              </Body>

              <View className="gap-4 mb-6">
                {subscriptionOptions.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => togglePreference(option.id)}
                    className={`flex-row items-center p-4 rounded-xl border ${
                      preferences[option.id]
                        ? "border-gold bg-gold/5"
                        : "border-brown-earth/20 bg-white"
                    }`}
                  >
                    <View
                      className="w-12 h-12 rounded-full items-center justify-center mr-4"
                      style={{ backgroundColor: option.color + "15" }}
                    >
                      <FontAwesome
                        name={option.icon as any}
                        size={20}
                        color={option.color}
                      />
                    </View>
                    <View className="flex-1">
                      <Body className="font-body-semibold">{option.title}</Body>
                      <Body className="text-sm text-gray-charcoal/70">
                        {option.description}
                      </Body>
                    </View>
                    <Switch
                      value={preferences[option.id]}
                      onValueChange={() => togglePreference(option.id)}
                      trackColor={{ false: "#E0E0E0", true: "#D4AF3780" }}
                      thumbColor={preferences[option.id] ? "#D4AF37" : "#f4f3f4"}
                    />
                  </Pressable>
                ))}
              </View>

              <Button
                title="Subscribe"
                onPress={handleSubscribe}
                fullWidth
              />

              <Body className="text-sm text-gray-charcoal/60 text-center mt-4">
                You can update your preferences or unsubscribe at any time
              </Body>
            </CardContent>
          </Card>
        </View>
      </Section>

      {/* Benefits */}
      <Section background="warm">
        <H2 className="text-center mb-8">Why Subscribe?</H2>
        <View className="flex-row flex-wrap justify-center gap-6">
          {[
            {
              icon: "envelope",
              title: "Direct Updates",
              text: "Get announcements delivered to your inbox",
            },
            {
              icon: "filter",
              title: "Personalized",
              text: "Only receive what matters to you",
            },
            {
              icon: "clock-o",
              title: "Timely",
              text: "Never miss important community news",
            },
          ].map((benefit, index) => (
            <View key={index} className="items-center w-64">
              <View className="w-16 h-16 bg-gold/10 rounded-full items-center justify-center mb-4">
                <FontAwesome
                  name={benefit.icon as any}
                  size={24}
                  color="#D4AF37"
                />
              </View>
              <Body className="font-body-semibold text-center mb-1">
                {benefit.title}
              </Body>
              <Body className="text-sm text-gray-charcoal/70 text-center">
                {benefit.text}
              </Body>
            </View>
          ))}
        </View>
      </Section>
    </PageLayout>
  );
}
