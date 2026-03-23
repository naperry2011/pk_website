import { useState } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { H2, Body } from "@/components/ui/Typography";

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
      router.replace("/admin");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
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
          <View
            className="bg-white rounded-2xl p-8 md:p-10 w-full max-w-[400px]"
            style={
              Platform.OS === "web"
                ? {
                    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.12)",
                    borderWidth: 1,
                    borderColor: "rgba(212, 168, 67, 0.15)",
                  }
                : undefined
            }
          >
            <View className="items-center mb-6">
              <View className="w-20 h-20 bg-gold rounded-full items-center justify-center mb-4">
                <Text className="text-white font-bold text-2xl">AK</Text>
              </View>
              <View
                style={{
                  width: 60,
                  height: 2,
                  backgroundColor: "#d4a843",
                  marginBottom: 16,
                }}
              />
              <H2 className="text-center font-heading-bold">Admin Login</H2>
              <Body className="text-center mt-1 opacity-60">
                Akuapem Paramount King Council
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
              label="Email"
              placeholder="admin@example.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              accessibilityHint="Enter your admin email address"
            />

            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoComplete="password"
              accessibilityHint="Enter your password"
            />

            <View className="mt-2">
              <Button
                title="Sign In"
                onPress={handleLogin}
                variant="secondary"
                loading={loading}
                fullWidth
                accessibilityHint="Sign in to the admin dashboard"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
