import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LeaderboardEntry } from "@/types/schemas";

interface LeaderboardItemProps {
  entry: LeaderboardEntry;
  rank: number;
}

export default function LeaderboardItem({ entry, rank }: LeaderboardItemProps) {
  // Format ISO date to local string
  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getRankStyle = () => {
    switch (rank) {
      case 1:
        return { color: "#fbbf24", icon: "trophy" }; // Gold
      case 2:
        return { color: "#cbd5e1", icon: "trophy" }; // Silver
      case 3:
        return { color: "#b45309", icon: "trophy" }; // Bronze
      default:
        return { color: "#475569", icon: null };
    }
  };

  const rankStyle = getRankStyle();

  return (
    <View style={styles.container}>
      <View style={styles.leftSection}>
        <View style={styles.rankContainer}>
          {rankStyle.icon ? (
            <MaterialCommunityIcons name={rankStyle.icon as any} size={20} color={rankStyle.color} />
          ) : (
            <Text style={styles.rankText}>#{rank}</Text>
          )}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.nameText} numberOfLines={1}>
            {entry.name}
          </Text>
          <Text style={styles.dateText}>{formatDate(entry.date)}</Text>
        </View>
      </View>
      <View style={styles.rightSection}>
        <Text style={styles.scoreText}>{entry.score}</Text>
        <Text style={styles.ptsText}>pts</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#121629",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#2d3561",
  },
  leftSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  rankContainer: {
    width: 32,
    alignItems: "center",
    justifyContent: "center",
  },
  rankText: {
    color: "#64748b",
    fontWeight: "700",
    fontSize: 14,
  },
  infoContainer: {
    marginLeft: 12,
    flex: 1,
  },
  nameText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  dateText: {
    color: "#64748b",
    fontSize: 12,
    marginTop: 2,
  },
  rightSection: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  scoreText: {
    color: "#38bdf8", // Sky blue
    fontSize: 20,
    fontWeight: "800",
  },
  ptsText: {
    color: "#64748b",
    fontSize: 12,
    fontWeight: "600",
    marginLeft: 2,
  },
});
