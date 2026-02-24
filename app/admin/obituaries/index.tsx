import { View, ScrollView, Text, Pressable } from "react-native";
import { useState, useMemo } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { DataTable } from "@/components/admin/DataTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { SearchBar } from "@/components/admin/SearchBar";
import { useObituaries } from "@/hooks/useObituaries";
import type { ApprovalStatus } from "@/lib/database.types";

const tabs: { value: ApprovalStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "approved", label: "Approved" },
  { value: "rejected", label: "Rejected" },
];

export default function ObituariesList() {
  const [statusFilter, setStatusFilter] = useState<ApprovalStatus | "all">("all");
  const [search, setSearch] = useState("");
  const { data: obituaries, isLoading } = useObituaries(
    statusFilter === "all" ? {} : { status: statusFilter }
  );

  const filtered = useMemo(() => {
    if (!obituaries) return [];
    if (!search) return obituaries;
    const q = search.toLowerCase();
    return obituaries.filter((o) => o.name.toLowerCase().includes(q));
  }, [obituaries, search]);

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-5xl">
        <H2 className="mb-4">Obituaries</H2>

        {/* Status Tabs */}
        <View className="flex-row gap-2 mb-4">
          {tabs.map((tab) => (
            <Pressable
              key={tab.value}
              onPress={() => setStatusFilter(tab.value)}
              className={`px-4 py-2 rounded-lg min-h-[44px] items-center justify-center ${
                statusFilter === tab.value
                  ? "bg-green-deep"
                  : "bg-white border border-brown-earth/30"
              }`}
              accessibilityRole="button"
              accessibilityState={{ selected: statusFilter === tab.value }}
              accessibilityLabel={`Filter: ${tab.label}`}
            >
              <Text
                className={`font-body-medium text-sm ${
                  statusFilter === tab.value ? "text-white" : "text-gray-charcoal"
                }`}
              >
                {tab.label}
              </Text>
            </Pressable>
          ))}
        </View>

        <View className="mb-4">
          <SearchBar
            value={search}
            onChangeText={setSearch}
            placeholder="Search by name..."
          />
        </View>

        <DataTable
          data={filtered}
          columns={[
            { key: "name", label: "Name" },
            { key: "funeral_date", label: "Funeral Date" },
            {
              key: "status",
              label: "Status",
              render: (item) => <StatusBadge status={item.status} />,
            },
          ]}
          onRowPress={(item) => router.push(`/admin/obituaries/${item.id}`)}
          loading={isLoading}
          emptyMessage="No obituaries found"
        />
      </View>
    </ScrollView>
  );
}
