import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";
import { useWindowDimensions, Platform } from "react-native";
import Colors from "@/constants/Colors";

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const { width } = useWindowDimensions();
  const isWeb = Platform.OS === "web";
  const isDesktop = width >= 768;

  // Hide tab bar on desktop web (use header navigation instead)
  const showTabBar = !isWeb || !isDesktop;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.light.tint,
        headerShown: false, // We use our custom header
        tabBarStyle: showTabBar
          ? {
              backgroundColor: "#FFFFFF",
              borderTopColor: "#8B4513",
              borderTopWidth: 0.5,
              paddingBottom: 4,
              height: 60,
            }
          : { display: "none" },
        tabBarLabelStyle: {
          fontFamily: "Inter_500Medium",
          fontSize: 11,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          title: "About",
          tabBarIcon: ({ color }) => <TabBarIcon name="info" color={color} />,
        }}
      />
      <Tabs.Screen
        name="towns"
        options={{
          title: "Towns",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-marker" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="community"
        options={{
          title: "Updates",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="newspaper-o" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="subscribe"
        options={{
          title: "Subscribe",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
      <Tabs.Screen
        name="contact"
        options={{
          title: "Contact",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="envelope" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
