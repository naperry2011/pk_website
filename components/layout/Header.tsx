import {
  View,
  Pressable,
  Text,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useState, useCallback } from "react";
import { Link, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { tokens } from "@/constants/tokens";

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

const isWeb = Platform.OS === "web";

function NavLink({
  item,
  pathname,
}: {
  item: (typeof navItems)[0];
  pathname: string;
}) {
  const active = isActive(pathname, item.href);

  return (
    <Link href={item.href as any} asChild>
      <Pressable
        className="min-h-[44px] items-center justify-center py-1"
        style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
        accessibilityRole="link"
        accessibilityLabel={item.label}
        accessibilityState={{ selected: active }}
      >
        {({ hovered }: any) => (
          <View className="items-center">
            <Text
              className={`font-body-medium text-label uppercase tracking-[3px] ${
                active || hovered ? "text-champagne" : "text-ivory/70"
              }`}
              style={
                isWeb ? ({ transition: "color 0.3s ease" } as any) : undefined
              }
            >
              {item.label}
            </Text>
            <View
              className={`h-px mt-1.5 bg-champagne ${
                active || hovered ? "w-full" : "w-0"
              }`}
              style={
                isWeb ? ({ transition: "width 0.3s ease" } as any) : undefined
              }
            />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export function Header({
  floating = false,
  scrolled = false,
}: {
  floating?: boolean;
  /** Driven by PageLayout's ScrollView (body scroll is disabled on web). */
  scrolled?: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { width, height } = useWindowDimensions();
  const pathname = usePathname();
  const isMobile = width < 768;

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const solid = !floating || scrolled || menuOpen;

  return (
    <View
      className={`z-50 ${solid ? "border-b border-white/10" : ""}`}
      style={
        isWeb
          ? ({
              position: floating ? ("fixed" as any) : ("sticky" as any),
              top: 0,
              left: 0,
              right: 0,
              backgroundColor: solid ? "rgba(11, 15, 13, 0.88)" : "transparent",
              backdropFilter: solid ? "blur(14px)" : "none",
              WebkitBackdropFilter: solid ? "blur(14px)" : "none",
              transition:
                "background-color 0.4s ease, backdrop-filter 0.4s ease",
            } as any)
          : { backgroundColor: tokens.colors.ink }
      }
      accessibilityRole={"banner" as any}
    >
      <View className="px-[6%] py-5 flex-row items-center justify-between max-w-[1280px] mx-auto w-full">
        {/* Wordmark */}
        <Link href="/" asChild>
          <Pressable
            accessibilityRole="link"
            accessibilityLabel="Akuapem Traditional Council home page"
            style={isWeb ? ({ cursor: "pointer" } as any) : undefined}
          >
            <Text className="font-display text-2xl text-ivory tracking-tight">
              Akuapem
            </Text>
            <Text className="font-body-medium text-[9px] uppercase tracking-[3px] text-champagne -mt-0.5">
              Traditional Council
            </Text>
          </Pressable>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <View
            className="flex-row items-center gap-8"
            accessibilityRole={"navigation" as any}
            accessibilityLabel="Main navigation"
          >
            {navItems.slice(0, 4).map((item) => (
              <NavLink key={item.href} item={item} pathname={pathname} />
            ))}
            <NavLink
              item={navItems[5]}
              pathname={pathname}
            />
            <Link href="/subscribe" asChild>
              <Pressable
                className="border border-champagne px-6 py-2.5 min-h-[44px] items-center justify-center active:bg-champagne/20"
                style={
                  isWeb
                    ? ({
                        cursor: "pointer",
                        transition: "background-color 0.3s ease",
                      } as any)
                    : undefined
                }
                accessibilityRole="link"
                accessibilityLabel="Subscribe to updates"
              >
                {({ hovered }: any) => (
                  <Text
                    className={`font-body-medium text-label uppercase tracking-[3px] ${
                      hovered ? "text-ivory" : "text-champagne"
                    }`}
                    style={
                      isWeb
                        ? ({ transition: "color 0.3s ease" } as any)
                        : undefined
                    }
                  >
                    Subscribe
                  </Text>
                )}
              </Pressable>
            </Link>
          </View>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <Pressable
            onPress={() => setMenuOpen(!menuOpen)}
            className="p-2 min-w-[44px] min-h-[44px] items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel={
              menuOpen ? "Close navigation menu" : "Open navigation menu"
            }
            accessibilityState={{ expanded: menuOpen }}
          >
            <FontAwesome
              name={menuOpen ? "times" : "bars"}
              size={22}
              color={tokens.colors.ivory}
            />
          </Pressable>
        )}
      </View>

      {/* Mobile full-screen overlay menu */}
      {isMobile && menuOpen && (
        <View
          className="bg-ink px-[6%] pt-10 pb-16"
          style={{ minHeight: height - 80 }}
          accessibilityRole={"navigation" as any}
          accessibilityLabel="Mobile navigation"
        >
          {navItems.map((item, i) => {
            const active = isActive(pathname, item.href);
            return (
              <Link key={item.href} href={item.href as any} asChild>
                <Pressable
                  onPress={closeMenu}
                  className="py-4 border-b border-white/10 min-h-[44px] flex-row items-baseline justify-between"
                  accessibilityRole="link"
                  accessibilityLabel={item.label}
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    className={`font-display text-4xl ${
                      active ? "text-champagne" : "text-ivory"
                    }`}
                  >
                    {item.label}
                  </Text>
                  <Text className="font-display text-sm text-champagne/60">
                    0{i + 1}
                  </Text>
                </Pressable>
              </Link>
            );
          })}
          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40 mt-10">
            Akropong-Akuapem, Ghana
          </Text>
        </View>
      )}
    </View>
  );
}
