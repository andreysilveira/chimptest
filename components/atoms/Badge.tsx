import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface BadgeProps {
  label: string;
  variant?: "primary" | "success" | "warning" | "danger" | "neutral";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Badge({
  label,
  variant = "primary",
  style,
  textStyle,
}: BadgeProps) {
  const getColors = () => {
    switch (variant) {
      case "success":
        return { bg: "#065f46", text: "#34d399", border: "#047857" };
      case "warning":
        return { bg: "#78350f", text: "#fbbf24", border: "#d97706" };
      case "danger":
        return { bg: "#7f1d1d", text: "#fca5a5", border: "#b91c1c" };
      case "neutral":
        return { bg: "#1e293b", text: "#94a3b8", border: "#334155" };
      case "primary":
      default:
        return { bg: "#121629", text: "#60a5fa", border: "#2d3561" };
    }
  };

  const colors = getColors();

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
        },
        style,
      ]}
    >
      <Text style={[styles.text, { color: colors.text }, textStyle]}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 99,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
  },
  text: {
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
});
