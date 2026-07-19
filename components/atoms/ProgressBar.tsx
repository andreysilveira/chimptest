import React, { useEffect, useRef } from "react";
import { View, StyleSheet, Animated } from "react-native";

interface ProgressBarProps {
  durationMs: number;
  onComplete: () => void;
  active: boolean;
}

export default function ProgressBar({
  durationMs,
  onComplete,
  active,
}: ProgressBarProps) {
  const progressWidth = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (active) {
      // Reset progress
      progressWidth.setValue(1);

      // Start countdown animation
      Animated.timing(progressWidth, {
        toValue: 0,
        duration: durationMs,
        useNativeDriver: false, // width cannot use native driver
      }).start(({ finished }) => {
        if (finished) {
          onComplete();
        }
      });
    } else {
      progressWidth.stopAnimation();
    }
  }, [active, durationMs, onComplete]);

  // Interpolate progress to width percentage
  const widthInterpolation = progressWidth.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.bar, { width: widthInterpolation }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 6,
    width: "100%",
    backgroundColor: "#1e293b", // Slate 800
    borderRadius: 3,
    overflow: "hidden",
  },
  bar: {
    height: "100%",
    backgroundColor: "#10b981", // Emerald 500 (represents time ticking down visually)
  },
});
