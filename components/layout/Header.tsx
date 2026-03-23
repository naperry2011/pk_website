import { View, Pressable, Text, useWindowDimensions, Platform } from "react-native";
import { useState, useCallback } from "react";
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

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname.startsWith(href);
}

function NavLink({ item, pathname }: { item: typeof navItems[0]; pathname: string }) {
  const active = isActive(pathname, item.href);
  const isWeb = Platform.OS === "web";

  return (
    <Link href={item.href as any} asChild>
      <Pressable
        className="min-h-[44px] min-w-[44px] items-center justify-center py-1"
        style={
          isWeb
            ? ({ cursor: "pointer" } as any)
            : undefined
        }
        accessibilityRole="link"
        accessibilityLabel={item.label}
        accessibilityState={{ selected: active }}
      >
        {({ hovered }: { hovered?: boolean }) => (
          <View className="items-center">
            <Text
              className={`font-body-medium text-base ${
                active
                  ? "text-gold"
                  : hovered
                  ? "text-gold"
                  : "text-gray-charcoal"
              }`}
              style={
                isWeb
                  ? ({ transition: "color 0.25s ease" } as any)
                  : undefined
              }
            >
              {item.label}
            </Text>
            <View
              className={`h-0.5 mt-1 rounded-full bg-gold ${
                active ? "w-full" : hovered ? "w-full" : "w-0"
              }`}
              style={
                isWeb
                  ? ({ transition: "width 0.25s ease" } as any)
                  : undefined
              }
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const isMobile = width < 768;
  const isWeb = Platform.OS === "web";

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <View
      className="bg-white border-b border-brown-earth/20 z-50"
      style={
        isWeb
          ? ({
              position: "sticky" as any,
              top: 0,
              boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
            } as any)
          : undefined
      }
      accessibilityRole={"banner" as any}
    >
      <View className="px-4 py-3 flex-row items-center justify-between max-w-7xl mx-auto w-full">
        {/* Logo */}
        <Link href="/" asChild>
          <Pressable
            className="flex-row items-center"
            accessibilityRole="link"
            accessibilityLabel="Akuapem Traditional Council home page"
          >
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
          <View
            className="flex-row items-center gap-6"
            accessibilityRole={"navigation" as any}
            accessibilityLabel="Main navigation"
          >
            {navItems.map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <Link href="/subscribe" asChild>
              <Pressable
                className="bg-gold px-4 py-2 rounded-lg min-h-[44px] items-center justify-center active:bg-gold/80"
                style={
                  isWeb
                    ? ({
                        cursor: "pointer",
                        transition:
                          "background-color 0.25s ease, transform 0.15s ease",
                      } as any)
                    : undefined
                }
                accessibilityRole="link"
                accessibilityLabel="Subscribe to updates"
              >
                {({ hovered }: { hovered?: boolean }) => (
                  <Text
                    className="font-body-semibold text-white"
                    style={
                      isWeb && hovered
                        ? ({ opacity: 0.9 } as any)
                        : undefined
                    }
                  >
                    Subscribe
                  </Text>
                )}
              </Pressable>
            </Link>
            <Pressable
              onPress={() => {}}
              className="border-2 border-gold bg-gold/10 px-4 py-2 rounded-lg min-h-[44px] flex-row items-center justify-center gap-2 active:bg-gold/30"
              style={
                isWeb
                  ? ({
                      cursor: "pointer",
                      transition: "background-color 0.25s ease",
                    } as any)
                  : undefined
              }
              accessibilityRole="link"
              accessibilityLabel="Donate to PK Foundation"
            >
              {({ hovered }: { hovered?: boolean }) => (
                <>
                  <FontAwesome name="heart" size={14} color="#d4a843" />
                  <Text
                    className="font-body-semibold text-gold"
                  >
                    Donate
                  </Text>
                </>
              )}
            </Pressable>
          </View>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <View className="flex-row items-center gap-3">
            <Link href="/subscribe" asChild>
              <Pressable
                className="bg-gold px-3 py-2 rounded-lg min-h-[44px] items-center justify-center active:bg-gold/80"
                accessibilityRole="link"
                accessibilityLabel="Subscribe to updates"
              >
                <Text className="font-body-semibold text-white text-sm">
                  Subscribe
                </Text>
              </Pressable>
            </Link>
            <Pressable
              onPress={() => setMenuOpen(!menuOpen)}
              className="p-2 min-w-[44px] min-h-[44px] items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              accessibilityState={{ expanded: menuOpen }}
            >
              <FontAwesome
                name={menuOpen ? "times" : "bars"}
                size={24}
                color="#2d2d2d"
              />
            </Pressable>
          </View>
        )}
      </View>

      {/* Mobile Menu Dropdown */}
      {isMobile && menuOpen && (
        <View
          className="bg-white border-t border-gray-warm px-4 py-2"
          accessibilityRole={"navigation" as any}
          accessibilityLabel="Mobile navigation"
        >
          {navItems.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href as any} asChild>
                <Pressable
                  onPress={closeMenu}
                  className={`py-3 border-b border-gray-warm min-h-[44px] flex-row items-center ${
                    active ? "border-l-2 border-l-gold pl-3" : "pl-4"
                  }`}
                  accessibilityRole="link"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    className={`font-body-medium text-lg flex-1 ${
                      active ? "text-gold" : "text-gray-charcoal"
                    }`}
                  >
                    {item.label}
                  </Text>
                  {active && (
                    <FontAwesome name="chevron-right" size={12} color="#d4a843" />
                  )}
                </Pressable>
              </Link>
            );
          })}
          {/* Donate Button */}
          <Pressable
            onPress={() => {
              closeMenu();
            }}
            className="py-3 pl-4 border-b border-gray-warm min-h-[44px] flex-row items-center gap-2"
            accessibilityRole="link"
            accessibilityLabel="Donate to PK Foundation"
          >
            <FontAwesome name="heart" size={16} color="#d4a843" />
            <Text className="font-body-medium text-lg text-gold">Donate</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
