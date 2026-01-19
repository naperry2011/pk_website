import { View, Pressable, Linking } from "react-native";
import { useState } from "react";
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
    text: "+233 XX XXX XXXX",
    action: "tel:+233XXXXXXXX",
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

  const handleSubmit = () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }
    alert("Message sent (demo)");
  };

  return (
    <PageLayout>
      {/* Hero */}
      <View className="bg-green-deep py-16 px-4">
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
                  onChangeText={(text) =>
                    setFormData({ ...formData, name: text })
                  }
                />

                <Input
                  label="Email Address *"
                  placeholder="your.email@example.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  value={formData.email}
                  onChangeText={(text) =>
                    setFormData({ ...formData, email: text })
                  }
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
                  onChangeText={(text) =>
                    setFormData({ ...formData, message: text })
                  }
                />

                <Button title="Send Message" onPress={handleSubmit} fullWidth />
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
                  className="flex-row items-start gap-4"
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
                  className="w-12 h-12 bg-green-deep rounded-full items-center justify-center"
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

      {/* Map Placeholder */}
      <Section background="warm">
        <H2 className="text-center mb-6">Find Us</H2>
        <View className="h-80 bg-white rounded-xl items-center justify-center border border-brown-earth/20">
          <FontAwesome name="map" size={60} color="#2C3E5030" />
          <Body className="text-gray-charcoal/50 mt-4">
            Interactive map coming soon
          </Body>
          <Body className="text-sm text-gray-charcoal/40">
            Ahenfie (Palace), Akropong-Akuapem
          </Body>
        </View>
      </Section>
    </PageLayout>
  );
}
