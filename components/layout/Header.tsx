import { View, Pressable, Text, useWindowDimensions } from "react-native";
import { useState } from "react";
import { Link, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { Accent } from "../ui/Typography";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/towns", label: "Towns" },
  { href: "/community", label: "Community" },
  { href: "/subscribe", label: "Subscribe" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const isMobile = width < 768;

  return (
    <View className="bg-white border-b border-brown-earth/20">
      <View className="px-4 py-3 flex-row items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" asChild>
          <Pressable className="flex-row items-center">
            <View className="w-10 h-10 bg-gold rounded-full items-center justify-center mr-3">
              <Text className="text-white font-bold text-lg">AK</Text>
            </View>
            <View>
              <Accent className="text-base">Akuapem</Accent>
              <Text className="font-body text-xs text-gray-charcoal -mt-1">
                Traditional Council
              </Text>
            </View>
          </Pressable>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <View className="flex-row items-center gap-6">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href as any} asChild>
                <Pressable>
                  <Text
                    className={`font-body-medium text-base ${
                      pathname === item.href
                        ? "text-gold"
                        : "text-gray-charcoal"
                    }`}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              </Link>
            ))}
            <Link href="/subscribe" asChild>
              <Pressable className="bg-gold px-4 py-2 rounded-lg">
                <Text className="font-body-semibold text-white">Subscribe</Text>
              </Pressable>
            </Link>
          </View>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <View className="flex-row items-center gap-3">
            <Link href="/subscribe" asChild>
              <Pressable className="bg-gold px-3 py-2 rounded-lg">
                <Text className="font-body-semibold text-white text-sm">
                  Subscribe
                </Text>
              </Pressable>
            </Link>
            <Pressable
              onPress={() => setMenuOpen(!menuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] items-center justify-center"
            >
              <FontAwesome
                name={menuOpen ? "times" : "bars"}
                size={24}
                color="#2C3E50"
              />
            </Pressable>
          </View>
        )}
      </View>

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <View className="bg-white border-t border-gray-warm px-4 py-4">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href as any} asChild>
              <Pressable
                onPress={() => setMenuOpen(false)}
                className="py-3 border-b border-gray-warm"
              >
                <Text
                  className={`font-body-medium text-lg ${
                    pathname === item.href ? "text-gold" : "text-gray-charcoal"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          ))}
        </View>
      )}
    </View>
  );
}
