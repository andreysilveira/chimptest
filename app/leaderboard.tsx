import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import { useGameStore } from "@/store/gameStore";
import Leaderboard from "@/components/organisms/Leaderboard";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function LeaderboardScreen() {
  const router = useRouter();
  const { leaderboard, loadScores } = useGameStore();

  useEffect(() => {
    loadScores();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header section */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#ffffff" />
        </Pressable>
        <Text style={styles.title}>Leaderboard</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Main content ranking list */}
      <View style={styles.content}>
        <Leaderboard data={leaderboard} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#232946",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#2d3561",
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#121629",
  },
  title: {
    color: "#ffffff",
    fontSize: 20,
    fontWeight: "800",
  },
  placeholder: {
    width: 42, // Match back button size for grid symmetry
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 16,
  },
});
