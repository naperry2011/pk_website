import { Stack } from "expo-router";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";

export default function AdminRootLayout() {
  return (
    <ProtectedRoute requiredRole="editor">
      <AdminLayout>
        <Stack screenOptions={{ headerShown: false }} />
      </AdminLayout>
    </ProtectedRoute>
  );
}
