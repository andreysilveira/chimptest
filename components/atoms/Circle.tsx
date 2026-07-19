import React, { useEffect, useRef } from "react";
import { StyleSheet, Text, Pressable, Animated } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface CircleProps {
  value?: number;
  isTapped: boolean;
  gameState: "idle" | "memorizing" | "playing" | "wrong" | "game_over";
  isWrong: boolean; // True if this circle was the incorrect tap
  onPress: () => void;
  size: number;
}

export default function Circle({
  value,
  isTapped,
  gameState,
  isWrong,
  onPress,
  size,
}: CircleProps) {
  const scale = useRef(new Animated.Value(0)).current;
  const shakeX = useRef(new Animated.Value(0)).current;

  // Pop-in animation on mount/reset
  useEffect(() => {
    scale.setValue(0);
    Animated.spring(scale, {
      toValue: 1,
      friction: 6,
      tension: 40,
      useNativeDriver: true,
    }).start();
  }, [value]);

  // Error Shake Animation
  useEffect(() => {
    if (isWrong) {
      Animated.sequence([
        Animated.timing(shakeX, {
          toValue: -12,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 12,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: -10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 10,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: -6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 6,
          duration: 50,
          useNativeDriver: true,
        }),
        Animated.timing(shakeX, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      shakeX.setValue(0);
    }
  }, [isWrong]);

  const isMemorizing = gameState === "memorizing";

  // Base styling colors matching the previous identity visual
  let backgroundColor = "#3B82F6"; // Original Blue activeCell color

  if (isTapped) {
    backgroundColor = "#10B981"; // Success Green
  } else if (isWrong) {
    backgroundColor = "#EF4444"; // Error Red
  }

  // Touchable only if it has a value, is not already tapped, and not in wrong/game-over state
  const isTouchable =
    value !== undefined &&
    !isTapped &&
    gameState !== "wrong" &&
    gameState !== "game_over" &&
    gameState !== "idle";

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width: size,
          height: size,
          transform: [{ scale: scale }, { translateX: shakeX }],
          backgroundColor: backgroundColor,
        },
      ]}
    >
      <Pressable
        onPress={onPress}
        disabled={!isTouchable}
        style={({ pressed }) => [
          styles.pressable,
          pressed && isTouchable && styles.pressed,
        ]}
      >
        {isTapped ? (
          <Text style={styles.text}>{value}</Text>
        ) : isWrong ? (
          <MaterialCommunityIcons name="close" size={size * 0.5} color="#fff" />
        ) : isMemorizing ? (
          <Text style={styles.text}>{value}</Text>
        ) : // In playing phase (after first tap), numbers are hidden, but circles are shown as blank blue boxes
        null}
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8, // Original rounded square shape
    justifyContent: "center",
    alignItems: "center",
  },
  pressable: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  pressed: {
    opacity: 0.8,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700", // Original font styling
    textAlign: "center",
  },
});
