import { Text as RNText, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
}

// ——— Modern-luxury display system (dark-canvas defaults) ———

export function Display({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-display md:text-display-desktop text-ivory ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Title({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-title md:text-title-desktop text-ivory ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Label({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-body-medium text-label uppercase tracking-[3px] text-champagne ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

// Back-compat alias: Eyebrow now renders the Label style.
export const Eyebrow = Label;

// ——— Structural headings (light-surface-safe defaults, used by admin) ———

export function H1({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-h1 md:text-h1-desktop text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H2({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-h2 md:text-h2-desktop text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H3({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-h3 md:text-h3-desktop text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H4({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="header"
      className={`font-display text-h4 md:text-h4-desktop text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Body({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-body text-body text-gray-charcoal leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function BodyLarge({
  children,
  className = "",
  ...props
}: TypographyProps) {
  return (
    <RNText
      className={`font-body text-body-lg text-gray-charcoal leading-relaxed ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Accent({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-display-italic text-lg text-champagne ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Link({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      accessibilityRole="link"
      className={`font-body-medium text-champagne underline ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
