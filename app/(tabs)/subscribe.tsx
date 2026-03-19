import { View, Pressable, Switch, ScrollView, useWindowDimensions } from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";

const ALL_TOWNS = [
  "Akropong", "Abiriw", "Amanokrom", "Awukugua", "Berekuso",
  "Tutu", "Mamfe", "Larteh", "Adukrom", "Mampong",
  "Obosomase", "Apirede", "Aseseeso", "Dawu", "Koforidua",
  "Nsawam", "Suhum",
];

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
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

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

      {/* Hero */}
      <View className="bg-gold py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Stay Connected</H1>
          <Body className="text-white/90 text-center text-lg">
            Subscribe to receive updates that matter to you from across the
            Akuapem Traditional Area. Get notified about community events,
            announcements, and celebrations.
          </Body>
        </View>
      </View>

      {/* Council Announcements Link */}
      <Section background="warm">
        <View className="max-w-2xl mx-auto">
          <Link href="/community/announcements" asChild>
            <Pressable className="flex-row items-center justify-center gap-3 bg-green-deep/10 border border-green-deep/20 rounded-xl p-4 min-h-[44px]">
              <FontAwesome name="bullhorn" size={20} color="#1B4D3E" />
              <Body className="text-green-deep font-body-semibold">
                View Latest Council Announcements
              </Body>
              <FontAwesome name="arrow-right" size={14} color="#1B4D3E" />
            </Pressable>
          </Link>
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

      {/* Subscription Form */}
      <Section background="white">
        <View className="max-w-2xl mx-auto">
          <Card>
            <CardContent>
              {/* Personal Information */}
              <H2 className="mb-6 text-center">Your Information</H2>

              <View className="flex-row gap-4 flex-wrap">
                <View className="flex-1 min-w-[200px]">
                  <Input
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
                <View className="flex-1 min-w-[200px]">
                  <Input
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
                label="Phone Number"
                placeholder="+233 XX XXX XXXX"
                keyboardType="phone-pad"
                value={phone}
                onChangeText={setPhone}
              />

              <Input
                label="Current Location"
                placeholder="City, Country"
                value={currentLocation}
                onChangeText={setCurrentLocation}
              />

              <Input
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

              {/* Preferences */}
              <H2 className="mb-6 mt-6 text-center">Choose Your Preferences</H2>

              <Body className="font-body-medium text-gray-charcoal mb-4">
                What would you like to receive?
              </Body>

              <View className="gap-4 mb-6">
                {subscriptionOptions.map((option) => (
                  <Pressable
                    key={option.id}
                    onPress={() => togglePreference(option.id)}
                    className={`flex-row items-center p-4 rounded-xl border min-h-[44px] ${
                      preferences[option.id]
                        ? "border-gold bg-gold/5"
                        : "border-brown-earth/20 bg-white"
                    }`}
                    accessibilityRole="switch"
                    accessibilityLabel={`${option.title}: ${option.description}`}
                    accessibilityState={{ checked: preferences[option.id] }}
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
                      accessibilityLabel={`Toggle ${option.title}`}
                    />
                  </Pressable>
                ))}
              </View>

              {/* Town-based Filtering */}
              {hasAnyContentPref && (
                <View className="mb-6">
                  <Body className="font-body-medium text-gray-charcoal mb-2">
                    Filter updates by town (optional)
                  </Body>
                  <Body className="text-sm text-gray-charcoal/60 mb-3">
                    Select specific towns to receive updates from, or leave empty for all towns
                  </Body>
                  <View className="flex-row flex-wrap gap-2">
                    {ALL_TOWNS.map((town) => (
                      <Pressable
                        key={town}
                        onPress={() => toggleTown(town)}
                        className={`px-3 py-2 rounded-lg border min-h-[36px] justify-center ${
                          selectedTowns.includes(town)
                            ? "bg-gold border-gold"
                            : "bg-white border-brown-earth/30"
                        }`}
                        accessibilityRole="checkbox"
                        accessibilityLabel={town}
                        accessibilityState={{ checked: selectedTowns.includes(town) }}
                      >
                        <Body
                          className={`text-sm ${
                            selectedTowns.includes(town) ? "text-white" : "text-gray-charcoal"
                          }`}
                        >
                          {town}
                        </Body>
                      </Pressable>
                    ))}
                  </View>
                  {selectedTowns.length > 0 && (
                    <Pressable onPress={() => setSelectedTowns([])} className="mt-2">
                      <Body className="text-sm text-gold">Clear selection ({selectedTowns.length} selected)</Body>
                    </Pressable>
                  )}
                </View>
              )}

              {subSuccess ? (
                <View className="bg-green-deep/10 border border-green-deep/30 rounded-lg p-4 items-center">
                  <FontAwesome name="check-circle" size={24} color="#1B4D3E" />
                  <Body className="text-green-deep font-body-semibold mt-2">
                    You have been subscribed.
                  </Body>
                  <Body className="text-green-deep/80 text-sm text-center mt-1">
                    Thank you for subscribing. You will receive updates based on your selected preferences.
                  </Body>
                </View>
              ) : (
                <Button
                  title="Subscribe"
                  onPress={handleSubscribe}
                  fullWidth
                  accessibilityHint="Subscribes you to selected update categories"
                />
              )}

              <Body className="text-sm text-gray-charcoal/60 text-center mt-4">
                You can update your preferences or unsubscribe at any time
              </Body>
            </CardContent>
          </Card>
        </View>
      </Section>

    </PageLayout>
  );
}
