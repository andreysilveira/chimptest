import React, { useRef } from "react";
import {
  Text,
  StyleSheet,
  Pressable,
  Animated,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface ButtonProps {
  onPress: () => void;
  title: string;
  variant?: "primary" | "secondary" | "danger";
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export default function Button({
  onPress,
  title,
  variant = "primary",
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getVariantStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          button: styles.secondaryButton,
          text: styles.secondaryText,
        };
      case "danger":
        return {
          button: styles.dangerButton,
          text: styles.dangerText,
        };
      case "primary":
      default:
        return {
          button: styles.primaryButton,
          text: styles.primaryText,
        };
    }
  };

  const variantStyles = getVariantStyles();

  return (
    <Animated.View style={[{ transform: [{ scale }] }, style]}>
      <Pressable
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={({ pressed }) => [
          styles.button,
          variantStyles.button,
          disabled && styles.disabledButton,
          pressed && styles.pressed,
        ]}
      >
        <Text
          style={[
            styles.text,
            variantStyles.text,
            disabled && styles.disabledText,
            textStyle,
          ]}
        >
          {title}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    minWidth: 120,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  pressed: {
    opacity: 0.9,
  },
  primaryButton: {
    backgroundColor: "#3B82F6", // Original blue
    borderWidth: 1,
    borderColor: "#60a5fa",
  },
  secondaryButton: {
    backgroundColor: "#121629",
    borderWidth: 1,
    borderColor: "#2d3561",
  },
  dangerButton: {
    backgroundColor: "#ef4444",
    borderWidth: 1,
    borderColor: "#f87171",
  },
  disabledButton: {
    backgroundColor: "#0f172a", // Slate 900
    borderColor: "#1e293b",
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  primaryText: {
    color: "#ffffff",
  },
  secondaryText: {
    color: "#cbd5e1", // Slate 300
  },
  dangerText: {
    color: "#ffffff",
  },
  disabledText: {
    color: "#64748b",
  },
});
