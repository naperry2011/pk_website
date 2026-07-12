import { View, Text, Pressable, Linking, Platform } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { BodyLarge, Display, Label } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { tokens } from "@/constants/tokens";

const isWeb = Platform.OS === "web";

const contactInfo = [
  {
    title: "Address",
    text: "Ahenfie (Palace)\nAkropong-Akuapem\nEastern Region, Ghana",
    action: null,
  },
  {
    title: "Phone",
    text: "+233 302 401 234",
    action: "tel:+233302401234",
  },
  {
    title: "Email",
    text: "info@akuapemcouncil.org",
    action: "mailto:info@akuapemcouncil.org",
  },
  {
    title: "Hours",
    text: "Monday - Friday\n9:00 AM - 5:00 PM",
    action: null,
  },
];

const socialLinks = [
  { icon: "facebook" as const, url: "https://facebook.com", label: "Facebook" },
  { icon: "twitter" as const, url: "https://twitter.com", label: "Twitter" },
  { icon: "instagram" as const, url: "https://instagram.com", label: "Instagram" },
  { icon: "youtube" as const, url: "https://youtube.com", label: "YouTube" },
];

export default function ContactScreen() {
  const { isMobile } = useResponsive();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [formSuccess, setFormSuccess] = useState(false);

  const validateEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";

    setFieldErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setFormSuccess(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <PageLayout>
      <Head>
        <title>Contact Us - Akuapem Paramount King Council</title>
        <meta name="description" content="Contact the Akuapem Paramount King Council at Ahenfie (Palace), Akropong-Akuapem, Eastern Region, Ghana. Send inquiries, feedback, or visit us during office hours." />
        <meta property="og:title" content="Contact Us - Akuapem Paramount King Council" />
        <meta property="og:description" content="Get in touch with the Akuapem Paramount King Council. Visit our palace at Akropong-Akuapem or send us a message." />
      </Head>

      {/* Page title band */}
      <Section background="ink" className="pb-10 md:pb-16">
        <View className="max-w-4xl">
          <Label className="mb-6">Get In Touch</Label>
          <Display className="mb-8">Contact</Display>
          <BodyLarge className="text-ivory/60 max-w-xl">
            We would love to hear from you. Reach out to the Akuapem Traditional
            Council.
          </BodyLarge>
        </View>
      </Section>

      {/* Split: info hairline rows + form panel */}
      <Section background="ink" number="01" label="Reach Us" className="pt-0 md:pt-0">
        <View className={isMobile ? "gap-16" : "flex-row gap-16 items-start"}>
          {/* Left: contact information as hairline rows */}
          <View className={isMobile ? undefined : "w-[420px]"}>
            <View>
              {contactInfo.map((info, index) => (
                <Pressable
                  key={index}
                  onPress={() => info.action && Linking.openURL(info.action)}
                  disabled={!info.action}
                  className={`flex-row items-start justify-between gap-8 py-6 border-b border-white/10 min-h-[44px] ${
                    index === 0 ? "border-t" : ""
                  }`}
                  style={isWeb && info.action ? ({ cursor: "pointer" } as any) : undefined}
                  accessibilityRole={info.action ? "link" : undefined}
                  accessibilityLabel={`${info.title}: ${info.text.replace(/\n/g, ", ")}`}
                >
                  {({ hovered }: any) => (
                    <>
                      <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mt-1 w-[90px]">
                        {info.title}
                      </Text>
                      <Text
                        className={`font-body text-[15px] leading-6 text-right flex-1 ${
                          info.action && hovered && isWeb
                            ? "text-champagne"
                            : "text-ivory/90"
                        }`}
                        style={isWeb ? ({ transition: "color 0.2s ease" } as any) : undefined}
                      >
                        {info.text}
                      </Text>
                    </>
                  )}
                </Pressable>
              ))}
            </View>

            {/* Social Links — square hairline buttons */}
            <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mt-10 mb-5">
              Follow Us
            </Text>
            <View className="flex-row gap-4">
              {socialLinks.map((social) => (
                <Pressable
                  key={social.icon}
                  onPress={() => Linking.openURL(social.url)}
                  className="w-12 h-12 border border-white/15 items-center justify-center"
                  style={
                    isWeb
                      ? ({ cursor: "pointer", transition: "border-color 0.25s ease" } as any)
                      : undefined
                  }
                  accessibilityRole="link"
                  accessibilityLabel={`Visit our ${social.label} page`}
                >
                  {({ hovered }: any) => (
                    <FontAwesome
                      name={social.icon}
                      size={17}
                      color={
                        hovered && isWeb
                          ? tokens.colors.ivory
                          : tokens.colors.champagne
                      }
                    />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Right: contact form panel */}
          <View className={isMobile ? undefined : "flex-1"}>
            <View className="bg-ink-raised p-8 md:p-12 border-t border-white/10">
              <Label className="text-ivory/50 mb-8">Send us a Message</Label>

              <Input
                variant="underline"
                label="Your Name *"
                placeholder="Full name"
                value={formData.name}
                onChangeText={(text) => {
                  setFormData({ ...formData, name: text });
                  if (fieldErrors.name) setFieldErrors((prev) => ({ ...prev, name: "" }));
                }}
                error={fieldErrors.name}
                accessibilityHint="Enter your full name"
              />

              <Input
                variant="underline"
                label="Email Address *"
                placeholder="your.email@example.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={formData.email}
                onChangeText={(text) => {
                  setFormData({ ...formData, email: text });
                  if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={fieldErrors.email}
                accessibilityHint="Enter your email address"
              />

              <Input
                variant="underline"
                label="Subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChangeText={(text) =>
                  setFormData({ ...formData, subject: text })
                }
              />

              <TextArea
                variant="underline"
                label="Message *"
                placeholder="How can we help you?"
                value={formData.message}
                onChangeText={(text) => {
                  setFormData({ ...formData, message: text });
                  if (fieldErrors.message) setFieldErrors((prev) => ({ ...prev, message: "" }));
                }}
                error={fieldErrors.message}
                accessibilityHint="Enter your message"
              />

              {formSuccess ? (
                <View className="border-t border-champagne/40 pt-8 mt-4">
                  <FontAwesome name="check" size={20} color={tokens.colors.champagne} />
                  <Text className="font-display text-xl text-ivory mt-4 mb-2">
                    Thank you for your message.
                  </Text>
                  <Text className="font-body text-sm text-ivory/60 leading-relaxed">
                    We have received your inquiry and will respond within 2-3
                    business days.
                  </Text>
                </View>
              ) : (
                <View className="mt-4">
                  <Button
                    title="Send Message"
                    onPress={handleSubmit}
                    fullWidth
                    accessibilityHint="Submits the contact form"
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Section>

      {/* Map */}
      <Section background="ink" number="02" label="Location">
        <View className="mb-12">
          <Text className="font-display text-title md:text-title-desktop text-ivory">
            Find Us
          </Text>
        </View>
        {isWeb ? (
          <View className="h-80 overflow-hidden border border-white/15">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.5!2d-0.0833!3d5.9667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf834e45f6bbd7%3A0x3a10a41b21e4f06f!2sAkropong%2C%20Ghana!5e0!3m2!1sen!2sus!4v1710000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ahenfie Royal Palace, Akropong-Akuapem"
            />
          </View>
        ) : (
          <View className="h-80 border border-white/15 items-center justify-center">
            <FontAwesome name="map" size={28} color={tokens.colors.champagne} style={{ opacity: 0.6 }} />
            <Text className="font-body text-sm text-ivory/50 mt-4 text-center">
              Map available on web version
            </Text>
          </View>
        )}
        <Text className="font-body text-sm text-ivory/40 mt-5">
          Ahenfie (Royal Palace), Akropong-Akuapem, Eastern Region, Ghana
        </Text>
      </Section>
    </PageLayout>
  );
}
