import { View } from "react-native";
import { Label, Title, Body } from "./Typography";

interface SectionHeadingProps {
  label: string;
  title: string;
  subtitle?: string;
  /** "dark" (default) for ink sections, "light" for ivory/white sections. */
  tone?: "dark" | "light";
  align?: "left" | "center";
}

export function SectionHeading({
  label,
  title,
  subtitle,
  tone = "dark",
  align = "left",
}: SectionHeadingProps) {
  const centered = align === "center";
  return (
    <View className={`mb-12 md:mb-16 ${centered ? "items-center" : ""}`}>
      <Label className={`mb-4 ${tone === "light" ? "text-champagne-dim" : ""}`}>
        {label}
      </Label>
      <Title
        className={`${tone === "light" ? "text-ink" : "text-ivory"} ${
          centered ? "text-center" : ""
        } mb-4`}
      >
        {title}
      </Title>
      {subtitle && (
        <Body
          className={`${tone === "light" ? "text-ink/60" : "text-ivory/60"} ${
            centered ? "text-center" : ""
          } max-w-xl`}
        >
          {subtitle}
        </Body>
      )}
    </View>
  );
}
