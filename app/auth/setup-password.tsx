import { useState, useEffect } from "react";
import { View, Text, ScrollView, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { router } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FontAwesome } from "@expo/vector-icons";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from "react-native-reanimated";

export default function SetupPasswordScreen() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const cardTranslateY = useSharedValue(30);
  const cardOpacity = useSharedValue(0);
  const welcomeOpacity = useSharedValue(0);

  useEffect(() => {
    cardTranslateY.value = withTiming(0, { duration: 600 });
    cardOpacity.value = withTiming(1, { duration: 600 });
    welcomeOpacity.value = withDelay(400, withTiming(1, { duration: 500 }));
  }, []);

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const welcomeStyle = useAnimatedStyle(() => ({
    opacity: welcomeOpacity.value,
  }));

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
            {/* Welcome message above card */}
            <Animated.View style={[styles.welcomeArea, welcomeStyle]}>
              <View style={styles.sealSmall}>
                <Text style={styles.sealText}>AK</Text>
              </View>
              <Text style={styles.welcomeTitle}>Akwaaaba — Welcome!</Text>
              <Text style={styles.welcomeSubtitle}>
                You've been invited to the Akuapem Traditional Council team
              </Text>
            </Animated.View>

            <Animated.View
              style={[
                styles.card,
                cardStyle,
                Platform.OS === "web"
                  ? { boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2)" }
                  : undefined,
              ]}
            >
              <View style={styles.cardHeader}>
                <View style={styles.iconCircle}>
                  <FontAwesome name="key" size={20} color="#d4a843" />
                </View>
                <Text style={styles.cardTitle}>Set Your Password</Text>
                <Text style={styles.cardSubtitle}>
                  Choose a secure password to protect your admin account.
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
                  label="Password"
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  autoComplete="new-password"
                  accessibilityHint="Enter your new password"
                />

                <Input
                  label="Confirm Password"
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  autoComplete="new-password"
                  accessibilityHint="Re-enter your password to confirm"
                />

                {/* Password requirements */}
                <View style={styles.requirements}>
                  <View style={styles.reqItem}>
                    <FontAwesome
                      name={password.length >= 8 ? "check-circle" : "circle-o"}
                      size={14}
                      color={password.length >= 8 ? "#1a5632" : "#6b6b6b"}
                    />
                    <Text style={[styles.reqText, password.length >= 8 && styles.reqMet]}>
                      At least 8 characters
                    </Text>
                  </View>
                  <View style={styles.reqItem}>
                    <FontAwesome
                      name={password && password === confirmPassword ? "check-circle" : "circle-o"}
                      size={14}
                      color={password && password === confirmPassword ? "#1a5632" : "#6b6b6b"}
                    />
                    <Text style={[styles.reqText, password && password === confirmPassword && styles.reqMet]}>
                      Passwords match
                    </Text>
                  </View>
                </View>

                <View style={{ marginTop: 12 }}>
                  <Button
                    title="Create Account & Continue"
                    onPress={handleSetPassword}
                    variant="primary"
                    loading={loading}
                    fullWidth
                    accessibilityHint="Set your password and continue to the admin dashboard"
                  />
                </View>
              </View>

              <View style={styles.cardFooter}>
                <FontAwesome name="lock" size={12} color="rgba(107, 107, 107, 0.5)" />
                <Text style={styles.footerText}>
                  Your password is encrypted and secure
                </Text>
              </View>
            </Animated.View>

            <Animated.View style={[styles.bottomArea, welcomeStyle]}>
              <Text style={styles.bottomText}>Heritage. Unity. Progress.</Text>
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

  // Welcome
  welcomeArea: {
    alignItems: "center",
    marginBottom: 28,
  },
  sealSmall: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#d4a843",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  sealText: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
  },
  welcomeTitle: {
    color: "#ffffff",
    fontSize: 22,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: 14,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 20,
  },

  // Card
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
  requirements: {
    gap: 8,
    marginTop: 4,
    marginBottom: 4,
  },
  reqItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  reqText: {
    fontSize: 13,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  reqMet: {
    color: "#1a5632",
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
  bottomArea: {
    marginTop: 24,
    alignItems: "center",
  },
  bottomText: {
    color: "rgba(212, 168, 67, 0.5)",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold, sans-serif",
    letterSpacing: 3,
    textTransform: "uppercase",
  },
});
