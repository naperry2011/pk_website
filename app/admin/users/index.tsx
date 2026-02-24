import { View, ScrollView, Text, Pressable } from "react-native";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/admin/DataTable";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { useProfiles, useUpdateProfile } from "@/hooks/useProfiles";
import type { UserRole } from "@/lib/database.types";

function RoleToggle({
  role,
  userId,
}: {
  role: UserRole;
  userId: string;
}) {
  const updateProfile = useUpdateProfile();

  const toggleRole = async () => {
    const newRole: UserRole = role === "admin" ? "editor" : "admin";
    await updateProfile.mutateAsync({
      id: userId,
      data: { role: newRole },
    });
  };

  return (
    <Pressable
      onPress={toggleRole}
      className={`px-3 py-1 rounded-full self-start min-h-[36px] items-center justify-center ${
        role === "admin" ? "bg-green-deep" : "bg-gold"
      }`}
      accessibilityRole="button"
      accessibilityLabel={`Role: ${role}. Tap to toggle.`}
    >
      <Text className="font-body-medium text-xs text-white">
        {role === "admin" ? "Admin" : "Editor"}
      </Text>
    </Pressable>
  );
}

function UsersContent() {
  const { data: profiles, isLoading } = useProfiles();

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-5xl">
        <View className="flex-row items-center justify-between mb-4">
          <H2>Users</H2>
          <Button
            title="Invite User"
            onPress={() => router.push("/admin/users/invite")}
          />
        </View>

        <DataTable
          data={profiles ?? []}
          columns={[
            { key: "full_name", label: "Name" },
            { key: "email", label: "Email" },
            {
              key: "role",
              label: "Role",
              render: (item) => (
                <RoleToggle role={item.role} userId={item.id} />
              ),
            },
          ]}
          loading={isLoading}
          emptyMessage="No users found"
        />
      </View>
    </ScrollView>
  );
}

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersContent />
    </ProtectedRoute>
  );
}
