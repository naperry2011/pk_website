import { View, Pressable, useWindowDimensions } from "react-native";
import { Link } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { H3, Body } from "../ui/Typography";

const links = [
  {
    href: "/community/obituaries",
    icon: "heart",
    title: "Obituaries",
    description: "View and submit funeral announcements",
  },
  {
    href: "/community/weddings",
    icon: "bell",
    title: "Weddings",
    description: "Share wedding announcements",
  },
  {
    href: "/towns",
    icon: "map-marker",
    title: "Our Towns",
    description: "Explore the 17 principal towns",
  },
  {
    href: "/contact",
    icon: "envelope",
    title: "Contact Us",
    description: "Reach out to the council",
  },
];

export function QuickLinks() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  return (
    <View className="py-12 px-4 bg-gray-warm">
      <View className="max-w-7xl mx-auto w-full">
        <H3 className="text-center mb-8">Quick Access</H3>

        <View
          className={`${
            isMobile ? "flex-col" : "flex-row flex-wrap justify-center"
          } gap-4`}
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href as any} asChild>
              <Pressable
                className={`
                  bg-white rounded-xl p-6 items-center
                  border border-brown-earth/10
                  active:bg-gold-light
                  ${isMobile ? "w-full" : "w-[200px]"}
                `}
              >
                <View className="w-14 h-14 bg-gold/10 rounded-full items-center justify-center mb-4">
                  <FontAwesome
                    name={link.icon as any}
                    size={24}
                    color="#D4AF37"
                  />
                </View>
                <Body className="font-body-semibold text-center mb-1">
                  {link.title}
                </Body>
                <Body className="text-sm text-gray-charcoal/70 text-center">
                  {link.description}
                </Body>
              </Pressable>
            </Link>
          ))}
        </View>
      </View>
    </View>
  );
}
