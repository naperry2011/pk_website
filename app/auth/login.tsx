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

export default function LoginScreen() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Entrance animations
  const logoScale = useSharedValue(0.5);
  const logoOpacity = useSharedValue(0);
  const cardTranslateY = useSharedValue(40);
  const cardOpacity = useSharedValue(0);
  const taglineOpacity = useSharedValue(0);

  useEffect(() => {
    logoScale.value = withTiming(1, { duration: 700 });
    logoOpacity.value = withTiming(1, { duration: 700 });
    cardTranslateY.value = withDelay(300, withTiming(0, { duration: 600 }));
    cardOpacity.value = withDelay(300, withTiming(1, { duration: 600 }));
    taglineOpacity.value = withDelay(600, withTiming(1, { duration: 500 }));
  }, []);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [{ scale: logoScale.value }],
  }));

  const cardStyle = useAnimatedStyle(() => ({
    opacity: cardOpacity.value,
    transform: [{ translateY: cardTranslateY.value }],
  }));

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
  }));

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
    <View style={styles.outerContainer}>
      {/* Background pattern overlay */}
      <View style={styles.patternOverlay} />

      <KeyboardAvoidingView
        style={styles.flex1}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.centerColumn}>
            {/* Top branding area */}
            <Animated.View style={[styles.brandingArea, logoStyle]}>
              {/* Gold seal */}
              <View style={styles.sealOuter}>
                <View style={styles.sealInner}>
                  <Text style={styles.sealLabel}>AKUAPEM</Text>
                  <Text style={styles.sealLetters}>AK</Text>
                  <Text style={styles.sealLabel}>COUNCIL</Text>
                </View>
              </View>

              <View style={styles.goldBar} />

              <Text style={styles.brandTitle}>Akuapem Traditional Council</Text>

              <Animated.View style={taglineStyle}>
                <Text style={styles.brandTagline}>Heritage. Unity. Progress.</Text>
              </Animated.View>
            </Animated.View>

            {/* Login card */}
            <Animated.View
              style={[
                styles.card,
                cardStyle,
                Platform.OS === "web"
                  ? {
                      boxShadow: "0px 16px 48px rgba(0, 0, 0, 0.2)",
                    }
                  : undefined,
              ]}
            >
              {/* Card header */}
              <View style={styles.cardHeader}>
                <View style={styles.shieldIcon}>
                  <FontAwesome name="shield" size={18} color="#d4a843" />
                </View>
                <Text style={styles.cardTitle}>Admin Portal</Text>
                <Text style={styles.cardSubtitle}>
                  Authorized personnel only. Sign in to manage the council's digital presence.
                </Text>
              </View>

              {/* Gold divider */}
              <View style={styles.dividerRow}>
                <View style={styles.dividerLine} />
                <View style={styles.dividerDiamond}>
                  <FontAwesome name="diamond" size={8} color="#d4a843" />
                </View>
                <View style={styles.dividerLine} />
              </View>

              {/* Error */}
              {error ? (
                <View style={styles.errorBox}>
                  <FontAwesome name="exclamation-circle" size={14} color="#8B0000" />
                  <Text style={styles.errorText}>{error}</Text>
                </View>
              ) : null}

              {/* Form */}
              <View style={styles.formArea}>
                <Input
                  label="Email Address"
                  placeholder="you@akuapemcouncil.org"
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

                <View style={{ marginTop: 8 }}>
                  <Button
                    title="Sign In to Portal"
                    onPress={handleLogin}
                    variant="primary"
                    loading={loading}
                    fullWidth
                    accessibilityHint="Sign in to the admin dashboard"
                  />
                </View>

                <Pressable
                  onPress={() => router.push("/auth/forgot-password" as any)}
                  style={({ hovered }: any) => [
                    styles.forgotLink,
                    hovered && styles.forgotLinkHover,
                  ]}
                  accessibilityRole="link"
                  accessibilityLabel="Forgot your password?"
                >
                  <Text style={styles.forgotText}>Forgot your password?</Text>
                </Pressable>
              </View>

              {/* Card footer */}
              <View style={styles.cardFooter}>
                <FontAwesome name="lock" size={12} color="rgba(107, 107, 107, 0.5)" />
                <Text style={styles.footerText}>
                  Protected by Supabase Authentication
                </Text>
              </View>
            </Animated.View>

            {/* Bottom tagline */}
            <Animated.View style={[styles.bottomArea, taglineStyle]}>
              <Text style={styles.bottomText}>
                Akropong-Akuapem, Eastern Region, Ghana
              </Text>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  flex1: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    backgroundColor: "#1a5632",
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "transparent",
    opacity: 0.03,
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

  // Branding
  brandingArea: {
    alignItems: "center",
    marginBottom: 32,
  },
  sealOuter: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#d4a843",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    borderWidth: 3,
    borderColor: "rgba(240, 230, 200, 0.4)",
  },
  sealInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#1a5632",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1.5,
    borderColor: "rgba(212, 168, 67, 0.4)",
  },
  sealLabel: {
    color: "#d4a843",
    fontSize: 8,
    fontFamily: "Inter_600SemiBold, sans-serif",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  sealLetters: {
    color: "rgba(240, 230, 200, 0.9)",
    fontSize: 28,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    fontWeight: "700",
    lineHeight: 34,
  },
  goldBar: {
    width: 48,
    height: 2,
    backgroundColor: "#d4a843",
    marginBottom: 16,
  },
  brandTitle: {
    color: "#ffffff",
    fontSize: 20,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 8,
  },
  brandTagline: {
    color: "rgba(212, 168, 67, 0.8)",
    fontSize: 12,
    fontFamily: "Inter_600SemiBold, sans-serif",
    letterSpacing: 3,
    textTransform: "uppercase",
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
  shieldIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(212, 168, 67, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
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

  // Divider
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
  dividerDiamond: {
    marginHorizontal: 12,
  },

  // Form
  formArea: {
    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  forgotLink: {
    alignItems: "center",
    paddingVertical: 12,
    marginTop: 4,
    ...(Platform.OS === "web"
      ? { cursor: "pointer", transition: "opacity 0.2s ease" }
      : {}),
  } as any,
  forgotLinkHover: {
    opacity: 0.7,
  },
  forgotText: {
    color: "#d4a843",
    fontSize: 14,
    fontFamily: "Inter_500Medium, sans-serif",
    fontWeight: "500",
  },

  // Error
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

  // Footer
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

  // Bottom
  bottomArea: {
    marginTop: 24,
    alignItems: "center",
  },
  bottomText: {
    color: "rgba(255, 255, 255, 0.35)",
    fontSize: 12,
    fontFamily: "Inter_400Regular, sans-serif",
  },
});
