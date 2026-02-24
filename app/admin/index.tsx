import { View, ScrollView, useWindowDimensions } from "react-native";
import { router } from "expo-router";
import { H2, H3, Body } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/admin/StatsCard";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { DataTable } from "@/components/admin/DataTable";
import { useDashboardStats } from "@/hooks/useDashboardStats";
import { useObituaries } from "@/hooks/useObituaries";
import { useWeddings } from "@/hooks/useWeddings";

export default function AdminDashboard() {
  const { width } = useWindowDimensions();
  const isMobile = width < 768;
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: pendingObits } = useObituaries({ status: "pending" });
  const { data: pendingWeddings } = useWeddings({ status: "pending" });

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-5xl">
        <H2 className="mb-6">Dashboard</H2>

        {/* Stats Grid */}
        <View
          className={`gap-3 mb-6 ${
            isMobile ? "flex-col" : "flex-row flex-wrap"
          }`}
        >
          <StatsCard
            title="Towns"
            value={stats?.towns ?? "-"}
            icon="home"
            color="#1B4D3E"
          />
          <StatsCard
            title="Announcements"
            value={stats?.announcements ?? "-"}
            icon="bullhorn"
            color="#1E4D8B"
          />
          <StatsCard
            title="Pending Obituaries"
            value={stats?.pendingObituaries ?? "-"}
            icon="heart"
            color="#D4AF37"
          />
          <StatsCard
            title="Pending Weddings"
            value={stats?.pendingWeddings ?? "-"}
            icon="bell"
            color="#8B0000"
          />
        </View>

        {/* Pending Approvals */}
        <View className="mb-6">
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

        <View className="mb-6">
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
        <View className="mb-6">
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
