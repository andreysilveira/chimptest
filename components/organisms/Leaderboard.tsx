import React from "react";
import { StyleSheet, Text, View, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import LeaderboardItem from "../molecules/LeaderboardItem";
import { LeaderboardEntry } from "@/types/schemas";

interface LeaderboardProps {
  data: LeaderboardEntry[];
}

export default function Leaderboard({ data }: LeaderboardProps) {
  if (!data || data.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <MaterialCommunityIcons name="trophy-outline" size={64} color="#334155" />
        <Text style={styles.emptyTitle}>Sem recordes ainda</Text>
        <Text style={styles.emptySubtitle}>
          Seja o primeiro a jogar e garanta seu lugar no topo do ranking!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.date}
      renderItem={({ item, index }) => (
        <LeaderboardItem entry={item} rank={index + 1} />
      )}
      contentContainerStyle={styles.listContainer}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
    marginTop: 40,
  },
  emptyTitle: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 16,
  },
  emptySubtitle: {
    color: "#64748b",
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 20,
  },
});
