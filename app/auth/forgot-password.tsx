import { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

export default function ForgotPasswordScreen() {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const cardTranslateY = useSharedValue(30);
  const cardOpacity = useSharedValue(0);

  useEffect(() => {
    cardTranslateY.value = withTiming(0, { duration: 600 });
    cardOpacity.value = withTiming(1, { duration: 600 });
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  async function handleReset() {
    if (!email) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      await resetPassword(email);
      setSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to send reset email. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.outerContainer}>
      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerColumn}>
            {/* Back arrow */}
            <Pressable
              onPress={() => router.back()}
              style={styles.backButton}
              accessibilityRole="link"
              accessibilityLabel="Back to login"
            >
              <FontAwesome name="arrow-left" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.backText}>Back to Login</Text>
            </Pressable>

            <Animated.View
              style={[
                styles.card,
                cardStyle,
                Platform.OS === "web"
                  ? { boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2)" }
                  : undefined,
              ]}
            >
              {sent ? (
                <View style={styles.successContent}>
                  <View style={styles.successCircle}>
                    <FontAwesome name="check" size={32} color="#1a5632" />
                  </View>
                  <Text style={styles.successTitle}>Check Your Email</Text>
                  <Text style={styles.successBody}>
                    We've sent a password reset link to{" "}
                    <Text style={styles.emailHighlight}>{email}</Text>.
                    Click the link in the email to set a new password.
                  </Text>
                  <Text style={styles.successHint}>
                    Didn't receive it? Check your spam folder or try again.
                  </Text>
                  <View style={{ width: "100%", paddingHorizontal: 32, marginTop: 24 }}>
                    <Button
                      title="Back to Login"
                      onPress={() => router.replace("/auth/login" as any)}
                      variant="secondary"
                      fullWidth
                    />
                  </View>
                </View>
              ) : (
                <>
                  <View style={styles.cardHeader}>
                    <View style={styles.iconCircle}>
                      <FontAwesome name="envelope-o" size={22} color="#d4a843" />
                    </View>
                    <Text style={styles.cardTitle}>Reset Password</Text>
                    <Text style={styles.cardSubtitle}>
                      Enter your email and we'll send you a secure link to reset your password.
                    </Text>
                  </View>

                  <View style={styles.dividerRow}>
                    <View style={styles.dividerLine} />
                    <View style={styles.dividerDiamond}>
                      <FontAwesome name="diamond" size={8} color="#d4a843" />
                    </View>
                    <View style={styles.dividerLine} />
                  </View>

                  {error ? (
                    <View style={styles.errorBox}>
                      <FontAwesome name="exclamation-circle" size={14} color="#8B0000" />
                      <Text style={styles.errorText}>{error}</Text>
                    </View>
                  ) : null}

                  <View style={styles.formArea}>
                    <Input
                      label="Email Address"
                      placeholder="you@akuapemcouncil.org"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoComplete="email"
                    />

                    <View style={{ marginTop: 8 }}>
                      <Button
                        title="Send Reset Link"
                        onPress={handleReset}
                        variant="primary"
                        loading={loading}
                        fullWidth
                      />
                    </View>
                  </View>

                  <View style={styles.cardFooter}>
                    <FontAwesome name="lock" size={12} color="rgba(107, 107, 107, 0.5)" />
                    <Text style={styles.footerText}>
                      Secure password reset via Supabase
                    </Text>
                  </View>
                </>
              )}
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: { flex: 1 },
  outerContainer: {
    flex: 1,
    backgroundColor: "#1a5632",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  centerColumn: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    alignSelf: "flex-start",
    marginBottom: 24,
    paddingVertical: 8,
    maxWidth: 420,
    width: "100%",
  },
  backText: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "Inter_500Medium, sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    width: "100%",
    maxWidth: 420,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.12)",
  },
  cardHeader: {
    alignItems: "center",
    paddingTop: 32,
    paddingHorizontal: 32,
    paddingBottom: 16,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  cardSubtitle: {
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
    color: "#6b6b6b",
    textAlign: "center",
    lineHeight: 20,
  },
  dividerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 32,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(212, 168, 67, 0.15)",
  },
  dividerDiamond: { marginHorizontal: 12 },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(139, 0, 0, 0.06)",
    borderWidth: 1,
    borderColor: "rgba(139, 0, 0, 0.15)",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 14,
    marginHorizontal: 32,
    marginBottom: 8,
  },
  errorText: {
    color: "#8B0000",
    fontSize: 13,
    fontFamily: "Inter_400Regular, sans-serif",
    flex: 1,
  },
  formArea: {
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 6,
    paddingVertical: 16,
    marginTop: 8,
    marginHorizontal: 32,
    borderTopWidth: 1,
    borderTopColor: "rgba(212, 168, 67, 0.1)",
  },
  footerText: {
    fontSize: 11,
    color: "rgba(107, 107, 107, 0.5)",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  // Success state
  successContent: {
    alignItems: "center",
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  successCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(26, 86, 50, 0.08)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  successTitle: {
    fontSize: 22,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 12,
  },
  successBody: {
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
    color: "#6b6b6b",
    textAlign: "center",
    lineHeight: 22,
    marginBottom: 8,
  },
  emailHighlight: {
    fontFamily: "Inter_600SemiBold, sans-serif",
    color: "#2d2d2d",
  },
  successHint: {
    fontSize: 12,
    color: "rgba(107, 107, 107, 0.6)",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
  },
});
