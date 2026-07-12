import { View, Text, ScrollView, Platform } from "react-native";
import { Fragment } from "react";

const TOWNS = [
  "Akropong",
  "Abiriw",
  "Amanokrom",
  "Awukugua",
  "Berekuso",
  "Tutu",
  "Mamfe",
  "Larteh",
  "Adukrom",
  "Mampong",
  "Obosomase",
  "Apirede",
  "Aseseeso",
  "Dawu",
  "Koforidua",
  "Nsawam",
  "Suhum",
];

const isWeb = Platform.OS === "web";

function TownRow() {
  return (
    <View className="flex-row items-center" style={{ paddingRight: 48, gap: 48 }}>
      {TOWNS.map((town) => (
        <Fragment key={town}>
          <Text className="font-body-medium text-label uppercase tracking-[3px] text-ivory/40">
            {town}
          </Text>
          <Text className="text-champagne text-base">·</Text>
        </Fragment>
      ))}
    </View>
  );
}

/** Infinitely scrolling strip of the 17 principal towns. */
export function Marquee() {
  if (!isWeb) {
    // Native: static single row, horizontally scrollable.
    return (
      <View className="bg-ink border-t border-b border-white/10 py-6">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 24 }}>
          <TownRow />
        </ScrollView>
      </View>
    );
  }

  // Web: CSS keyframes marquee — two duplicated rows translating -50%.
  return (
    <View className="bg-ink border-t border-b border-white/10 py-6 overflow-hidden">
      <div
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html:
            "<style>@keyframes pk-marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }</style>",
        }}
      />
      <View
        className="flex-row"
        style={
          {
            width: "max-content",
            animation: "pk-marquee 60s linear infinite",
          } as any
        }
        accessibilityLabel="The seventeen principal towns of Akuapem"
      >
        <TownRow />
        <TownRow />
      </View>
    </View>
  );
}
