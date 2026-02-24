import {
  View,
  Text,
  Pressable,
  ScrollView,
  useWindowDimensions,
  Platform,
} from "react-native";
import { useState, useCallback, ReactNode } from "react";
import { Link, usePathname } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: "tachometer" as const },
  { href: "/admin/announcements", label: "Announcements", icon: "bullhorn" as const },
  { href: "/admin/obituaries", label: "Obituaries", icon: "heart" as const },
  { href: "/admin/weddings", label: "Weddings", icon: "bell" as const },
  { href: "/admin/towns", label: "Towns", icon: "home" as const },
  { href: "/admin/users", label: "Users", icon: "users" as const },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/admin") return pathname === "/admin";
  return pathname.startsWith(href);
}

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { width } = useWindowDimensions();
  const pathname = usePathname();
  const { session, signOut } = useAuth();
  const isMobile = width < 768;
  const isWeb = Platform.OS === "web";

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const renderSidebarContent = () => (
    <ScrollView className="flex-1">
      {/* Logo */}
      <View className="px-4 py-6 border-b border-white/10 flex-row items-center">
        <View className="w-10 h-10 bg-gold rounded-full items-center justify-center mr-3">
          <Text className="text-white font-bold text-lg">AK</Text>
        </View>
        <View>
          <Text className="font-accent text-base text-gold tracking-wide">
            Akuapem
          </Text>
          <Text className="font-body text-xs text-white/70 -mt-1">
            Admin Panel
          </Text>
        </View>
      </View>

      {/* Nav Items */}
      <View className="py-2">
        {navItems.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <Link key={item.href} href={item.href as any} asChild>
              <Pressable
                onPress={closeDrawer}
                className={`flex-row items-center px-4 py-3 mx-2 rounded-lg min-h-[44px] ${
                  active ? "bg-gold" : ""
                }`}
                accessibilityRole="link"
                accessibilityLabel={item.label}
                accessibilityState={{ selected: active }}
              >
                <FontAwesome
                  name={item.icon}
                  size={18}
                  color={active ? "#1B4D3E" : "#FFFFFF"}
                  style={{ width: 24 }}
                />
                <Text
                  className={`font-body-medium text-base ml-3 ${
                    active ? "text-green-deep" : "text-white"
                  }`}
                >
                  {item.label}
                </Text>
              </Pressable>
            </Link>
          );
        })}
      </View>
    </ScrollView>
  );

  return (
    <View className="flex-1 flex-row bg-gray-warm">
      {/* Desktop Sidebar */}
      {!isMobile && (
        <View
          className="bg-green-deep"
          style={[
            { width: 240 },
            isWeb ? { position: "fixed" as any, top: 0, left: 0, bottom: 0, zIndex: 40 } : undefined,
          ]}
        >
          {renderSidebarContent()}
        </View>
      )}

      {/* Mobile Drawer Overlay */}
      {isMobile && drawerOpen && (
        <Pressable
          onPress={closeDrawer}
          className="absolute inset-0 bg-black/50 z-40"
          accessibilityRole="button"
          accessibilityLabel="Close menu"
        >
          <View
            className="bg-green-deep h-full"
            style={{ width: 240 }}
          >
            <Pressable onPress={(e) => e.stopPropagation()}>
              {renderSidebarContent()}
            </Pressable>
          </View>
        </Pressable>
      )}

      {/* Main Content Area */}
      <View
        className="flex-1"
        style={!isMobile && isWeb ? { marginLeft: 240 } : undefined}
      >
        {/* Top Bar */}
        <View
          className="bg-white border-b border-brown-earth/20 px-4 py-3 flex-row items-center justify-between"
          style={isWeb ? { position: "sticky" as any, top: 0, zIndex: 30 } : undefined}
        >
          <View className="flex-row items-center">
            {isMobile && (
              <Pressable
                onPress={() => setDrawerOpen(!drawerOpen)}
                className="mr-3 min-w-[44px] min-h-[44px] items-center justify-center"
                accessibilityRole="button"
                accessibilityLabel={
                  drawerOpen ? "Close navigation menu" : "Open navigation menu"
                }
              >
                <FontAwesome
                  name={drawerOpen ? "times" : "bars"}
                  size={22}
                  color="#2C3E50"
                />
              </Pressable>
            )}
          </View>

          <View className="flex-row items-center gap-3">
            <Text className="font-body text-sm text-gray-charcoal">
              {session?.user?.email}
            </Text>
            <Pressable
              onPress={signOut}
              className="bg-gray-warm px-3 py-2 rounded-lg min-h-[44px] items-center justify-center"
              accessibilityRole="button"
              accessibilityLabel="Sign out"
            >
              <FontAwesome name="sign-out" size={16} color="#2C3E50" />
            </Pressable>
          </View>
        </View>

        {/* Page Content */}
        <View className="flex-1">{children}</View>
      </View>
    </View>
  );
}
