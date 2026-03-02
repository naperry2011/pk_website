import { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2, Body } from "@/components/ui/Typography";

export default function SetupPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSetPassword() {
    setError("");

    if (!password || !confirmPassword) {
      setError("Please fill in both password fields.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });
      if (updateError) throw updateError;
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "Failed to set password. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-green-deep"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
        keyboardShouldPersistTaps="handled"
      >
        <View className="flex-1 items-center justify-center px-6 py-12">
          <View className="bg-white rounded-2xl p-8 w-full max-w-[400px] shadow-lg">
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-gold rounded-full items-center justify-center mb-4">
                <Text className="text-white font-bold text-2xl">AK</Text>
              </View>
              <H2 className="text-center">Set Your Password</H2>
              <Body className="text-center mt-1 opacity-60">
                Welcome to the Akuapem Paramount King Council admin panel.
                Please set your password to continue.
              </Body>
            </View>

            {error ? (
              <View className="bg-red-kente/10 border border-red-kente/30 rounded-lg p-3 mb-4">
                <Body className="text-red-kente text-center text-sm">
                  {error}
                </Body>
              </View>
            ) : null}

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="new-password"
              accessibilityHint="Enter your new password"
            />

            <Input
              label="Confirm Password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
              autoComplete="new-password"
              accessibilityHint="Re-enter your password to confirm"
            />

            <View className="mt-2">
              <Button
                title="Set Password"
                onPress={handleSetPassword}
                variant="secondary"
                loading={loading}
                fullWidth
                accessibilityHint="Set your password and continue to the admin dashboard"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
