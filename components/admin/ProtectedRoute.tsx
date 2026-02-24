import { ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import type { UserRole } from "@/lib/database.types";

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: UserRole;
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { session, role, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 bg-green-deep items-center justify-center">
        <ActivityIndicator size="large" color="#D4AF37" />
      </View>
    );
  }

  if (!session) {
    router.replace("/auth/login");
    return null;
  }

  if (requiredRole === "admin" && role !== "admin") {
    router.replace("/admin");
    return null;
  }

  return <>{children}</>;
}
