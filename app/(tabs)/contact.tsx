import { View, Text, Pressable, Linking, Platform } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { Body, BodyLarge, Card, Display, Eyebrow } from "@/components/ui";
import { useResponsive } from "@/hooks/useResponsive";
import { theme } from "@/constants/theme";

const isWeb = Platform.OS === "web";

const contactInfo = [
  {
    icon: "map-marker" as const,
    title: "Address",
    text: "Ahenfie (Palace)\nAkropong-Akuapem\nEastern Region, Ghana",
    action: null,
  },
  {
    icon: "phone" as const,
    title: "Phone",
    text: "+233 302 401 234",
    action: "tel:+233302401234",
  },
  {
    icon: "envelope" as const,
    title: "Email",
    text: "info@akuapemcouncil.org",
    action: "mailto:info@akuapemcouncil.org",
  },
  {
    icon: "clock-o" as const,
    title: "Office Hours",
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

      {/* Page header band */}
      <Section background="green-dark" className="py-20 md:py-28">
        <View className="max-w-3xl mx-auto items-center">
          <Eyebrow className="mb-4 text-center">Get In Touch</Eyebrow>
          <Display className="text-white text-center mb-5">Contact Us</Display>
          <View className="w-16 h-[2px] bg-gold mb-6" />
          <BodyLarge className="text-white/80 text-center">
            We'd love to hear from you. Reach out to the Akuapem Traditional
            Council
          </BodyLarge>
        </View>
      </Section>

      {/* Two-column: info panel + form */}
      <Section background="white">
        <View className={isMobile ? "gap-12" : "flex-row gap-16 items-start"}>
          {/* Left: contact information panel */}
          <View className={isMobile ? undefined : "w-[380px]"}>
            <View className="bg-gray-warm rounded-xl p-8">
              <Eyebrow className="mb-2">Information</Eyebrow>
              <Text className="font-heading-bold text-h3 md:text-h3-desktop text-gray-charcoal mb-8">
                Contact Information
              </Text>

              <View className="gap-7 mb-10">
                {contactInfo.map((info, index) => (
                  <Pressable
                    key={index}
                    onPress={() => info.action && Linking.openURL(info.action)}
                    disabled={!info.action}
                    className="flex-row items-start gap-4 min-h-[44px]"
                    style={isWeb && info.action ? ({ cursor: "pointer" } as any) : undefined}
                    accessibilityRole={info.action ? "link" : undefined}
                    accessibilityLabel={`${info.title}: ${info.text.replace(/\n/g, ", ")}`}
                  >
                    <View className="w-11 h-11 rounded-full bg-gold/15 items-center justify-center">
                      <FontAwesome name={info.icon} size={17} color={theme.colors.goldAccent} />
                    </View>
                    <View className="flex-1">
                      <Text className="font-accent text-xs uppercase tracking-widest text-gray-muted mb-1">
                        {info.title}
                      </Text>
                      <Text
                        className={`font-body text-[15px] leading-6 ${
                          info.action ? "text-green-deep" : "text-gray-charcoal"
                        }`}
                      >
                        {info.text}
                      </Text>
                    </View>
                  </Pressable>
                ))}
              </View>

              {/* Social Links */}
              <Text className="font-accent text-xs uppercase tracking-widest text-gray-muted mb-4">
                Follow Us
              </Text>
              <View className="flex-row gap-3">
                {socialLinks.map((social) => (
                  <Pressable
                    key={social.icon}
                    onPress={() => Linking.openURL(social.url)}
                    className="w-12 h-12 rounded-full bg-green-deep hover:bg-green-mid items-center justify-center"
                    style={isWeb ? ({ cursor: "pointer", transition: "background-color 0.2s ease" } as any) : undefined}
                    accessibilityRole="link"
                    accessibilityLabel={`Visit our ${social.label} page`}
                  >
                    <FontAwesome name={social.icon} size={19} color={theme.colors.white} />
                  </Pressable>
                ))}
              </View>
            </View>
          </View>

          {/* Right: contact form */}
          <View className={isMobile ? undefined : "flex-1"}>
            <Card goldBorder className="p-8">
              <Eyebrow className="mb-2">Message</Eyebrow>
              <Text className="font-heading-bold text-h3 md:text-h3-desktop text-gray-charcoal mb-6">
                Send us a Message
              </Text>

              <Input
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
                label="Subject"
                placeholder="What is this regarding?"
                value={formData.subject}
                onChangeText={(text) =>
                  setFormData({ ...formData, subject: text })
                }
              />

              <TextArea
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
                <View className="bg-green-deep/10 border border-green-deep/25 rounded-xl p-5 items-center">
                  <FontAwesome name="check-circle" size={24} color={theme.colors.primaryGreen} />
                  <Text className="font-body-semibold text-base text-green-deep mt-2">
                    Thank you for your message.
                  </Text>
                  <Body className="text-green-deep/80 text-sm text-center mt-1">
                    We have received your inquiry and will respond within 2-3
                    business days.
                  </Body>
                </View>
              ) : (
                <Button
                  title="Send Message"
                  onPress={handleSubmit}
                  fullWidth
                  accessibilityHint="Submits the contact form"
                />
              )}
            </Card>
          </View>
        </View>
      </Section>

      {/* Map */}
      <Section background="warm">
        <View className="items-center mb-10">
          <Eyebrow className="mb-3 text-center">Location</Eyebrow>
          <Text className="font-heading-bold text-h2 md:text-h2-desktop text-gray-charcoal text-center mb-4">
            Find Us
          </Text>
          <View className="w-16 h-[2px] bg-gold" />
        </View>
        {isWeb ? (
          <View className="h-80 rounded-xl overflow-hidden border border-green-deep/15">
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
          <View className="h-80 rounded-xl bg-green-deep/5 border-2 border-dashed border-green-deep/15 items-center justify-center">
            <View className="w-16 h-16 rounded-full bg-green-deep/10 items-center justify-center mb-4">
              <FontAwesome name="map" size={28} color={theme.colors.primaryGreen} />
            </View>
            <Body className="text-gray-muted text-center">
              Map available on web version
            </Body>
          </View>
        )}
        <Body className="text-gray-muted text-sm text-center mt-4">
          Ahenfie (Royal Palace), Akropong-Akuapem, Eastern Region, Ghana
        </Body>
      </Section>
    </PageLayout>
  );
}
