import { View, Text, Pressable, Linking, Platform, StyleSheet } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

const contactInfo = [
  {
    icon: "map-marker",
    title: "Address",
    text: "Ahenfie (Palace)\nAkropong-Akuapem\nEastern Region, Ghana",
    action: null,
  },
  {
    icon: "phone",
    title: "Phone",
    text: "+233 302 401 234",
    action: "tel:+233302401234",
  },
  {
    icon: "envelope",
    title: "Email",
    text: "info@akuapemcouncil.org",
    action: "mailto:info@akuapemcouncil.org",
  },
  {
    icon: "clock-o",
    title: "Office Hours",
    text: "Monday - Friday\n9:00 AM - 5:00 PM",
    action: null,
  },
];

const socialLinks = [
  { icon: "facebook", url: "https://facebook.com", label: "Facebook" },
  { icon: "twitter", url: "https://twitter.com", label: "Twitter" },
  { icon: "instagram", url: "https://instagram.com", label: "Instagram" },
  { icon: "youtube", url: "https://youtube.com", label: "YouTube" },
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

      {/* Hero */}
      <View style={styles.hero}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>GET IN TOUCH</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48 }]}>
            Contact Us
          </Text>
          <Text style={styles.heroSubtitle}>
            We'd love to hear from you. Reach out to the Akuapem Traditional Council
          </Text>
        </View>
      </View>

      {/* Contact Content */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={[styles.contactRow, isMobile && styles.contactRowMobile]}>
              {/* Contact Form */}
              <View style={{ flex: 1 }}>
                <View style={styles.formCard}>
                  <View style={styles.centeredHeading}>
                    <Text style={styles.sectionLabel}>MESSAGE</Text>
                    <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 24 : 30 }]}>
                      Send us a Message
                    </Text>
                  </View>

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
                    <View style={styles.successBox}>
                      <FontAwesome name="check-circle" size={24} color="#1a5632" />
                      <Text style={styles.successTitle}>
                        Thank you for your message.
                      </Text>
                      <Text style={styles.successText}>
                        We have received your inquiry and will respond within 2-3 business days.
                      </Text>
                    </View>
                  ) : (
                    <Button
                      title="Send Message"
                      onPress={handleSubmit}
                      fullWidth
                      accessibilityHint="Submits the contact form"
                    />
                  )}
                </View>
              </View>

              {/* Contact Info */}
              <View style={[styles.contactInfoCol, isMobile && styles.contactInfoColMobile]}>
                <Text style={[styles.sectionLabel, { marginBottom: 8 }]}>INFORMATION</Text>
                <Text style={[styles.contactInfoTitle, { fontSize: isMobile ? 22 : 24 }]}>
                  Contact Information
                </Text>

                <View style={{ gap: 24, marginBottom: 32 }}>
                  {contactInfo.map((info, index) => (
                    <Pressable
                      key={index}
                      onPress={() => info.action && Linking.openURL(info.action)}
                      disabled={!info.action}
                      style={styles.contactItem}
                      accessibilityRole={info.action ? "link" : undefined}
                      accessibilityLabel={`${info.title}: ${info.text.replace(/\n/g, ", ")}`}
                    >
                      <View style={styles.contactItemIcon}>
                        <FontAwesome
                          name={info.icon as any}
                          size={18}
                          color="#d4a843"
                        />
                      </View>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.contactItemTitle}>{info.title}</Text>
                        <Text
                          style={[
                            styles.contactItemText,
                            info.action && { color: "#1E4D8B" },
                          ]}
                        >
                          {info.text}
                        </Text>
                      </View>
                    </Pressable>
                  ))}
                </View>

                {/* Social Links */}
                <Text style={[styles.contactInfoTitle, { fontSize: 20, marginBottom: 16 }]}>
                  Follow Us
                </Text>
                <View style={styles.socialRow}>
                  {socialLinks.map((social) => (
                    <Pressable
                      key={social.icon}
                      onPress={() => Linking.openURL(social.url)}
                      style={({ hovered }: any) => [
                        styles.socialButton,
                        hovered && styles.socialButtonHover,
                      ]}
                      accessibilityRole="link"
                      accessibilityLabel={`Visit our ${social.label} page`}
                    >
                      <FontAwesome
                        name={social.icon as any}
                        size={20}
                        color="#ffffff"
                      />
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Map */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.centeredHeading}>
              <Text style={styles.sectionLabel}>LOCATION</Text>
              <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 28 : 36 }]}>
                Find Us
              </Text>
            </View>
            {Platform.OS === "web" ? (
              <View style={styles.mapContainer}>
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
              <View style={styles.mapPlaceholder}>
                <View style={styles.mapPlaceholderIcon}>
                  <FontAwesome name="map" size={28} color="#1a5632" />
                </View>
                <Text style={styles.mapPlaceholderText}>
                  Map available on web version
                </Text>
              </View>
            )}
            <Text style={styles.mapCaption}>
              Ahenfie (Royal Palace), Akropong-Akuapem, Eastern Region, Ghana
            </Text>
          </View>
        </AnimateOnScroll>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1a5632",
    paddingVertical: 80,
    paddingHorizontal: "8%",
  },
  heroInner: {
    maxWidth: 700,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 16,
  },
  heroTitle: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 18,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: "8%",
    backgroundColor: "#ffffff",
  },
  sectionInner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  sectionLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 20,
    lineHeight: 1.3,
  },
  centeredHeading: {
    alignItems: "center",
    marginBottom: 40,
  },
  contactRow: {
    flexDirection: "row",
    gap: 32,
  },
  contactRowMobile: {
    flexDirection: "column",
  },
  formCard: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.15)",
    padding: 32,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.06)",
  },
  contactInfoCol: {
    width: 320,
  },
  contactInfoColMobile: {
    width: "100%",
    marginTop: 32,
  },
  contactInfoTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 24,
  },
  contactItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 16,
    minHeight: 44,
  },
  contactItemIcon: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  contactItemTitle: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 15,
    color: "#2d2d2d",
    marginBottom: 4,
  },
  contactItemText: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 22,
  },
  socialRow: {
    flexDirection: "row",
    gap: 12,
  },
  socialButton: {
    width: 48,
    height: 48,
    backgroundColor: "#1a5632",
    borderRadius: 24,
    alignItems: "center",
    justifyContent: "center",
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "background-color 0.2s ease" }
      : {}),
  } as any,
  socialButtonHover: {
    backgroundColor: "#22703f",
  },
  successBox: {
    backgroundColor: "rgba(26, 86, 50, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(26, 86, 50, 0.25)",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    marginBottom: 16,
  },
  successTitle: {
    color: "#1a5632",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    marginTop: 8,
  },
  successText: {
    color: "rgba(26, 86, 50, 0.8)",
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    marginTop: 4,
    lineHeight: 22,
  },
  mapContainer: {
    height: 320,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(26, 86, 50, 0.15)",
  },
  mapPlaceholder: {
    height: 320,
    backgroundColor: "rgba(26, 86, 50, 0.04)",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "rgba(26, 86, 50, 0.15)",
  },
  mapPlaceholderIcon: {
    width: 64,
    height: 64,
    backgroundColor: "rgba(26, 86, 50, 0.08)",
    borderRadius: 32,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  mapPlaceholderText: {
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    fontSize: 15,
    textAlign: "center",
  },
  mapCaption: {
    fontSize: 14,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    marginTop: 12,
  },
});
