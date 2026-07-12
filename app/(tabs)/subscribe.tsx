import { View, Text, Pressable, Switch, Platform } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { BodyLarge, Display, Label } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { tokens } from "@/constants/tokens";

const isWeb = Platform.OS === "web";

const ALL_TOWNS = [
  "Akropong", "Abiriw", "Amanokrom", "Awukugua", "Berekuso",
  "Tutu", "Mamfe", "Larteh", "Adukrom", "Mampong",
  "Obosomase", "Apirede", "Aseseeso", "Dawu", "Koforidua",
  "Nsawam", "Suhum",
];

const subscriptionOptions = [
  {
    id: "obituaries",
    title: "Obituaries",
    description: "Funeral announcements from all towns",
  },
  {
    id: "weddings",
    title: "Weddings",
    description: "Wedding announcements and celebrations",
  },
  {
    id: "council",
    title: "Council Business",
    description: "Official announcements and resolutions",
  },
  {
    id: "events",
    title: "Events & Festivals",
    description: "Cultural events and festival dates",
  },
];

const benefits = [
  {
    title: "Direct Updates",
    text: "Announcements delivered straight to your inbox — no need to check back.",
  },
  {
    title: "Personalized",
    text: "Choose only the categories and towns that matter to you.",
  },
  {
    title: "Timely",
    text: "Never miss important community news, festivals, or council resolutions.",
  },
  {
    title: "Free & Flexible",
    text: "Update your preferences or unsubscribe at any time.",
  },
];

