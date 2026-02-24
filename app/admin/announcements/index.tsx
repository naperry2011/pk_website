import { View, ScrollView } from "react-native";
import { useState, useMemo } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/admin/DataTable";
import { SearchBar } from "@/components/admin/SearchBar";
import { useAnnouncements } from "@/hooks/useAnnouncements";

export default function AnnouncementsList() {
  const [search, setSearch] = useState("");
  const { data: announcements, isLoading } = useAnnouncements();

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
      <View className="p-4 max-w-5xl">
        <View className="flex-row items-center justify-between mb-4">
          <H2>Announcements</H2>
          <Button
            title="New"
            onPress={() => router.push("/admin/announcements/new")}
          />
        </View>

        <View className="mb-4">
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
