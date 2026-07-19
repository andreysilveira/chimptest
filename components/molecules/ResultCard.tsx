import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

interface ResultCardProps {
  score: number;
  level: number;
  totalTime: number;
}

export default function ResultCard({ score, level, totalTime }: ResultCardProps) {
  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Resultados da Partida</Text>

      <View style={styles.metricsContainer}>
        <View style={styles.metricRow}>
          <View style={styles.metricLabelGroup}>
            <MaterialCommunityIcons name="star-circle-outline" size={24} color="#6366f1" />
            <Text style={styles.metricLabel}>Pontuação Final</Text>
          </View>
          <Text style={styles.metricValue}>{score} pts</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricRow}>
          <View style={styles.metricLabelGroup}>
            <MaterialCommunityIcons name="ladder" size={24} color="#10b981" />
            <Text style={styles.metricLabel}>Maior Nível</Text>
          </View>
          <Text style={styles.metricValue}>Lvl {level}</Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.metricRow}>
          <View style={styles.metricLabelGroup}>
            <MaterialCommunityIcons name="clock-outline" size={24} color="#38bdf8" />
            <Text style={styles.metricLabel}>Tempo de Partida</Text>
          </View>
          <Text style={styles.metricValue}>{formatTime(totalTime)}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#121629",
    borderRadius: 16,
    padding: 24,
    width: "100%",
    borderWidth: 1,
    borderColor: "#2d3561",
    alignItems: "center",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 24,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  metricsContainer: {
    width: "100%",
  },
  metricRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
  },
  metricLabelGroup: {
    flexDirection: "row",
    alignItems: "center",
  },
  metricLabel: {
    color: "#94a3b8", // Slate 400
    fontSize: 15,
    fontWeight: "600",
    marginLeft: 12,
  },
  metricValue: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "#334155",
    width: "100%",
  },
});
