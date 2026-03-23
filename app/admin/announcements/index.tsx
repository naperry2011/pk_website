import { View, ScrollView, Platform, Text } from "react-native";
import { useState, useMemo } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { useAnnouncements } from "@/hooks/useAnnouncements";
import { useResponsive } from "@/hooks/useResponsive";

export default function AnnouncementsList() {
  const [search, setSearch] = useState("");
  const { data: announcements, isLoading } = useAnnouncements();
  const { isMobile } = useResponsive();

  const filtered = useMemo(() => {
    if (!announcements) return [];
    if (!search) return announcements;
    const q = search.toLowerCase();
    return announcements.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.type.toLowerCase().includes(q)
    );
  }, [announcements, search]);

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[1200px] mx-auto w-full">
        <Text style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 3, color: "#d4a843", fontWeight: "700", fontFamily: "Inter_600SemiBold, sans-serif", marginBottom: 8 }}>
          CONTENT MANAGEMENT
        </Text>
        <View className="flex-row items-center justify-between mb-8">
          <H2>Announcements</H2>
          <Button
            title="New"
            onPress={() => router.push("/admin/announcements/new")}
          />
        </View>

        <View className="mb-8">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search announcements..."
          />
        </View>

        <DataTable
          data={filtered}
          columns={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "date", label: "Date" },
          ]}
          onRowPress={(item) => router.push(`/admin/announcements/${item.id}`)}
          loading={isLoading}
          emptyMessage="No announcements found"
        />
      </View>
    </ScrollView>
  );
}
