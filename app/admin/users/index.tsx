import { View, ScrollView, Text, Pressable, Platform } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/admin/DataTable";
import { ConfirmDialog } from "@/components/admin/ConfirmDialog";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { useProfiles, useUpdateProfile, useDeleteUser } from "@/hooks/useProfiles";
import { useAuth } from "@/context/AuthContext";
import { useResponsive } from "@/hooks/useResponsive";
import type { UserRole, Profile } from "@/lib/database.types";

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
    await updateProfile.mutateAsync({ id: userId, role: newRole });
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
  const { session } = useAuth();
  const deleteMutation = useDeleteUser();
  const [deleteTarget, setDeleteTarget] = useState<Profile | null>(null);
  const { isMobile } = useResponsive();

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteMutation.mutateAsync(deleteTarget.id);
    } catch (_e) {
      // Error handled by mutation state
    }
    setDeleteTarget(null);
  };

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-6 md:p-8 max-w-[1200px] mx-auto w-full">
        <Text style={{ fontSize: 13, textTransform: "uppercase", letterSpacing: 3, color: "#d4a843", fontWeight: "700", fontFamily: "Inter_600SemiBold, sans-serif", marginBottom: 8 }}>
          USER MANAGEMENT
        </Text>
        <View className="flex-row items-center justify-between mb-8">
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
            {
              key: "id",
              label: "",
              render: (item) =>
                item.id !== session?.user?.id ? (
                  <Pressable
                    onPress={() => setDeleteTarget(item)}
                    className="px-3 py-1 rounded-full bg-red-kente/10 self-start min-h-[36px] items-center justify-center"
                    accessibilityRole="button"
                    accessibilityLabel={`Delete ${item.full_name || item.email}`}
                  >
                    <Text className="font-body-medium text-xs text-red-kente">
                      Delete
                    </Text>
                  </Pressable>
                ) : null,
            },
          ]}
          loading={isLoading}
          emptyMessage="No users found"
        />
      </View>

      <ConfirmDialog
        visible={!!deleteTarget}
        title="Delete User"
        message={`Are you sure you want to delete ${deleteTarget?.full_name || deleteTarget?.email}? This action cannot be undone.`}
        confirmLabel="Delete"
        variant="danger"
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
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