export default function SubscribeScreen() {
  const { isMobile } = useResponsive();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentLocation, setCurrentLocation] = useState("");
  const [birthday, setBirthday] = useState("");
  const [selectedTowns, setSelectedTowns] = useState<string[]>([]);
  const [preferences, setPreferences] = useState<Record<string, boolean>>({
    obituaries: true,
    weddings: true,
    council: true,
    events: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [subSuccess, setSubSuccess] = useState(false);

  const togglePreference = (id: string) => {
    setPreferences((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleTown = (town: string) => {
    setSelectedTowns((prev) =>
      prev.includes(town) ? prev.filter((t) => t !== town) : [...prev, town]
    );
  };

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateBirthday = (value: string) =>
    /^(0[1-9]|1[0-2])\/(0[1-9]|[12]\d|3[01])$/.test(value);

  const handleSubscribe = () => {
    const newErrors: Record<string, string> = {};
    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email address is required";
    else if (!validateEmail(email)) newErrors.email = "Please enter a valid email address";
    if (birthday.trim() && !validateBirthday(birthday)) {
      newErrors.birthday = "Please use MM/DD format";
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setSubSuccess(true);
  };

  const hasAnyContentPref = preferences.obituaries || preferences.weddings || preferences.events;

  return (
    <PageLayout>
      <Head>
        <title>Subscribe - Akuapem Paramount King Council</title>
        <meta name="description" content="Subscribe to receive updates from the Akuapem Paramount King Council. Choose to get notifications for obituaries, weddings, council business, and cultural events." />
        <meta property="og:title" content="Subscribe - Akuapem Paramount King Council" />
        <meta property="og:description" content="Subscribe to receive community updates from the Akuapem Traditional Area." />
      </Head>

      {/* Split layout: pitch + form panel */}
      <Section background="ink">
        <View className={isMobile ? "gap-16" : "flex-row gap-16 items-start"}>
          {/* Left: pitch + benefits */}
          <View className={isMobile ? undefined : "w-[45%]"}>
            <Label className="mb-6">Subscribe</Label>
            <Display className="mb-8">Stay Connected</Display>
            <BodyLarge className="text-ivory/60 mb-12 max-w-md">
              One subscription keeps you informed about life across all
              seventeen towns — from council resolutions to community
              celebrations and remembrances.
            </BodyLarge>

            <View className="border-t border-white/10">
              {benefits.map((benefit) => (
                <View
                  key={benefit.title}
                  className="flex-row items-start gap-5 py-5 border-b border-white/10"
                >
                  <Text className="font-display text-base text-champagne mt-0.5">—</Text>
                  <View className="flex-1">
                    <Text className="font-body-medium text-base text-ivory/90 mb-1">
                      {benefit.title}
                    </Text>
                    <Text className="font-body text-sm leading-relaxed text-ivory/50">
                      {benefit.text}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>

          {/* Right: form panel */}
          <View className={isMobile ? undefined : "flex-1"}>
            <View className="bg-ink-raised p-8 md:p-12 border-t border-white/10">
              <Label className="text-ivory/50 mb-8">Your Information</Label>

              <View className={isMobile ? undefined : "flex-row gap-8"}>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
                    label="First Name *"
                    placeholder="First name"
                    value={firstName}
                    onChangeText={(text) => {
                      setFirstName(text);
                      if (errors.firstName) setErrors((prev) => ({ ...prev, firstName: "" }));
                    }}
                    error={errors.firstName}
                  />
                </View>
                <View className={isMobile ? undefined : "flex-1"}>
                  <Input
                    variant="underline"
                    label="Last Name *"
                    placeholder="Last name"
                    value={lastName}
                    onChangeText={(text) => {
                      setLastName(text);
                      if (errors.lastName) setErrors((prev) => ({ ...prev, lastName: "" }));
                    }}
                    error={errors.lastName}
                  />
                </View>
              </View>

              <Input
                variant="underline"
                label="Email Address *"
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={errors.email}
              />

              <Input
                variant="underline"
                label="Phone Number"
                placeholder="+233 XX XXX XXXX"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <Input
                variant="underline"
                label="Current Location"
                placeholder="City, Country"
                value={currentLocation}
                onChangeText={setCurrentLocation}
              />

              <Input
                variant="underline"
                label="Birthday (MM/DD)"
                placeholder="MM/DD"
                value={birthday}
                onChangeText={(text) => {
                  setBirthday(text);
                  if (errors.birthday) setErrors((prev) => ({ ...prev, birthday: "" }));
                }}
                error={errors.birthday}
                accessibilityHint="Enter your birthday in MM/DD format, no year"
              />

              {/* Preferences — hairline toggle rows */}
              <View className="pt-8 mt-4">
                <Label className="text-ivory/50 mb-6">What would you like to receive?</Label>
              </View>

              <View className="border-t border-white/10 mb-8">
                {subscriptionOptions.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => togglePreference(option.id)}
                    className="flex-row items-center py-4 min-h-[44px] border-b border-white/10"
                    style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                    accessibilityRole="switch"
                    accessibilityLabel={`${option.title}: ${option.description}`}
                    accessibilityState={{ checked: preferences[option.id] }}
                  >
                    <View className="flex-1 pr-4">
                      <Text
                        className={`font-body-medium text-base ${
                          preferences[option.id] ? "text-ivory" : "text-ivory/60"
                        }`}
                      >
                        {option.title}
                      </Text>
                      <Text className="font-body text-xs text-ivory/40 mt-0.5">
                        {option.description}
                      </Text>
                    </View>
                    <Switch
                      value={preferences[option.id]}
                      onValueChange={() => togglePreference(option.id)}
                      trackColor={{
                        false: "rgba(255,255,255,0.2)",
                        true: tokens.colors.champagne,
                      }}
                      thumbColor={
                        preferences[option.id] ? tokens.colors.ivory : "rgba(255,255,255,0.6)"
                      }
                      accessibilityLabel={`Toggle ${option.title}`}
                    />
                  </Pressable>
                ))}
              </View>

              {/* Town-based Filtering — underline text toggles */}
              {hasAnyContentPref && (
                <View className="mb-8">
                  <Label className="text-ivory/50 mb-3">Filter updates by town</Label>
                  <Text className="font-body text-sm text-ivory/40 mb-5">
                    Select specific towns to receive updates from, or leave empty
                    for all towns.
                  </Text>
                  <View className="flex-row flex-wrap gap-x-6 gap-y-3">
                    {ALL_TOWNS.map((town) => {
                      const selected = selectedTowns.includes(town);
                      return (
                        <Pressable
                          key={town}
                          onPress={() => toggleTown(town)}
                          className={`pb-1 min-h-[32px] justify-center border-b ${
                            selected ? "border-champagne" : "border-transparent"
                          }`}
                          style={isWeb ? ({ cursor: "pointer", transition: "border-color 0.2s ease" } as any) : undefined}
                          accessibilityRole="checkbox"
                          accessibilityLabel={town}
                          accessibilityState={{ checked: selected }}
                        >
                          <Text
                            className={`font-body text-sm ${
                              selected ? "text-champagne" : "text-ivory/60"
                            }`}
                            style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                          >
                            {town}
                          </Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {selectedTowns.length > 0 && (
                    <Pressable
                      onPress={() => setSelectedTowns([])}
                      className="mt-4 min-h-[32px] justify-center"
                      style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
                      accessibilityRole="button"
                      accessibilityLabel="Clear town selection"
                    >
                      <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/50">
                        Clear selection ({selectedTowns.length} selected)
                      </Text>
                    </Pressable>
                  )}
                </View>
              )}

              {subSuccess ? (
                <View className="border-t border-champagne/40 pt-8 mt-2">
                  <FontAwesome name="check" size={20} color={tokens.colors.champagne} />
                  <Text className="font-display text-xl text-ivory mt-4 mb-2">
                    You have been subscribed.
                  </Text>
                  <Text className="font-body text-sm text-ivory/60 leading-relaxed">
                    Thank you for subscribing. You will receive updates based on
                    your selected preferences.
                  </Text>
                </View>
              ) : (
                <Button
                  title="Subscribe"
                  onPress={handleSubscribe}
                  fullWidth
                  accessibilityHint="Subscribes you to selected update categories"
                />
              )}

              <Text className="font-body text-xs text-ivory/40 text-center mt-6">
                You can update your preferences or unsubscribe at any time
              </Text>
            </View>
          </View>
        </View>
      </Section>
    </PageLayout>
  );
}
