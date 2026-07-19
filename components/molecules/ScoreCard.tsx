import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ScoreCardProps {
  score: number;
  highScore: number;
}

export default function ScoreCard({ score, highScore }: ScoreCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.scoreGroup}>
        <MaterialCommunityIcons name="star-outline" size={24} color="#6366f1" />
        <View style={styles.textGroup}>
          <Text style={styles.label}>SCORE ATUAL</Text>
          <Text style={styles.value}>{score}</Text>
        </View>
      </View>
      <View style={styles.divider} />
      <View style={styles.scoreGroup}>
        <MaterialCommunityIcons
          name="trophy-outline"
          size={24}
          color="#fbbf24"
        />
        <View style={styles.textGroup}>
          <Text style={styles.label}>MELHOR SCORE</Text>
          <Text style={styles.value}>{highScore}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121629",
    borderRadius: 12,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 1,
    borderColor: "#2d3561",
    width: "100%",
  },
  scoreGroup: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 8,
  },
  textGroup: {
    marginLeft: 12,
  },
  label: {
    color: "#94a3b8", // Slate 400
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
  },
  value: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "800",
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 35,
    backgroundColor: "#334155",
  },
});
