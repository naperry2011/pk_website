import { Text as RNText, TextProps } from "react-native";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
}

export function H1({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-heading-bold text-h1 text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H2({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-heading-bold text-h2 text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H3({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-heading text-h3 text-gray-charcoal ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function H4({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-heading text-h4 text-gray-charcoal ${className}`}
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
      className={`font-accent text-lg text-gold tracking-wide ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}

export function Link({ children, className = "", ...props }: TypographyProps) {
  return (
    <RNText
      className={`font-body-medium text-blue-heritage underline ${className}`}
      {...props}
    >
      {children}
    </RNText>
  );
}
