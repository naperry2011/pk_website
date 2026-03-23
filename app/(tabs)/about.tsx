import { View, Text, StyleSheet, Platform, Image } from "react-native";
import Head from "expo-router/head";
import { PageLayout } from "@/components/layout";
import { FontAwesome } from "@expo/vector-icons";
import { paramountKing, councilHistory } from "@/constants/mockData";
import { AnimateOnScroll } from "@/components/ui/AnimateOnScroll";
import { useResponsive } from "@/hooks/useResponsive";

export default function AboutScreen() {
  const { isMobile } = useResponsive();

  // Break history text into paragraphs
  const historyText = councilHistory.summary;
  const midPoint = historyText.indexOf(". ", Math.floor(historyText.length / 2)) + 2;
  const historyParagraphs = [
    historyText.substring(0, midPoint),
    historyText.substring(midPoint),
  ];

  return (
    <PageLayout>
      <Head>
        <title>About the Council - Akuapem Traditional Council</title>
        <meta name="description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
        <meta property="og:title" content="About the Council - Akuapem Traditional Council" />
        <meta property="og:description" content="Learn about the history, leadership, and structure of the Akuapem Traditional Council." />
      </Head>

      {/* Hero */}
      <View style={[styles.hero, { paddingVertical: isMobile ? 60 : 100 }]}>
        <View style={styles.heroInner}>
          <Text style={styles.heroLabel}>ABOUT US</Text>
          <Text style={[styles.heroTitle, { fontSize: isMobile ? 36 : 48, lineHeight: isMobile ? 44 : 58 }]}>
            About the Council
          </Text>
          <Text style={styles.heroSubtitle}>
            Discover the rich history and leadership of the Akuapem Traditional Council
          </Text>
        </View>
      </View>

      {/* History Section — Two column layout */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={[styles.twoCol, isMobile && styles.twoColMobile]}>
              {/* Image */}
              <View style={[styles.historyImage, isMobile && styles.historyImageMobile]}>
                <View style={{ borderRadius: 12, overflow: "hidden" }}>
                  <Image
                    source={require("@/assets/images/about/historic-monument.jpg")}
                    style={{ height: isMobile ? 280 : 400, width: "100%", borderRadius: 12 }}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Text */}
              <View style={[styles.historyText, isMobile && styles.historyTextMobile]}>
                <Text style={styles.sectionLabel}>OUR HISTORY</Text>
                <Text style={[styles.sectionTitle, { fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 36 : 47 }]}>
                  Centuries of Heritage
                </Text>
                {historyParagraphs.map((para, i) => (
                  <Text key={i} style={styles.bodyText}>{para}</Text>
                ))}
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Our Structure */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.centeredHeading}>
              <Text style={styles.sectionLabel}>GOVERNANCE</Text>
              <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 36 : 47 }]}>
                Our Structure
              </Text>
              <Text style={styles.structureDesc}>
                The council is led by the Omanhene (Paramount Chief), supported by
                17 divisional and sub-divisional chiefs, queen mothers, and elders.
              </Text>
            </View>

            {/* Visual Hierarchy */}
            <View style={styles.hierarchyContainer}>
              {/* Omanhene */}
              <View style={styles.hierarchyBoxPrimary}>
                <Text style={styles.hierarchyTitlePrimary}>Omanhene</Text>
                <Text style={styles.hierarchySubPrimary}>Paramount Chief</Text>
              </View>

              <View style={styles.connector} />

              {/* Second Level */}
              <View style={[styles.hierarchyRow, isMobile && styles.hierarchyRowMobile]}>
                <View style={styles.hierarchyBoxSecondary}>
                  <Text style={styles.hierarchyTitleSecondary}>Divisional Chiefs</Text>
                </View>
                <View style={styles.hierarchyBoxSecondary}>
                  <Text style={styles.hierarchyTitleSecondary}>Queen Mothers</Text>
                </View>
              </View>

              <View style={styles.connector} />

              {/* Elders */}
              <View style={styles.hierarchyBoxTertiary}>
                <Text style={styles.hierarchyTitleTertiary}>Elders</Text>
              </View>

              <View style={styles.connector} />

              {/* Committees */}
              <View style={[styles.committeeRow, isMobile && styles.committeeRowMobile]}>
                {["Chieftaincy", "Land", "Development", "Cultural Affairs"].map((committee) => (
                  <View key={committee} style={styles.committeeBox}>
                    <Text style={styles.committeeText}>{committee}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Leadership / Royal Portrait Section */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100 }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={[styles.twoCol, isMobile && styles.twoColMobile]}>
              {/* Portrait */}
              <View style={[styles.portraitImage, isMobile && styles.portraitImageMobile]}>
                <View style={{ borderRadius: 12, overflow: "hidden" }}>
                  <Image
                    source={require("@/assets/images/about/okuapehene-portrait.jpg")}
                    style={{ height: isMobile ? 350 : 480, width: "100%", borderRadius: 12 }}
                    resizeMode="cover"
                  />
                </View>
              </View>

              {/* Bio */}
              <View style={[styles.portraitText, isMobile && styles.portraitTextMobile]}>
                <Text style={styles.sectionLabel}>OKUAPEHENE</Text>
                <Text style={[styles.pkName, { fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 34 : 43 }]}>
                  {paramountKing.name}
                </Text>
                <Text style={styles.pkTitle}>
                  President, Akuapem Traditional Council
                </Text>
                <View style={styles.goldDivider} />
                <Text style={styles.bodyText}>
                  {paramountKing.biography}
                </Text>
                <View style={styles.enstoolmentBadge}>
                  <Text style={styles.enstoolmentLabel}>Enstooled</Text>
                  <Text style={styles.enstoolmentDate}>
                    {new Date(paramountKing.enstoolmentDate).toLocaleDateString(
                      "en-GB",
                      { day: "numeric", month: "long", year: "numeric" }
                    )}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </AnimateOnScroll>
      </View>

      {/* Our Role, Vision & Mission */}
      <View style={[styles.section, { paddingVertical: isMobile ? 60 : 100, backgroundColor: "#f5f2eb" }]}>
        <AnimateOnScroll>
          <View style={styles.sectionInner}>
            <View style={styles.centeredHeading}>
              <Text style={styles.sectionLabel}>OUR PURPOSE</Text>
              <Text style={[styles.sectionTitle, { textAlign: "center", fontSize: isMobile ? 28 : 36, lineHeight: isMobile ? 36 : 47 }]}>
                Role, Vision & Mission
              </Text>
            </View>

            <View style={[styles.cardsRow, isMobile && styles.cardsRowMobile]}>
              {/* Our Role */}
              <AnimateOnScroll delay={0}>
                <View style={[styles.purposeCard, isMobile && styles.purposeCardMobile]}>
                  <View style={[styles.purposeIcon, { backgroundColor: "rgba(26, 86, 50, 0.1)" }]}>
                    <FontAwesome name="balance-scale" size={24} color="#1a5632" />
                  </View>
                  <Text style={styles.purposeTitle}>Our Role</Text>
                  <Text style={styles.purposeText}>
                    The governing traditional institution responsible for
                    installation of chiefs, dispute resolution, land
                    administration, and unifying all towns under its jurisdiction.
                  </Text>
                </View>
              </AnimateOnScroll>

              {/* Our Vision */}
              <AnimateOnScroll delay={100}>
                <View style={[styles.purposeCard, isMobile && styles.purposeCardMobile]}>
                  <View style={[styles.purposeIcon, { backgroundColor: "rgba(212, 168, 67, 0.1)" }]}>
                    <FontAwesome name="eye" size={24} color="#d4a843" />
                  </View>
                  <Text style={styles.purposeTitle}>Our Vision</Text>
                  <Text style={styles.purposeText}>
                    To preserve and promote our cultural identity, peace, and unity
                    while fostering development and progress for future generations.
                  </Text>
                </View>
              </AnimateOnScroll>

              {/* Our Mission */}
              <AnimateOnScroll delay={200}>
                <View style={[styles.purposeCard, isMobile && styles.purposeCardMobile]}>
                  <View style={[styles.purposeIcon, { backgroundColor: "rgba(30, 77, 139, 0.1)" }]}>
                    <FontAwesome name="flag" size={24} color="#1E4D8B" />
                  </View>
                  <Text style={styles.purposeTitle}>Our Mission</Text>
                  <View style={{ gap: 8 }}>
                    {[
                      "Uphold customs and traditions",
                      "Promote peaceful coexistence and justice",
                      "Collaborate with government and stakeholders for community development",
                    ].map((item) => (
                      <View key={item} style={styles.missionItem}>
                        <View style={styles.missionDot} />
                        <Text style={styles.missionText}>{item}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </AnimateOnScroll>
            </View>
          </View>
        </AnimateOnScroll>
      </View>
    </PageLayout>
  );
}

const styles = StyleSheet.create({
  hero: {
    backgroundColor: "#1a5632",
    paddingHorizontal: "8%",
  },
  heroInner: {
    maxWidth: 700,
    marginHorizontal: "auto",
    alignItems: "center",
  },
  heroLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 16,
  },
  heroTitle: {
    color: "#ffffff",
    fontFamily: "PlayfairDisplay_700Bold, serif",
    textAlign: "center",
    marginBottom: 16,
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 18,
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 28,
  },
  section: {
    paddingHorizontal: "8%",
    backgroundColor: "#ffffff",
  },
  sectionInner: {
    maxWidth: 1200,
    marginHorizontal: "auto",
    width: "100%",
  },
  sectionLabel: {
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 3,
    color: "#d4a843",
    fontWeight: "700",
    fontFamily: "Inter_600SemiBold, sans-serif",
    marginBottom: 12,
  },
  sectionTitle: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 20,
  },
  centeredHeading: {
    alignItems: "center",
    marginBottom: 40,
  },
  bodyText: {
    fontSize: 16,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 26,
    marginBottom: 16,
  },

  // Two column layout
  twoCol: {
    flexDirection: "row",
    gap: 48,
    alignItems: "center",
  },
  twoColMobile: {
    flexDirection: "column",
    gap: 32,
  },
  historyImage: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  historyImageMobile: {
    width: "100%",
  },
  historyText: {
    flex: 1,
  },
  historyTextMobile: {
    width: "100%",
  },

  // Structure
  structureDesc: {
    fontSize: 16,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    maxWidth: 600,
    lineHeight: 26,
  },
  hierarchyContainer: {
    alignItems: "center",
    marginTop: 32,
  },
  hierarchyBoxPrimary: {
    backgroundColor: "#d4a843",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 12,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  hierarchyTitlePrimary: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
  hierarchySubPrimary: {
    color: "rgba(255, 255, 255, 0.85)",
    fontSize: 14,
    textAlign: "center",
    fontFamily: "Inter_400Regular, sans-serif",
  },
  connector: {
    width: 2,
    height: 32,
    backgroundColor: "#d4a843",
  },
  hierarchyRow: {
    flexDirection: "row",
    gap: 16,
  },
  hierarchyRowMobile: {
    flexDirection: "column",
    alignItems: "center",
  },
  hierarchyBoxSecondary: {
    backgroundColor: "#1a5632",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
  },
  hierarchyTitleSecondary: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  hierarchyBoxTertiary: {
    backgroundColor: "#1E4D8B",
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
  },
  hierarchyTitleTertiary: {
    color: "#ffffff",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
  committeeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 12,
  },
  committeeRowMobile: {
    flexDirection: "column",
    alignItems: "center",
  },
  committeeBox: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    borderColor: "#d4a843",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
  },
  committeeText: {
    color: "#d4a843",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    textAlign: "center",
  },

  // Portrait section
  portraitImage: {
    flex: 1,
    borderRadius: 12,
    overflow: "hidden",
  },
  portraitImageMobile: {
    width: "100%",
  },
  portraitText: {
    flex: 1,
  },
  portraitTextMobile: {
    width: "100%",
  },
  pkName: {
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    marginBottom: 8,
  },
  pkTitle: {
    fontSize: 16,
    color: "#d4a843",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
    marginBottom: 16,
  },
  goldDivider: {
    width: 60,
    height: 2,
    backgroundColor: "#d4a843",
    marginBottom: 20,
  },
  enstoolmentBadge: {
    backgroundColor: "#f5f2eb",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 8,
  },
  enstoolmentLabel: {
    fontSize: 12,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    marginBottom: 4,
  },
  enstoolmentDate: {
    fontSize: 15,
    color: "#2d2d2d",
    fontFamily: "Inter_600SemiBold, sans-serif",
    fontWeight: "600",
  },

  // Purpose cards
  cardsRow: {
    flexDirection: "row",
    gap: 24,
  },
  cardsRowMobile: {
    flexDirection: "column",
  },
  purposeCard: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(212, 168, 67, 0.2)",
    padding: 28,
    alignItems: "center",
  },
  purposeCardMobile: {
    marginBottom: 16,
  },
  purposeIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },
  purposeTitle: {
    fontSize: 22,
    fontFamily: "PlayfairDisplay_700Bold, serif",
    color: "#2d2d2d",
    textAlign: "center",
    marginBottom: 12,
  },
  purposeText: {
    fontSize: 15,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    textAlign: "center",
    lineHeight: 24,
  },
  missionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  missionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#d4a843",
    marginTop: 6,
  },
  missionText: {
    flex: 1,
    fontSize: 15,
    color: "#6b6b6b",
    fontFamily: "Inter_400Regular, sans-serif",
    lineHeight: 24,
  },
});
