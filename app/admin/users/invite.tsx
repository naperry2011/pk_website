import { View, ScrollView, Text, Pressable } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { H2 } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import type { UserRole } from "@/lib/database.types";

const roles: { value: UserRole; label: string; desc: string }[] = [
  { value: "editor", label: "Editor", desc: "Can manage content" },
  { value: "admin", label: "Admin", desc: "Full access including user management" },
];

function InviteContent() {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState<UserRole>("editor");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Invite will be handled by the Supabase admin API
      // This is a placeholder for the invite logic
      setSuccess(true);
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <ScrollView className="flex-1 bg-gray-warm">
        <View className="p-4 max-w-2xl items-center py-12">
          <Text className="font-heading-bold text-xl text-green-deep mb-2">
            Invitation Sent
          </Text>
          <Text className="font-body text-base text-gray-charcoal/60 mb-6">
            An invitation has been sent to {email}.
          </Text>
          <Button
            title="Back to Users"
            onPress={() => router.back()}
          />
        </View>
      </ScrollView>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-warm">
      <View className="p-4 max-w-2xl">
        <H2 className="mb-6">Invite User</H2>

        <Input
          label="Email Address"
          value={email}
          onChangeText={setEmail}
          placeholder="user@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Role Selector */}
        <View className="mb-4">
          <Text className="font-body-medium text-gray-charcoal mb-2">Role</Text>
          <View className="gap-2">
            {roles.map((r) => (
              <Pressable
                key={r.value}
                onPress={() => setRole(r.value)}
                className={`flex-row items-center p-4 rounded-lg border min-h-[44px] ${
                  role === r.value
                    ? "bg-green-deep/10 border-green-deep"
                    : "bg-white border-brown-earth/30"
                }`}
                accessibilityRole="button"
                accessibilityState={{ selected: role === r.value }}
                accessibilityLabel={`${r.label}: ${r.desc}`}
              >
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center mr-3 ${
                    role === r.value
                      ? "border-green-deep bg-green-deep"
                      : "border-brown-earth/30"
                  }`}
                >
                  {role === r.value && (
                    <View className="w-2 h-2 rounded-full bg-white" />
                  )}
                </View>
                <View>
                  <Text className="font-body-semibold text-base text-gray-charcoal">
                    {r.label}
                  </Text>
                  <Text className="font-body text-sm text-gray-charcoal/60">
                    {r.desc}
                  </Text>
                </View>
              </Pressable>
            ))}
          </View>
        </View>

        <View className="flex-row gap-3 mt-4">
          <Button
            title="Cancel"
            onPress={() => router.back()}
            variant="outline"
          />
          <Button
            title="Send Invitation"
            onPress={handleSubmit}
            loading={submitting}
            disabled={!email}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default function InviteUserPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <InviteContent />
    </ProtectedRoute>
  );
}
