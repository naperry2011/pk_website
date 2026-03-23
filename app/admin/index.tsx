import { View, ScrollView, Text, Platform } from "react-native";
import { router } from "expo-router";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DataTable } from "@/components/admin/DataTable";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";
import { useResponsive } from "@/hooks/useResponsive";

export default function AdminDashboard() {
  const { isMobile } = useResponsive();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: pendingObits } = useObituaries({ status: "pending" });
  const { data: pendingWeddings } = useWeddings({ status: "pending" });

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[1200px] mx-auto w-full">
        <Text
          style={{
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: 3,
            color: "#d4a843",
            fontWeight: "700",
            fontFamily: "Inter_600SemiBold, sans-serif",
            marginBottom: 8,
          }}
        >
          OVERVIEW
        </Text>
        <H2 className="mb-8">Dashboard</H2>

        {/* Stats Grid */}
        <View
          className={`gap-4 mb-8 ${
            isMobile ? "flex-col" : "flex-row flex-wrap"
          }`}
        >
          <StatsCard
            title="Towns"
            value={stats?.totalTowns ?? "-"}
            icon="home"
            color="#1a5632"
          />
          <StatsCard
            title="Announcements"
            value={stats?.totalAnnouncements ?? "-"}
            icon="bullhorn"
            color="#1E4D8B"
          />
          <StatsCard
            title="Pending Obituaries"
            value={stats?.pendingObituaries ?? "-"}
            icon="heart"
            color="#d4a843"
          />
          <StatsCard
            title="Pending Weddings"
            value={stats?.pendingWeddings ?? "-"}
            icon="bell"
            color="#8B0000"
          />
        </View>

        {/* Pending Approvals */}
        <View className="mb-8">
          <H3 className="mb-3">Pending Obituaries</H3>
          <DataTable
            data={pendingObits ?? []}
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
            loading={statsLoading}
            emptyMessage="No pending obituaries"
          />
        </View>

        <View className="mb-8">
          <H3 className="mb-3">Pending Weddings</H3>
          <DataTable
            data={pendingWeddings ?? []}
            columns={[
              {
                key: "couple",
                label: "Couple",
                render: (item) => (
                  <Body>{`${item.bride} & ${item.groom}`}</Body>
                ),
              },
              { key: "date", label: "Date" },
              {
                key: "status",
                label: "Status",
                render: (item) => <StatusBadge status={item.status} />,
              },
            ]}
            onRowPress={(item) => router.push(`/admin/weddings/${item.id}`)}
            emptyMessage="No pending weddings"
          />
        </View>

        {/* Quick Actions */}
        <View className="mb-8">
          <H3 className="mb-3">Quick Actions</H3>
          <View className={`gap-3 ${isMobile ? "flex-col" : "flex-row"}`}>
            <Button
              title="New Announcement"
              onPress={() => router.push("/admin/announcements/new")}
            />
            <Button
              title="View Towns"
              onPress={() => router.push("/admin/towns")}
              variant="secondary"
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
