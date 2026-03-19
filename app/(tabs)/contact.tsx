import { View, Pressable, Linking, Platform } from "react-native";
import { useState } from "react";
import Head from "expo-router/head";
import { PageLayout, Section } from "@/components/layout";
import { H1, H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input, TextArea } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";
import { FontAwesome } from "@expo/vector-icons";

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
      <View className="bg-green-deep py-16 md:py-20 px-4 md:px-8">
        <View className="max-w-4xl mx-auto items-center">
          <H1 className="text-white text-center mb-4">Contact Us</H1>
          <Body className="text-white/90 text-center text-lg">
            We'd love to hear from you. Reach out to the Akuapem Traditional
            Council
          </Body>
        </View>
      </View>

      {/* Contact Content */}
      <Section background="white">
        <View className="md:flex-row gap-8">
          {/* Contact Form */}
          <View className="flex-1">
            <Card>
              <CardContent>
                <H2 className="mb-6">Send us a Message</H2>

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
                  <View className="bg-green-deep/10 border border-green-deep/30 rounded-lg p-4 mb-4 items-center">
                    <FontAwesome name="check-circle" size={24} color="#1B4D3E" />
                    <Body className="text-green-deep font-body-semibold mt-2">
                      Thank you for your message.
                    </Body>
                    <Body className="text-green-deep/80 text-sm text-center mt-1">
                      We have received your inquiry and will respond within 2-3 business days.
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
              </CardContent>
            </Card>
          </View>

          {/* Contact Info */}
          <View className="w-full md:w-80 mt-8 md:mt-0">
            <H3 className="mb-6">Contact Information</H3>

            <View className="gap-6 mb-8">
              {contactInfo.map((info, index) => (
                <Pressable
                  key={index}
                  onPress={() => info.action && Linking.openURL(info.action)}
                  disabled={!info.action}
                  className="flex-row items-start gap-4 min-h-[44px]"
                  accessibilityRole={info.action ? "link" : undefined}
                  accessibilityLabel={`${info.title}: ${info.text.replace(/\n/g, ", ")}`}
                >
                  <View className="w-10 h-10 bg-gold/10 rounded-full items-center justify-center">
                    <FontAwesome
                      name={info.icon as any}
                      size={18}
                      color="#D4AF37"
                    />
                  </View>
                  <View className="flex-1">
                    <Body className="font-body-semibold mb-1">{info.title}</Body>
                    <Body
                      className={`text-gray-charcoal/70 ${
                        info.action ? "text-blue-heritage" : ""
                      }`}
                    >
                      {info.text}
                    </Body>
                  </View>
                </Pressable>
              ))}
            </View>

            {/* Social Links */}
            <H3 className="mb-4">Follow Us</H3>
            <View className="flex-row gap-3">
              {socialLinks.map((social) => (
                <Pressable
                  key={social.icon}
                  onPress={() => Linking.openURL(social.url)}
                  className="w-12 h-12 bg-green-deep hover:bg-green-deep/80 active:bg-green-deep/70 rounded-full items-center justify-center"
                  accessibilityRole="link"
                  accessibilityLabel={`Visit our ${social.label} page`}
                >
                  <FontAwesome
                    name={social.icon as any}
                    size={20}
                    color="#FFFFFF"
                  />
                </Pressable>
              ))}
            </View>
          </View>
        </View>
      </Section>

      {/* Map */}
      <Section background="warm">
        <H2 className="text-center mb-6">Find Us</H2>
        {Platform.OS === "web" ? (
          <View className="h-80 rounded-xl overflow-hidden border border-green-deep/20">
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
          <View className="h-80 bg-green-deep/5 rounded-xl items-center justify-center border-2 border-dashed border-green-deep/20">
            <View className="w-16 h-16 bg-green-deep/10 rounded-full items-center justify-center mb-4">
              <FontAwesome name="map" size={28} color="#1B4D3E" />
            </View>
            <Body className="text-gray-charcoal/60 text-center px-4">
              Map available on web version
            </Body>
          </View>
        )}
        <Body className="text-sm text-gray-charcoal/60 text-center mt-3">
          Ahenfie (Royal Palace), Akropong-Akuapem, Eastern Region, Ghana
        </Body>
      </Section>
    </PageLayout>
  );
}
