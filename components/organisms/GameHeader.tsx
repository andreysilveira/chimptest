import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Badge from "../atoms/Badge";

interface GameHeaderProps {
  level: number;
  attempts: number;
  score: number;
  onQuit: () => void;
}

export default function GameHeader({
  level,
  attempts,
  score,
  onQuit,
}: GameHeaderProps) {
  // Translate attempts into color variant
  const getAttemptsVariant = (count: number) => {
    if (count === 3) return "success";
    if (count === 2) return "warning";
    return "danger";
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={onQuit} style={styles.backButton}>
        <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
      </Pressable>

      <View style={styles.hudSection}>
        <Badge
          label={`Nível ${level}`}
          variant="primary"
          style={styles.badge}
        />
        <Badge
          label={`${attempts} ${attempts === 1 ? "tentativa" : "tentativas"}`}
          variant={getAttemptsVariant(attempts)}
          style={styles.badge}
        />
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3561",
    width: "100%",
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#121629",
  },
  hudSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginLeft: 12,
  },
  badge: {
    marginRight: 8,
  },
  scoreContainer: {
    alignItems: "flex-end",
  },
  scoreLabel: {
    color: "#64748b",
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  scoreValue: {
    color: "#38bdf8", // Sky blue accent
    fontSize: 18,
    fontWeight: "800",
  },
});
